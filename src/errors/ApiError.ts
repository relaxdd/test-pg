class ApiError extends Error {
  private statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)

    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}

export default ApiError
