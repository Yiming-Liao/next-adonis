import vine from '@vinejs/vine'

const passwordChangeValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(6).maxLength(64),
    newPassword: vine
      .string()
      .minLength(6)
      .maxLength(64)
      .confirmed({ confirmationField: 'newPasswordConfirm' }),
  })
)

export default passwordChangeValidator
