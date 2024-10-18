import { middleware } from '#start/kernel'
import { HttpRouterService } from '@adonisjs/core/types'
const UserController = () => import('#controllers/roles/user/user_controller')

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

      // [POST] 登出  [授權驗證 guards: user]
      router.post('/logout', [UserController, 'logout']).use(middleware.auth({ guards: ['user'] }))

      // [POST] 驗證信 (用戶點開連結)
      router.post('/email-verify', [UserController, 'emailVerify'])

      // [POST] 再次寄送驗證信
      router.post('/email-verify-resend', [UserController, 'emailVerifyResend'])

      // [POST] 更改密碼  <form>  [授權驗證 guards: user]
      router
        .post('/password-change', [UserController, 'passwordChange'])
        .use(middleware.auth({ guards: ['user'] }))

      // [POST] 忘記密碼  <form>
      router.post('/password-forgot', [UserController, 'passwordForgot'])

      // [POST] 重設密碼  <form>
      router.post('/password-reset', [UserController, 'passwordReset'])
    })
    .prefix('/auth')
}
