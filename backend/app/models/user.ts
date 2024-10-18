import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

// import UserService from '#services/user_service'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1d',
  })

  // Email verification
  @column()
  declare emailVerifyToken: string | null

  @column.dateTime()
  declare emailVerifiedAt: DateTime | null

  // Reset password
  @column()
  declare passwordResetToken: string | null

  @column.dateTime()
  declare passwordResetExpiresAt: DateTime | null

  /**
   * 創建 UserVerification 實例
   */
  // public getVerificationService(): UserVerification {
  //   return new UserService(this)
  // }
}
