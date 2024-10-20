import type { HttpContext } from '@adonisjs/core/http'
import passwordChangeValidator from '#validators/roles/user/password_change_validator'
import User from '#models/user'

export async function passwordChange({ auth, request, response }: HttpContext) {
  // 驗證輸入資料
  const { password, newPassword } = await request.validateUsing(passwordChangeValidator)

  // 取得 User <Middleware 驗證完成>
  const user = auth.user!

  // 驗證密碼
  const foundUser = await User.verifyCredentials(user.email, password)

  // 錯誤處理
  if (!foundUser) {
    return response.badRequest({ errors: [{ message: 'Password incorrect' }] })
  }

  // 儲存新密碼
  foundUser.merge({ password: newPassword }).save()

  return response.ok({ message: 'Successful password change' })
}
