import { HttpRouterService } from '@adonisjs/core/types'
const UserController = () => import('#controllers/roles/user/user_controller')
import { middleware } from '#start/kernel'

/**
 * 設定 User 路由 '/api/v1/user/'
 */
export default function userRoutes(router: HttpRouterService) {
  router.get('/', [UserController, 'getUserData']).use([middleware.userAuth()])
}
// , middleware.userEmailVerified()
