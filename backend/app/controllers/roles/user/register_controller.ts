import type { HttpContext } from '@adonisjs/core/http'
import registerValidator from '#validators/roles/user/register_validator'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import VerifyEmailNotification from '#mails/verify_email_notification'

export async function register({ request, response }: HttpContext) {
  // 驗證輸入資料
  const registrationData = await request.validateUsing(registerValidator)

  // 建立新資料
  const createdUser = await User.create(registrationData)

  // 寄送信箱驗證信
  await mail.send(new VerifyEmailNotification(createdUser))

  // 生成 Token
  const token = await User.accessTokens.create(createdUser, ['*'])

  return response.created({
    token: token,
    user: createdUser,
  })
}
