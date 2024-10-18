// app/Services/UserService.ts

import { DateTime } from 'luxon'
import User from '#models/user'

export default class UserService {
  private user: User

  constructor(user: User) {
    this.user = user
  }

  /**
   * 檢查電子郵件是否已驗證
   */
  public isEmailVerified(): boolean {
    return this.user.emailVerifiedAt !== null
  }

  /**
   * 檢查重設密碼令牌是否已過期
   */
  public isResetPasswordTokenExpired(): boolean {
    if (!this.user.resetPasswordExpiresAt) {
      return true // 如果沒有過期時間，視為已過期
    }
    return DateTime.local() > this.user.resetPasswordExpiresAt
  }

  /**
   * 驗證電子郵件
   */
  public verifyEmail(token: string): boolean {
    // 假設 token 與使用者的 emailVerifyToken 匹配
    // 你需要在這裡實作驗證邏輯
    if (this.user.emailVerifiedAt === null) {
      this.user.emailVerifiedAt = DateTime.local() // 設置驗證時間
      return true // 驗證成功
    }
    return false // 已經驗證過
  }
}
