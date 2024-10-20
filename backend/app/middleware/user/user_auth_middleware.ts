import User from '#models/user'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { DateTime } from 'luxon'

export default class AuthMiddleware {
  async handle({ auth, request, response }: HttpContext, next: NextFn) {
    const accessToken = request.cookie(env.get('ACCESS_TOKEN_NAME'))
    const refreshToken = request.cookie(env.get('REFRESH_TOKEN_NAME'))

    // [Access Token 不存在] 檢查 Refresh Token
    if (!accessToken) {
      // [Refresh Token 不存在]
      if (!refreshToken) {
        return response.unauthorized({
          errors: [{ message: 'No access token or refresh token found' }],
        })
      }

      // [Refresh Token 存在] 使用 refresh token 查找 User
      const foundUser = await User.query().where('refreshToken', refreshToken).first()

      // [Refresh Token 無效] 錯誤處理 請重新登入
      if (!foundUser || (foundUser?.refreshTokenExpiresAt || 0) < DateTime.now()) {
        return response.unauthorized({ errors: [{ message: 'Invalid or expired refresh token' }] })
      }

      // 生成新的 access token
      const newAccessToken = await User.accessTokens.create(foundUser, ['*'])

      // 回應新的 access token 並設置到 cookie 中
      response.cookie(env.get('ACCESS_TOKEN_NAME'), newAccessToken.toJSON().token)

      // 將新生成的 Access Token 設置到 request headers 中進行後續驗證
      request.headers().authorization = `Bearer ${newAccessToken.toJSON().token}`
    } else {
      // [Access Token 不存在] 設置到 request headers 中進行後續驗證
      request.headers().authorization = `Bearer ${accessToken}`
    }

    // [Access token 驗證] 取得 authenticatedUser 實例
    await auth.authenticateUsing(['user'])
    const authenticatedUser = auth.user!

    // [刷新快過期的 Access Token] 檢查 access token 是否即將過期（10 分鐘內過期）
    if (
      DateTime.fromJSDate(authenticatedUser.currentAccessToken.expiresAt!).diffNow('minutes')
        .minutes <= 10
    ) {
      // 撤銷舊的 accessToken
      await User.accessTokens.delete(
        authenticatedUser,
        authenticatedUser.currentAccessToken.identifier
      )

      // 生成新的 access token
      const newAccessToken = await User.accessTokens.create(authenticatedUser, ['*'])

      // 回應新的 access token 並設置到 cookie 中
      response.cookie(env.get('ACCESS_TOKEN_NAME'), newAccessToken.toJSON().token)
    }

    return next()
  }
}
