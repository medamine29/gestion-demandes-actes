import { Router } from 'express'
import {
  getMunicipalitiesByName,
  getMunicipalityDetailsByName
} from '../controllers/municipality.controller'
import { catchMiddleware } from '../middlewares/catch.middleware'
import validate from '../middlewares/validation.middleware'
import { getMunicipalitiesSchema, getMunicipalityDetailsByNameSchema } from '../validations/municipality.validation'

const router = Router()

router.get(
  '',
  validate(getMunicipalitiesSchema),
  catchMiddleware(getMunicipalitiesByName)
)

router.get(
  '/:municipalityName',
  validate(getMunicipalityDetailsByNameSchema),
  catchMiddleware(getMunicipalityDetailsByName)
)

export { router as municipalityRouter }
