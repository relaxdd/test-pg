import { Joi } from 'celebrate'

export const createUserScheme = Joi.object({
  login: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(24).required(),
})

export const updateUserScheme = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(8).max(24),
})
