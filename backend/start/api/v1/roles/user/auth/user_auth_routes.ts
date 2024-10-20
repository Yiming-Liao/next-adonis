import { HttpRouterService } from '@adonisjs/core/types'
const UserController = () => import('#controllers/roles/user/auth/user_auth_controller')
import { middleware } from '#start/kernel'

/**
 * 設定 User Auth 路由 '/api/v1/user/auth'
 */
export default function userAuthRoutes(router: HttpRouterService) {
  router
    .group(() => {
      // [POST] 註冊 <form>
      router.post('/register', [UserController, 'register'])

      // [POST] 登入 <form>
      router.post('/login', [UserController, 'login'])

      // [POST] 登出
      router.post('/logout', [UserController, 'logout']).use(middleware.userAuth())

      /**
       * Email
       */
      // [POST] 驗證信 (用戶點開連結)
      router.post('/email-verify', [UserController, 'emailVerify']).use(middleware.userAuth())

      // [POST] 再次寄送驗證信
      router
        .post('/email-verify-resend', [UserController, 'emailVerifyResend'])
        .use(middleware.userAuth())

      /**
       * Password
       */
      // [POST] 更改密碼  <form>
      router.post('/password-change', [UserController, 'passwordChange']).use(middleware.userAuth())

      // [POST] 忘記密碼  <form>
      router.post('/password-forgot', [UserController, 'passwordForgot'])

      // [POST] 重設密碼  <form>
      router.post('/password-reset', [UserController, 'passwordReset'])
    })
    .prefix('/auth')
}
