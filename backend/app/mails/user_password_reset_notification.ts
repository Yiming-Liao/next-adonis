import { BaseMail } from '@adonisjs/mail'
import User from '#models/user'
import crypto from 'node:crypto'
import env from '#start/env'
import { DateTime } from 'luxon'

export default class UserPasswordResetNotification extends BaseMail {
  subject = 'Reset password'
  private user!: User // 使用非空斷言運算符

  constructor(user: User) {
    super() // 呼叫父類別的構造函數
    this.setUser(user) // 設置用戶
  }

  setUser(user: User) {
    this.user = user // 設置用戶
    this.message.to(this.user.email) // 直接設置收件人
    return this // 返回實例以支持鏈式調用
  }

  // 生成密碼重設的令牌
  private async generatePasswordResetToken(): Promise<string> {
    const token = crypto.randomBytes(20).toString('hex') // 生成隨機令牌
    this.user.passwordResetToken = token // 保存生成的令牌
    this.user.passwordResetExpiresAt = DateTime.now().plus({ hours: 1 })
    await this.user.save() // 儲存
    return token
  }

  async prepare() {
    const passwordResetToken = await this.generatePasswordResetToken()

    const passwordResetUrl = `${env.get('FRONTEND_URL')}/password-reset?passwordResetToken=${passwordResetToken}`

    this.message.html(`
      <h1> Reset password </h1>
      <p><a href="${passwordResetUrl}">Click here to reset your password</a></p>
    `)
  }
}
