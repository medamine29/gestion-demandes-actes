import BaseError from './base.error'
export default class AuthorizationError extends BaseError {
  constructor({ code, message }: ErrorBody = {}) {
    super(401, code || 'unauthorized', message || 'Unauthorized')
  }
}
