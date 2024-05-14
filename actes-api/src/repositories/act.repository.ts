import { IAct, IWriteAct, Act } from '../models/act.model'
import BaseRepository from './base.repository'

class ActRepository extends BaseRepository<IAct, IWriteAct> {
  model = Act
}

export default new ActRepository()
