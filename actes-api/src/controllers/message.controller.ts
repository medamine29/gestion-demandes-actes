import { Request, Response } from 'express'
import MessageService from '../services/message.service'

export const addMessage = async (req: Request, res: Response) => {
  const message = await MessageService.createMessage(req.validBody)
  return res.json(message)
}

export const getMessages = async (req: Request, res: Response) => {
  const { showArchived, page, perPage } = req.validQuery
  const messages = await MessageService.getMessages(showArchived, page, perPage)
  return res.json(messages)
}

export const deleteMessage = async (req: Request, res: Response) => {
  const { messageId } = req.validParams
  await MessageService.deleteMessage(messageId)
  res.sendStatus(204)
}
