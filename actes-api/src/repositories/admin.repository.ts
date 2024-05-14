import { IAdmin, IWriteAdmin, Admin } from '../models/admin.model'
import BaseRepository from './base.repository'

class AdminRepository extends BaseRepository<IAdmin, IWriteAdmin> {
  model = Admin
}

export default new AdminRepository()
