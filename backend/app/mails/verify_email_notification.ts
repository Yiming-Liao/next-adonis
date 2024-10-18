import { BaseMail } from '@adonisjs/mail'
import User from '#models/user'
import crypto from 'node:crypto'

export default class VerifyEmailNotification extends BaseMail {
  subject = 'Verify email'
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

  // 生成電子郵件驗證的令牌
  private async generateEmailVerifyToken(): Promise<string> {
    const token = crypto.randomBytes(20).toString('hex') // 生成隨機令牌
    this.user.emailVerifyToken = token // 保存生成的令牌
    this.user.emailVerifiedAt = null // 重新設置驗證時間
    await this.user.save() // 確保將變更持久化到資料庫中
    return token
  }

  async prepare() {
    const emailVerifyToken = await this.generateEmailVerifyToken() // 在這裡生成令牌

    const verificationUrl = `https://myapp.com/verify-email?token=${emailVerifyToken}`

    this.message.html(`
      <h1> Verify email address </h1>
      <p><a href="${verificationUrl}">Click here to verify your email address</a></p>
    `)
  }
}
