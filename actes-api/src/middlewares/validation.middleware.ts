// @ts-nocheck
import { NextFunction, Request, Response } from 'express'
import { AsyncValidationOptions } from 'joi'
import BadRequestError from '../errors/bad-request.error'
import { RequestValidationSchemas } from '../validations'
 
const validate = (
  schemas: RequestValidationSchemas,
  options: AsyncValidationOptions = { allowUnknown: true, abortEarly: true }
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body)
        req.validBody = await schemas.body.validateAsync(req.body, options)
      if (schemas.params)
        req.validParams = await schemas.params.validateAsync(req.params, options)
      if (schemas.query)
        req.validQuery = await schemas.query.validateAsync(req.query, options)
      next()
    } catch (error) {
      return next(
        new BadRequestError({
          message: error.message,
        })
      )
    }
  }
}

export default validate
