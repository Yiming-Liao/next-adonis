import type { HttpContext } from '@adonisjs/core/http'

/**
 * 設定 User Auth 控制器
 */
export default class UserController {
  // 註冊
  async register(context: HttpContext) {
    const { register } = await import('#controllers/roles/user/register_controller')
    return register(context)
  }

  // 登入
  async login(context: HttpContext) {
    const { login } = await import('#controllers/roles/user/login_controller')
    return login(context)
  }

  // 登出
  async logout(context: HttpContext) {
    const { logout } = await import('#controllers/roles/user/logout_controller')
    return logout(context)
  }

  // 信箱驗證
  async emailVerify(context: HttpContext) {
    const { verifyEmail } = await import('#controllers/roles/user/email_verify_controller')
    return verifyEmail(context)
  }

  // 再次寄送信箱驗證信
  async emailVerifyResend(context: HttpContext) {
    const { register } = await import('#controllers/roles/user/register_controller')
    return register(context)
  }

  // 更改密碼
  async passwordChange(context: HttpContext) {
    const { register } = await import('#controllers/roles/user/register_controller')
    return register(context)
  }

  // 忘記密碼
  async passwordForgot(context: HttpContext) {
    const { register } = await import('#controllers/roles/user/register_controller')
    return register(context)
  }

  // 重設密碼
  async passwordReset(context: HttpContext) {
    const { register } = await import('#controllers/roles/user/register_controller')
    return register(context)
  }
}
