import { Request, Response } from 'express'
import MunicipalityService from '../services/municipality.service'

export const getMunicipalitiesByName = async (req: Request, res: Response) => {
  const { name } = req.validQuery
  const municipalities = await MunicipalityService.getMunicipalitiesByName(name as string)
  return res.json(municipalities)
}

export const getMunicipalityDetailsByName = async (req: Request, res: Response) => {
  const { municipalityName } = req.validParams
  const municipality = await MunicipalityService.getMunicipalityDetailsByName(municipalityName as string)
  return res.json(municipality)
} 
