import type { HttpContext } from '@adonisjs/core/http'
import emailVerifyValidator from '#validators/roles/user/email_verify_validator'
import User from '#models/user'
import { DateTime } from 'luxon'

export async function emailVerify({ request, response }: HttpContext) {
  // 驗證輸入資料
  const { emailVerifyToken } = await request.validateUsing(emailVerifyValidator)

  // 根據 token 查找用戶
  const foundUser = await User.findBy('emailVerifyToken', emailVerifyToken)

  // 錯誤處理
  if (!foundUser) {
    return response.badRequest({ errors: [{ message: 'Invalid token' }] })
  }

  // 更新用戶的 emailVerifiedAt 並清空 emailVerifyToken
  foundUser.emailVerifiedAt = DateTime.now()
  foundUser.emailVerifyToken = null
  await foundUser.save()

  return response.ok({ message: 'Email verified successfully!' })
}
