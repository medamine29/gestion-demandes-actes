import Joi from 'joi'
import { RequestValidationSchemas } from '../validations'

/**
 * POST /v1/auth/login
 */
export const loginSchema: RequestValidationSchemas = {
  body: Joi.object().keys({
    email: Joi.string().email().required().trim(),
    password: Joi.string().min(8).required()
  })
}

