import Joi from 'joi'
import { RequestValidationSchemas } from '../validations'
import { frenchPhoneNumberRegex } from '../constants/global.constant'
import { isMongoId } from './helper.validation'

/**
 * POST /v1/messages
 */
export const addMessageSchema: RequestValidationSchemas = {
  body: Joi.object().keys({
    firstName: Joi.string().min(2).required().trim(),
    lastName: Joi.string().min(2).required().trim(),
    email: Joi.string().email().required().trim(),
    phone: Joi.string().regex(frenchPhoneNumberRegex).required().trim(),
    content: Joi.string().max(500).required()
  })
}

/**
 * GET /v1/messages
 */
export const getMessagesSchema: RequestValidationSchemas = {
  query: Joi.object().keys({
    showArchived: Joi.boolean().default(false),
    page: Joi.number().integer().min(0).default(1), 
    perPage: Joi.number().integer().min(5).default(20)
  })
}

/**
 * DELETE /v1/messages
 */
export const deleteMessageSchema: RequestValidationSchemas = {
  params: Joi.object().keys({
    messageId: Joi.string().custom(isMongoId).required()
  })
}