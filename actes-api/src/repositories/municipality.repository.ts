import { IMunicipality, IWriteMunicipality, Municipality } from '../models/municipality.model'
import BaseRepository from './base.repository'

class MunicipalityRepository extends BaseRepository<IMunicipality, IWriteMunicipality> {
  model = Municipality
}

export default new MunicipalityRepository()
