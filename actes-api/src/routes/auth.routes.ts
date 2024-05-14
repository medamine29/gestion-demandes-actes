import { Router } from 'express'
import {
  login
} from '../controllers/admin.controller'
import { catchMiddleware } from '../middlewares/catch.middleware'
import validate from '../middlewares/validation.middleware'
import { loginSchema } from '../validations/admin.validation'

const router = Router()

router.post(
  '/login',
  validate(loginSchema),
  catchMiddleware(login)
)

export { router as authRouter }
