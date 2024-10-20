import type { HttpContext } from '@adonisjs/core/http'

/**
 * 設定 User 控制器
 */
export default class UserController {
  //
  async getUserData({ response }: HttpContext) {
    return response.ok({ message: 'User data!' })
  }
}
