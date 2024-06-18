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
      { lean: true }
    );
  
    municipalities.sort((a, b) => {
      const parisRegexp = /^(Paris) - (\d+e arrondissement|Centre \(ancien \d+e arrondissement\))/;
      const marseilleRegexp = /^(Marseille) - (\d+e arrondissement|1er et \d+e arrondissements|\d+e et \d+e arrondissements)/;
  
      const aParisMatch = a.name.match(parisRegexp);
      const bParisMatch = b.name.match(parisRegexp);
      const aMarseilleMatch = a.name.match(marseilleRegexp);
      const bMarseilleMatch = b.name.match(marseilleRegexp);
  
      // Prioritize Paris Centre (ancien 1er arrondissement) to (ancien 4e arrondissement)
      if (a.name.startsWith("Paris Centre (ancien ") && !b.name.startsWith("Paris Centre (ancien ")) {
        return -1;
      }
      if (!a.name.startsWith("Paris Centre (ancien ") && b.name.startsWith("Paris Centre (ancien ")) {
        return 1;
      }
  
      // If both are Paris Centre (ancien Xe arrondissement), sort alphabetically
      if (a.name.startsWith("Paris Centre (ancien ") && b.name.startsWith("Paris Centre (ancien ")) {
        return a.name.localeCompare(b.name);
      }
  
      // Prioritize Paris arrondissements
      if (aParisMatch && !bParisMatch) {
        return -1;
      }
      if (!aParisMatch && bParisMatch) {
        return 1;
      }
      if (aParisMatch && bParisMatch) {
        // Both are Paris arrondissements, compare numerically
        const aNums = extractNumbers(aParisMatch[2]);
        const bNums = extractNumbers(bParisMatch[2]);
        for (let i = 0; i < Math.min(aNums.length, bNums.length); i++) {
          if (aNums[i] !== bNums[i]) return aNums[i] - bNums[i];
        }
        return aNums.length - bNums.length;
      }
  
      // Prioritize Marseille arrondissements
      if (aMarseilleMatch && !bMarseilleMatch) {
        return -1;
      }
      if (!aMarseilleMatch && bMarseilleMatch) {
        return 1;
      }
      if (aMarseilleMatch && bMarseilleMatch) {
        // Only consider the first arrondissement for sorting
        const aNums = extractNumbers(aMarseilleMatch[2]);
        const bNums = extractNumbers(bMarseilleMatch[2]);
        return aNums[0] - bNums[0];
      }
  
      // If neither are Paris or Marseille arrondissements, sort alphabetically
      return a.name.localeCompare(b.name);
    });
  
    const formattedMunicipalities = municipalities.map((municipality) => municipality.name);
    return formattedMunicipalities;
  }

  async getMunicipalityDetailsByName(name: string) {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
    const municipality = await this.municipalityRepository.findOne(
      { name: { $regex: `^${escapedName}$`, $options: 'i' } },
      {},
      { lean: true }
    );
    if (!municipality) throw new NotFoundError(MUNICIPALITY_ERRORS.MUNICIPALITY_NOT_FOUND);
    return municipality;
  }

}

const extractNumbers = (text: string): number[] => {
  return (text.match(/\d+/g) || []).map(Number);
};

export default new MunicipalityService()
