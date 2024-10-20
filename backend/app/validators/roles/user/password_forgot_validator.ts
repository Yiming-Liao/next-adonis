import vine from '@vinejs/vine'

const passwordForgotValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
  })
)

export default passwordForgotValidator
