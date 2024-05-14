import { IWriteAdmin } from '../models/admin.model'
import AdminRepository from '../repositories/admin.repository'
import NotFoundError from '../errors/not-found.error'
import bcrypt from 'bcryptjs'
import AuthorizationError from '../errors/authorization.error'
import { AUTH_ERRORS } from '../constants/errors.constant'
import { AUTH } from '../configs/config'

class AdminService {
  private readonly adminRepository = AdminRepository

  async login(loginData: IWriteAdmin) {
    const admin = await this.adminRepository.findOne({ email: loginData.email }, {}, { lean: true })
    if (!admin) throw new AuthorizationError(AUTH_ERRORS.INVALID_LOGIN)

    const isPasswordMatch = await bcrypt.compare(loginData.password, admin.password)
    if (!isPasswordMatch) throw new AuthorizationError(AUTH_ERRORS.INVALID_LOGIN)
    
    return admin
  }

  async addAdmin(admin: IWriteAdmin) {
    admin.password = await bcrypt.hash(admin.password, AUTH.PWD_SALT)
    const savedAdmin = await this.adminRepository.create(admin)
    return savedAdmin
  } 

}

export default new AdminService()
