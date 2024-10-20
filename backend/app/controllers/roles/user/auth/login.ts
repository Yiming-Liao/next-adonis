import type { HttpContext } from '@adonisjs/core/http'
import loginValidator from '#validators/roles/user/login_validator'
import User from '#models/user'
import env from '#start/env'

export async function login({ request, response }: HttpContext) {
  // 驗證輸入資料
  const { email, password } = await request.validateUsing(loginValidator)

  // 驗證密碼
  const foundUser = await User.verifyCredentials(email, password)

  // 錯誤處理
  if (!foundUser) {
    return response.badRequest({ errors: [{ message: 'Invalid Credentials' }] })
  }

  // 生成 accessToken
  const accessToken = await User.accessTokens.create(foundUser, ['*'])

  // 使用 model 的方法創建 refreshToken
  const refreshToken = await User.createRefreshToken(foundUser)

  return response // Refresh Token 設置為 30天
    .cookie(env.get('REFRESH_TOKEN_NAME'), refreshToken, { maxAge: 30 * 24 * 60 * 60 })
    .cookie(env.get('ACCESS_TOKEN_NAME'), accessToken.toJSON().token)
    .ok({
      message: 'Successful login',
      userData: foundUser.serialize(),
    })
}
