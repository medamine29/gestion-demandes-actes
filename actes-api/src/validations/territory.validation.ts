import Joi from 'joi'
import { RequestValidationSchemas } from '../validations'

/**
 * GET /territories/municipalities?name=XX
 */
export const getMunicipalitiesSchema: RequestValidationSchemas = {
  query: Joi.object().keys({
    name: Joi.string().min(2).required(),
  })
}

