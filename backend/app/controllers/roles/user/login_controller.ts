import type { HttpContext } from '@adonisjs/core/http'
import loginValidator from '#validators/roles/user/login_validator'
import User from '#models/user'

export async function login({ request, response }: HttpContext) {
  // 驗證輸入資料
  const { email, password } = await request.validateUsing(loginValidator)

  // 比對資料
  const user = await User.verifyCredentials(email, password)

  // 生成 Token
  const token = await User.accessTokens.create(user, ['*'])

  return response.ok({
    token: token,
    ...user.serialize(),
  })
}
