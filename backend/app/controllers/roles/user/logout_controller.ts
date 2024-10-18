import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export async function logout({ auth, response }: HttpContext) {
  // 透過 middleware.auth({ guards: ['user'] }) 取得 user
  const user = auth.getUserOrFail()

  // 檢查 Token (Token的編號，例如: 27)
  const token = auth.user?.currentAccessToken.identifier
  if (!token) {
    return response.badRequest({ message: 'Token not found' })
  }

  // 撤銷 Token
  await User.accessTokens.delete(user, token)

  return response.ok({ message: 'Logged out' })
}
