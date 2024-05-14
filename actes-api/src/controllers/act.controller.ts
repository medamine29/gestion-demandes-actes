import { Request, Response } from 'express'
import ActService from '../services/act.service'
import mailService from '../libs/mail.service'

export const addAct = async (req: Request, res: Response) => {
  const [act] = await ActService.createAct(req.validBody)
  await mailService.sendConfirmationMail(act)
  return res.json(act)
}

export const getActs = async (req: Request, res: Response) => {
  const { showArchived, actType, page, perPage } = req.validQuery
  const act = await ActService.getActs(actType, showArchived, page, perPage)
  return res.json(act)
}

export const deleteAct = async (req: Request, res: Response) => {
  const { actId } = req.validParams
  await ActService.deleteAct(actId)
  res.sendStatus(204)
}

export const getActDetails = async (req: Request, res: Response) => {
  const { actId } = req.validParams
  const act = await ActService.getActDetails(actId)
  return res.json(act)
} 
