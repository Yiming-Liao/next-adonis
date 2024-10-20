import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import env from '#start/env'

export async function logout({ auth, response }: HttpContext) {
  // 取得 Token的編號，例如: 27
  const accessTokenIdentifier = auth.user!.currentAccessToken?.identifier

  // 撤銷 accessToken
  if (accessTokenIdentifier) {
    await User.accessTokens.delete(auth.user!, accessTokenIdentifier)
  }

  return response // 清理 cookie
    .clearCookie(env.get('REFRESH_TOKEN_NAME'))
    .clearCookie(env.get('ACCESS_TOKEN_NAME'))
    .ok({ message: 'Successful logout' })
}
