import { NextFunction, Request, Response } from 'express'
import { SERVER_ERRORS } from '../constants/errors.constant'
import BaseError from '../errors/base.error'

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (err instanceof BaseError)
    res.status(err.status).json(err.toJson())
  else res.status(500).json(SERVER_ERRORS.INTERNAL_SERVER_ERROR)

  next()
}
