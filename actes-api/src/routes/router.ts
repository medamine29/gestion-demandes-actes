import express, { Request, Response } from 'express'
import { catchMiddleware } from '../middlewares/catch.middleware'
import { territoryRouter } from './territory.routes'
import { actRouter } from './act.routes'
import { messageRouter } from './message.routes'
import { authRouter } from './auth.routes'

export const router = express.Router()

router.use('/territories', territoryRouter)
router.use('/acts', actRouter)
router.use('/messages', messageRouter)
router.use('/auth', authRouter)

router.get(
  '/health',
  catchMiddleware((req: Request, res: Response) => {
    return res.json({ status: 'ok' })
  })
)