import { Router } from 'express'
import {
  getCountries,
  getMunicipalitiesByName
} from '../controllers/territory.controller'
import { catchMiddleware } from '../middlewares/catch.middleware'
import validate from '../middlewares/validation.middleware'
import { getMunicipalitiesSchema } from '../validations/territory.validation'

const router = Router()

router.get(
  '/countries',
  catchMiddleware(getCountries)
)

router.get(
  '/municipalities',
  validate(getMunicipalitiesSchema),
  catchMiddleware(getMunicipalitiesByName)
)

export { router as territoryRouter }
