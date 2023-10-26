import { celebrate } from 'celebrate'
import { createUserScheme } from '../../scheme'

const validateCreateUser = celebrate({
  body: createUserScheme
})

export default validateCreateUser
