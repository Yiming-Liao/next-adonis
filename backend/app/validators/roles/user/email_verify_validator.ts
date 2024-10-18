import vine from '@vinejs/vine'

const emailVerifyValidator = vine.compile(
  vine.object({
    emailVerifyToken: vine.string(),
  })
)

export default emailVerifyValidator
