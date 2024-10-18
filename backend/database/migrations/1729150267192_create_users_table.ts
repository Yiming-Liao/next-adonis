import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.string('email_verify_token').nullable() // Email 驗證令牌
      table.timestamp('email_verified_at').nullable() // Email 驗證時間
      table.string('password_reset_token').nullable() // 重置密碼令牌
      table.timestamp('password_reset_expires_at').nullable() // 重置密碼過期時間
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
