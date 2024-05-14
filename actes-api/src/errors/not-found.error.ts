import BaseError from './base.error'

export default class NotFoundError extends BaseError {
  constructor({ message, code }: ErrorBody = {}) {
    super(404, code || 'not_found', message || 'not found')
  }
}
