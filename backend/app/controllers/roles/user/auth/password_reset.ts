import type { HttpContext } from '@adonisjs/core/http'
import passwordResetValidator from '#validators/roles/user/password_reset_validator'
import User from '#models/user'

export async function passwordReset({ request, response }: HttpContext) {
  // 驗證輸入資料
  const { passwordResetToken, password } = await request.validateUsing(passwordResetValidator)

  // 根據 token 查找用戶
  const foundUser = await User.findBy('passwordResetToken', passwordResetToken)

  // 錯誤處理
  if (!foundUser) {
    return response.badRequest({ errors: [{ message: 'Invalid token' }] })
  }

  // 更改密碼
  foundUser.merge({ password: password })

  // 清空 Password Reset 相關資料
  foundUser.passwordResetExpiresAt = null
  foundUser.passwordResetToken = null
  await foundUser.save()

  return response.ok({ message: 'Successful password reset' })
}
