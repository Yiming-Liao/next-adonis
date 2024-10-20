import { HttpRouterService } from '@adonisjs/core/types'
import userAuthRoutes from './auth/user_auth_routes.js'
import userRoutes from './user_routes.js'

/**
 * 設定 User 路由 '/api/v1/user'
 */
export default function userAllRoutes(router: HttpRouterService) {
  router
    .group(() => {
      // user 身份驗證路由 '/api/v1/user/auth'
      userAuthRoutes(router)

      // user 操作路由 '/api/v1/user/'
      userRoutes(router)
    })
    .prefix('user')
}
