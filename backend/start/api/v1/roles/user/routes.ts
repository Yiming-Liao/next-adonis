import { HttpRouterService } from '@adonisjs/core/types'
import userAuthRoutes from './user_auth_routes.js'

/**
 * 設定 User 路由 '/api/v1/user'
 */
export default function userRoutes(router: HttpRouterService) {
  router
    .group(() => {
      // user 身份驗證路由 '/api/v1/user/auth'
      userAuthRoutes(router)
    })
    .prefix('user')
}
