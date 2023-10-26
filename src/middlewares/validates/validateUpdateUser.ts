import { celebrate, Joi } from 'celebrate'
import { updateUserScheme } from '../../scheme'

const validateUpdateUser = celebrate({
  body: updateUserScheme,
  params: Joi.object({ id: Joi.number().positive().integer().min(1) })
})

export default validateUpdateUser
