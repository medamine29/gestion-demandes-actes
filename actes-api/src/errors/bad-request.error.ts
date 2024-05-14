import BaseError from './base.error'
export default class BadRequestError extends BaseError {
  constructor({ code, message }: ErrorBody = {}) {
    super(400, code || 'bad_request', message || 'bad request')
  }
}
