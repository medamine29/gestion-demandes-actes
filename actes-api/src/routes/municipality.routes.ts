import { Router } from 'express'
import {
  getMunicipalities,
  getMunicipalityDetailsByName
} from '../controllers/municipality.controller'
import { catchMiddleware } from '../middlewares/catch.middleware'
import validate from '../middlewares/validation.middleware'
import { getMunicipalitiesSchema, getMunicipalityDetailsByNameSchema } from '../validations/municipality.validation'

const router = Router()

router.get(
  '',
  validate(getMunicipalitiesSchema),
  catchMiddleware(getMunicipalities)
)

router.get(
  '/:municipalityName',
  validate(getMunicipalityDetailsByNameSchema),
  catchMiddleware(getMunicipalityDetailsByName)
)

export { router as municipalityRouter }
