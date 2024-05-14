import { Router } from 'express'
import {
  addAct, getActs, deleteAct,
  getActDetails
} from '../controllers/act.controller'
import { catchMiddleware } from '../middlewares/catch.middleware'
import validate from '../middlewares/validation.middleware'
import { addActSchema, getActsSchema, deleteActSchema, getActDetailsSchema } from '../validations/act.validation'
import { Role } from '../constants/global.constant'

const router = Router()
const { ADMIN } = Role

router.post(
  '/',
  validate(addActSchema),
  catchMiddleware(addAct)
)

router.get(
  '/',
  validate(getActsSchema),
  catchMiddleware(getActs)
)

router.get(
  '/:actId',
  validate(getActDetailsSchema),
  catchMiddleware(getActDetails)
)

router.delete(
  '/:actId',
  validate(deleteActSchema),
  catchMiddleware(deleteAct)
)

export { router as actRouter }
