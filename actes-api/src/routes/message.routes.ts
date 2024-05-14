import { Router } from 'express'
import {
  addMessage,
  getMessages,
  deleteMessage
} from '../controllers/message.controller'
import { catchMiddleware } from '../middlewares/catch.middleware'
import validate from '../middlewares/validation.middleware'
import { addMessageSchema, getMessagesSchema, deleteMessageSchema } from '../validations/message.validation'

const router = Router()

router.post(
  '/',
  validate(addMessageSchema),
  catchMiddleware(addMessage)
)

router.get(
  '/',
  validate(getMessagesSchema),
  catchMiddleware(getMessages)
)

router.delete(
  '/:messageId',
  validate(deleteMessageSchema),
  catchMiddleware(deleteMessage)
)

export { router as messageRouter }
