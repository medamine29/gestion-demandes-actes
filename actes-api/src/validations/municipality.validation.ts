import Joi from 'joi'
import { RequestValidationSchemas } from '../validations'

/**
 * GET /municipalities?name=XX
 */
export const getMunicipalitiesSchema: RequestValidationSchemas = {
  query: Joi.object().keys({
    searchInput: Joi.string().min(2).required(),
  })
}

/**
 * GET /municipalities/:municipalityName
 */
export const getMunicipalityDetailsByNameSchema: RequestValidationSchemas = {
  params: Joi.object().keys({
    municipalityName: Joi.string().min(2).required(),
  })
}

