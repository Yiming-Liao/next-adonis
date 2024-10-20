import type { HttpContext } from '@adonisjs/core/http'
import registerValidator from '#validators/roles/user/register_validator'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import UserEmailVerifyNotification from '#mails/user_email_verify_notification'
import env from '#start/env'

export async function register({ request, response }: HttpContext) {
  // 驗證輸入資料
  const registrationData = await request.validateUsing(registerValidator)

  // 建立新資料
  const createdUser = await User.create(registrationData)

  // 錯誤處理
  if (!createdUser) {
    return response.badRequest({ errors: [{ message: 'Create user failed' }] })
  }

  // 寄送信箱驗證信
  try {
    await mail.send(new UserEmailVerifyNotification(createdUser))
  } catch (error) {
    return response.internalServerError({
      errors: [{ message: 'Failed to send vericication email' }],
    })
  }

  // 生成 accessToken
  const accessToken = await User.accessTokens.create(createdUser, ['*'])

  // 使用 model 的方法創建 refreshToken
  const refreshToken = await User.createRefreshToken(createdUser)

  return response // Refresh Token 設置為 30天
    .cookie(env.get('REFRESH_TOKEN_NAME'), refreshToken, { maxAge: 30 * 24 * 60 * 60 })
    .cookie(env.get('ACCESS_TOKEN_NAME'), accessToken.toJSON().token)
    .created({
      message: 'Successful register',
      userData: createdUser.serialize(),
    })
}
