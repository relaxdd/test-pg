import { celebrate, Joi } from 'celebrate'

const validateGetUser = celebrate({
  params: Joi.object({ id: Joi.number().positive().integer().min(1) })
})

export default validateGetUser
