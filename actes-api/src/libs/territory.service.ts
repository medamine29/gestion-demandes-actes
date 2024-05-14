import axios from 'axios'
import { TERRITORY } from '../configs/config'

class TerritoryService {

  async getCountries() {
    const countriesData = await axios.get(TERRITORY.COUNTRIES_API_URL)

    const formattedCountries = []

    for (let i = 0; i < countriesData.data.length; i++) {
      const countryElem = countriesData.data[i];
      if (countryElem?.name?.common !== 'France') formattedCountries.push(countryElem?.name?.common || '')
    }

    formattedCountries.sort()
    formattedCountries.unshift("France")

    return formattedCountries
  }

  async getMunicipalitiesByName(name: string) {
    const apiUrl = `${TERRITORY.MUNICIPALITIES_API_URL}?nom=${name}`
    const municipalitiesData = await axios.get(apiUrl)

    let formattedMunicipalities = []

    for (let i = 0; i < municipalitiesData.data.length; i++) {
      const municipalityElem = municipalitiesData.data[i];
      formattedMunicipalities.push(`${municipalityElem.nom} (${municipalityElem.codeDepartement})`)
    }

    return formattedMunicipalities
  }

}

export default new TerritoryService()
