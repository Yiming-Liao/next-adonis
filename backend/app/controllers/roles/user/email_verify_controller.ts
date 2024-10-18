import type { HttpContext } from '@adonisjs/core/http'
import verifyEmailValidator from '#validators/roles/user/email_verify_validator'
import User from '#models/user'
import { DateTime } from 'luxon'

export async function verifyEmail({ request, response }: HttpContext) {
  // 驗證輸入資料
  const { emailVerifyToken } = await request.validateUsing(verifyEmailValidator)

  // 根據 token 查找用戶
  const user = await User.findBy('emailVerifyToken', emailVerifyToken)

  // 檢查用戶是否存在
  if (!user) {
    return response.badRequest({ message: 'Invalid or expired verification token.' })
  }

  // 更新用戶的 emailVerifiedAt 屬性
  user.emailVerifiedAt = DateTime.now() // 使用 DateTime.now() 獲取當前時間
  user.emailVerifyToken = null // 清除驗證令牌，因為已經驗證過

  // 保存更新
  await user.save()

  return response.ok({ message: 'Email verified successfully!' })
}
