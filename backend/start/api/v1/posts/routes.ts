import { HttpRouterService } from '@adonisjs/core/types'
const PostsController = () => import('#controllers/posts/posts_controller')

/**
 * 設定 Post 路由 '/api/v1/posts'
 */
export default function postRoutes(router: HttpRouterService) {
  router.resource('posts', PostsController)
}
