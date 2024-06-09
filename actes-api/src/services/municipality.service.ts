import { IMunicipality, IWriteMunicipality } from '../models/municipality.model'
import MunicipalityRepository from '../repositories/municipality.repository'
import NotFoundError from '../errors/not-found.error'
import { MUNICIPALITY_ERRORS } from '../constants/errors.constant'

class MunicipalityService {
  private readonly municipalityRepository = MunicipalityRepository

  async getMunicipalities(searchInput: string) { 
    const municipalities = await this.municipalityRepository.find(
      { 
        $or: [
          { name: { $regex: `^${searchInput}`, $options: 'i' } }, 
          { postalCode: { $regex: `^${searchInput}` } }
        ]  
      },
      {}, 
      { lean: true, sort: { name: 1 }  }
    )
    const formattedMunicipalities = municipalities.map((municipality: IMunicipality) => municipality.name)
    return formattedMunicipalities
  }

  async getMunicipalityDetailsByName(name: string) {
    const muncipality = await this.municipalityRepository.findOne({ name: { $regex: `^${name}$`, $options: 'i' } }, {}, { lean: true })
    if (!muncipality) throw new NotFoundError(MUNICIPALITY_ERRORS.MUNICIPALITY_NOT_FOUND)

    if (muncipality.address instanceof Array) {
      muncipality.address = `${muncipality.address[0]} ${muncipality.address[1] && `/ ${muncipality.address[1]}`}`
    }

    return muncipality
  }

}

export default new MunicipalityService()
