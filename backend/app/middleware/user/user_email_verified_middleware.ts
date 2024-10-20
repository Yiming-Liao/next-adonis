import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

// Middleware 檢查信箱驗證
export default class UserEmailVerifiedMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    const user = auth.user

    if (user && !user.emailVerifiedAt) {
      return response.forbidden({
        errors: [{ field: 'email', message: 'Email not verified', rule: 'verified' }],
      })
    }

    return next()
  }
}
