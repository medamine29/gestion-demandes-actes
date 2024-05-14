import { Request, Response } from 'express'
import AdminService from '../services/admin.service'
import TokenService from '../services/token.service'
import { Role } from '../constants/global.constant'

export const login = async (req: Request, res: Response) => {
  const admin = await AdminService.login(req.validBody)
  const access_token = await TokenService.createToken({ _id: admin._id, role: Role.ADMIN })
  return res.json({ access_token })
}
