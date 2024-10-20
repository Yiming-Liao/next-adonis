import type { HttpContext } from '@adonisjs/core/http'
import passwordForgotValidator from '#validators/roles/user/password_forgot_validator'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import UserPasswordResetNotification from '#mails/user_password_reset_notification'

export async function passwordForgot({ request, response }: HttpContext) {
  // 驗證輸入資料
  const { email } = await request.validateUsing(passwordForgotValidator)

  // 建立新資料
  const foundUser = await User.findBy('email', email)

  // 錯誤處理
  if (!foundUser) {
    return response.badRequest({ errors: [{ message: 'User not found' }] })
  }

  // 寄送密碼重設信
  try {
    await mail.send(new UserPasswordResetNotification(foundUser))
  } catch (error) {
    return response.internalServerError({
      errors: [{ message: 'Failed to send password reset email' }],
    })
  }

  return response.ok({
    message: 'Successful send password reset email',
  })
}
