import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import UserEmailVerifyNotification from '#mails/user_email_verify_notification'

export async function emailVerifyResend({ auth, response }: HttpContext) {
  // 檢查用戶是否存在
  const user = auth.user

  // 根據 email 查找用戶
  const foundUser = await User.findBy('email', user!.email)

  // 錯誤處理
  if (!foundUser) {
    return response.badRequest({ errors: [{ message: 'User not found' }] })
  }

  // 寄送信箱驗證信
  await mail.send(new UserEmailVerifyNotification(foundUser))

  return response.ok({ message: 'Resend successfully!' })
}
