import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import crypto from 'node:crypto'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime | null

  // Email verification
  @column({ serializeAs: null })
  declare emailVerifyToken: string | null

  @column.dateTime({ serializeAs: null })
  declare emailVerifiedAt: DateTime | null

  // Reset password
  @column({ serializeAs: null })
  declare passwordResetToken: string | null

  @column.dateTime({ serializeAs: null })
  declare passwordResetExpiresAt: DateTime | null

  // Refresh Token
  @column({ serializeAs: null })
  declare refreshToken: string | null

  @column.dateTime({ serializeAs: null })
  declare refreshTokenExpiresAt: DateTime | null

  // OAT Access Token
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1h',
  })

  /**
   * 創建並儲存 Refresh Token
   */
  public static async createRefreshToken(user: User) {
    // 生成隨機的 Refresh Token
    const refreshToken = crypto.randomBytes(40).toString('hex')
    const refreshTokenExpiresAt = DateTime.now().plus({ days: 30 }) // 30 天有效期

    // 儲存 Refresh Token 和過期時間到使用者資料庫
    user.refreshToken = refreshToken
    user.refreshTokenExpiresAt = refreshTokenExpiresAt
    await user.save()

    return refreshToken // 返回生成的 Refresh Token
  }
}
