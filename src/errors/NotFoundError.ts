import { STATUS_CODES } from '../defines'
import ApiError from './ApiError'

class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, STATUS_CODES.NOT_FOUND)
  }
}

export default NotFoundError
