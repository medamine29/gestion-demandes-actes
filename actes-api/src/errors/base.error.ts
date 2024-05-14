export default class BaseError extends Error {
  status
  code

  constructor(
    status: number,
    code: string,
    message?: string
  ) {
    super(message)
    this.status = status
    this.code = code

    Error.captureStackTrace(this, this.constructor)
  }

  toJson() {
    return {
      code: this.code,
      message: this.message
    }
  }
}
