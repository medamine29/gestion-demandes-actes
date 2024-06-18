import Joi from 'joi'
import { RequestValidationSchemas } from '../validations'
import { ActFormat, ActType, Relationship, RequestReason } from '../models/act.model'
import { Civility, frenchPhoneNumberRegex, frenchPostalCodeRegex } from '../constants/global.constant'
import { isMongoId } from './helper.validation'

const personSchema: Joi.ObjectSchema = Joi.object().keys({
  civility: Joi.string().valid(...Object.values(Civility)).required(),
  lastName: Joi.string().required().trim(),
  usageLastName: Joi.string().trim().allow(""),
  firstName: Joi.string().required().trim(),
  birthDate: Joi.date().max(new Date()).required(),
  unknownFather: Joi.boolean().default(false),
  fathersFirstName: Joi.string().trim().when('unknownFather', {
    is: false,
    then: Joi.required(),
    otherwise: Joi.optional().allow("")
  }),
  fathersLastName: Joi.string().trim().when('unknownFather', {
    is: false,
    then: Joi.required(),
    otherwise: Joi.optional().allow("")
  }),
  unknownMother: Joi.boolean().default(false),
  mothersFirstName: Joi.string().trim().when('unknownMother', {
    is: false,
    then: Joi.required(),
    otherwise: Joi.optional().allow("")
  }),
  mothersLastName: Joi.string().trim().when('unknownMother', {
    is: false,
    then: Joi.required(),
    otherwise: Joi.optional().allow("")
  })
})

/**
 * POST /v1/acts
 */
export const addActSchema: RequestValidationSchemas = {
  body: Joi.object().keys({
    actType: Joi.string().valid(...Object.values(ActType)).required(),
    actAddressInfo: Joi.object().keys({
      civility: Joi.string().valid(...Object.values(Civility)).required(),
      firstName: Joi.string().required().trim(),
      lastName: Joi.string().required().trim(),
      country: Joi.string().required(),
      address: Joi.string().required().trim(),
      postalCode: Joi.string().regex(frenchPostalCodeRegex).required().trim(),
      city: Joi.string().required().trim(),
      email: Joi.string().email().required().trim(),
      phone: Joi.string().regex(frenchPhoneNumberRegex).required().trim()
    }),
    birthInfo: Joi.object().keys({
      civility: Joi.string().valid(...Object.values(Civility)).required(),
      relationship: Joi.string().valid(...Object.values(Relationship)).required(),
      actFormat: Joi.string().valid(...Object.values(ActFormat)).required(),
      requestReason: Joi.string().valid(...Object.values(RequestReason)).required(),
      birthDate: Joi.date().max(new Date()).required(),
      lastName: Joi.string().required().trim(),
      firstName: Joi.string().required().trim(),
      country: Joi.string().required().trim(),
      birthPlace: Joi.string().required().trim(),
      unknownFather: Joi.boolean().default(false),
      fathersFirstName: Joi.string().trim().when('unknownFather', {
        is: false,
        then: Joi.required(),
        otherwise: Joi.optional().allow("")
      }),
      fathersLastName: Joi.string().trim().when('unknownFather', {
        is: false,
        then: Joi.required(),
        otherwise: Joi.optional().allow("")
      }),
      unknownMother: Joi.boolean().default(false),
      mothersFirstName: Joi.string().trim().when('unknownMother', {
        is: false,
        then: Joi.required(),
        otherwise: Joi.optional().allow("")
      }),
      mothersLastName: Joi.string().trim().when('unknownMother', {
        is: false,
        then: Joi.required(),
        otherwise: Joi.optional().allow("")
      })
    }).when('actType', { 
      is: ActType.BIRTH, 
      then: Joi.required()
    }),
    marriageInfo: Joi.object().keys({
      marriageDate: Joi.date().max(new Date()).required(),
      relationship: Joi.string().valid(...Object.values(Relationship)).required(),
      actFormat: Joi.string().valid(...Object.values(ActFormat)).required(),
      requestReason: Joi.string().valid(...Object.values(RequestReason)).required(),
      country: Joi.string().required().trim(),
      marriagePlace: Joi.string().required().trim(),
      firstPerson: personSchema,
      secondPerson: personSchema
    }).when('actType', { 
      is: ActType.MARRIAGE, 
      then: Joi.required()
    }),
    deathInfo: Joi.object().keys({
      civility: Joi.string().valid(...Object.values(Civility)).required(),
      relationship: Joi.string().valid(...Object.values(Relationship)).required(),
      actFormat: Joi.string().valid(...Object.values(ActFormat)).required(),
      requestReason: Joi.string().valid(...Object.values(RequestReason)).required(),
      lastName: Joi.string().required().trim(),
      firstName: Joi.string().required().trim(),
      country: Joi.string().required().trim(),
      deathPlace: Joi.string().required().trim(),
      deathDate: Joi.date().max(new Date()).required()
    }).when('actType', { 
      is: ActType.DEATH, 
      then: Joi.required()
    })
  })
}

/**
 * GET /v1/acts
 */
export const getActsSchema: RequestValidationSchemas = {
  query: Joi.object().keys({
    showArchived: Joi.boolean().default(false),
    actType: Joi.string().valid(...Object.values(ActType)), 
    page: Joi.number().integer().min(0).default(1), 
    perPage: Joi.number().integer().min(5).default(20)
  })
}

/**
 * DELETE /v1/acts/:actId
 */
export const deleteActSchema: RequestValidationSchemas = {
  params: Joi.object().keys({
    actId: Joi.string().custom(isMongoId).required()
  })
}

/**
 * GET /v1/acts/:actId
 */
export const getActDetailsSchema: RequestValidationSchemas = {
  params: Joi.object().keys({
    actId: Joi.string().custom(isMongoId).required()
  })
}


