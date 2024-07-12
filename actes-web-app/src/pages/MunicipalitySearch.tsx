import { FormikHelpers, useFormik } from "formik";
import React, { ReactNode, useState } from "react";
import { TbMapPinSearch } from "react-icons/tb";
import SearchBar from "../components/common/SearchBar.tsx";
import { useFetchMunicipalityDetailsQuery } from "../store/index.ts";
import { Link } from "react-router-dom";
import Map from "../components/common/Map.jsx"

const MunicipalitySearch = () => {

  const [mairie, setMairie] = useState<string>('')

  const {
    data: municipalityDetails
  } = useFetchMunicipalityDetailsQuery(mairie, { skip: !mairie })

  const handleChange =  (_, value: string) => {
    setMairie(value)
  }

  const actClasses = "hover:-translate-y-1 cursor-pointer underline text-lg"

  return (  
    <div className="w-5/6 md:w-4/5 bg-customLightBlue p-8 m-4 flex flex-col items-center gap-2">
      <div className="text-xl md:text-3xl p-4 font-bold text-customBlue">
        Trouvez les coordonnées de votre mairie de naissance
      </div>
      <SearchBar
        id="birthPlace"
        value={mairie}
        label="Recherche par commune"
        placeholder="commune."
        labelIcon={TbMapPinSearch}
        setFieldValue={handleChange}
        optionPrefix="Mairie de"
      />

      {
        municipalityDetails && (
          <div className="flex flex-col gap-2 w-full my-2">
            {
              municipalityDetails.address && <div>  Mairie de <strong> { municipalityDetails.name } </strong> { `se situe ${municipalityDetails.address}, ${municipalityDetails.postalCode}, ${municipalityDetails.city} (${municipalityDetails.department} ${municipalityDetails.departmentCode})` } </div>
            }
            { municipalityDetails.email && <div> { municipalityDetails.email } </div> }
            { municipalityDetails.webSite && <div> <a href={municipalityDetails.webSite} className="underline"> { municipalityDetails.webSite } </a> </div> }
            
            <Map center={[municipalityDetails.coordinates.lat, municipalityDetails.coordinates.lon]} markerTitle={municipalityDetails.name} />
            
            <div className="flex flex-col text-justify gap-3 p-3 my-2">
              <p>
                Vous avez besoin d’un acte d’état civil pour vos démarches administratives à { municipalityDetails.city } ? La mairie de { municipalityDetails.name } est à votre disposition. Ses officiers d’états civil vous accueillent aux horaires d’ouverture pour vous fournir l’acte d’état civil nécessaire, qu’il s’agisse d’un acte de naissance, d’un acte de mariage ou d’un acte de décès. 
              </p>
              <p>
                Pour plus de confort et de rapidité, commandez vos actes d’états civils en ligne en toute sécurité.  En quelque clic, sans quitter votre domicile, obtenez vos documents grâce à nos formulaires intuitifs.                
              </p>
              <strong className="self-center text-xl"> Simplifiez vos formalités ! </strong>
            </div>

            <div className="flex flex-col md:flex-row w-full justify-evenly">
              <Link to={`/acte-de-naissance/${municipalityDetails.name}`} > <div className={`${actClasses} decoration-green-400/50`}> Commander un acte de naissance </div> </Link>
              <Link to={`/acte-de-mariage/${municipalityDetails.name}`} > <div className={`${actClasses} decoration-pink-400/50`}> Commander un acte de mariage </div> </Link>
              <Link to={`/acte-de-deces/${municipalityDetails.name}`} > <div className={`${actClasses} decoration-black/50`}> Commander un acte de décès </div> </Link>
            </div>

          </div>
        )
      }
    </div>
  );
}

export default MunicipalitySearch;