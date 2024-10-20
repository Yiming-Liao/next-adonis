import { HttpRouterService } from '@adonisjs/core/types'
import userAllRoutes from './roles/user/routes.js'
import postRoutes from './posts/routes.js'

/**
 * 設定 API v1 路由 '/api/v1'
 */
export default function apiV1Routes(router: HttpRouterService) {
  router
    .group(() => {
      // 測試訊息
      router.get('/', () => {
        return '[ Route: /api/v1 ]'
      })

      // User | 'user'
      router.group(() => {
        userAllRoutes(router)
      })

      // Post | 'posts'
      router.group(() => {
        postRoutes(router)
      })
    })
    .prefix('/api/v1')
}
