import vine from '@vinejs/vine'

const passwordResetValidator = vine.compile(
  vine.object({
    passwordResetToken: vine.string(),
    password: vine
      .string()
      .minLength(6)
      .maxLength(512)
      .confirmed({ confirmationField: 'passwordConfirm' }),
  })
)

export default passwordResetValidator
