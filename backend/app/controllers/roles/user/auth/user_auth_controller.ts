import type { HttpContext } from '@adonisjs/core/http'

/**
 * 設定 User Auth 控制器
 */
export default class UserAuthController {
  // 註冊
  async register(context: HttpContext) {
    const { register } = await import('#controllers/roles/user/auth/register')
    return register(context)
  }

  // 登入
  async login(context: HttpContext) {
    const { login } = await import('#controllers/roles/user/auth/login')
    return login(context)
  }

  // 登出
  async logout(context: HttpContext) {
    const { logout } = await import('#controllers/roles/user/auth/logout')
    return logout(context)
  }

  /**
   * Email
   */
  // 信箱驗證
  async emailVerify(context: HttpContext) {
    const { emailVerify } = await import('#controllers/roles/user/auth/email_verify')
    return emailVerify(context)
  }

  // 再次寄送信箱驗證信
  async emailVerifyResend(context: HttpContext) {
    const { emailVerifyResend } = await import('#controllers/roles/user/auth/email_verify_resend')
    return emailVerifyResend(context)
  }

  /**
   * Password
   */
  // 更改密碼
  async passwordChange(context: HttpContext) {
    const { passwordChange } = await import('#controllers/roles/user/auth/password_change')
    return passwordChange(context)
  }

  // 忘記密碼
  async passwordForgot(context: HttpContext) {
    const { passwordForgot } = await import('#controllers/roles/user/auth/password_forgot')
    return passwordForgot(context)
  }

  // 重設密碼
  async passwordReset(context: HttpContext) {
    const { passwordReset } = await import('#controllers/roles/user/auth/password_reset')
    return passwordReset(context)
  }
}
