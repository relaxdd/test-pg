import { STATUS_CODES } from '../defines'
import ApiError from './ApiError'

class ValidationError extends ApiError {
  constructor(message: string) {
    super(message, STATUS_CODES.BAD_REQUEST)
  }
}

export default ValidationError
