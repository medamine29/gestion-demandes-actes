import { Request, Response } from 'express'
import TerritoryService from '../libs/territory.service'

export const getCountries = async (req: Request, res: Response) => {
  const countries = await TerritoryService.getCountries()
  return res.json(countries)
}

export const getMunicipalitiesByName = async (req: Request, res: Response) => {
  const { name } = req.validQuery
  const municipalities = await TerritoryService.getMunicipalitiesByName(name as string)
  return res.json(municipalities)
}
