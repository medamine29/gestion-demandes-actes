import { FormikHelpers, useFormik } from "formik";
import React, { ReactNode, useState } from "react";
import { TbMapPinSearch } from "react-icons/tb";
import SearchBar from "../components/common/SearchBar.tsx";
import { useFetchMunicipalityDetailsQuery } from "../store/index.ts";
import { Link } from "react-router-dom";

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
    <div className="w-4/5 md:w-3/5 bg-white p-8 m-4 flex flex-col items-center gap-2">
      <div className="text-2xl p-4 font-bold text-gray-800">
        Trouvez les coordonnées de votre mairie de naissance
      </div>
      <SearchBar
        id="birthPlace"
        value={mairie}
        label="Recherche par commune ou code postal"
        placeholder="commune ou code postal."
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
            <Link to={`/acte-de-naissance/${municipalityDetails.name}`} > <div className={`${actClasses} decoration-green-400/50`}> Commander un acte de naissance </div> </Link>
            <Link to={`/acte-de-mariage/${municipalityDetails.name}`} > <div className={`${actClasses} decoration-pink-400/50`}> Commander un acte de mariage </div> </Link>
            <Link to={`/acte-de-deces/${municipalityDetails.name}`} > <div className={`${actClasses} decoration-black/50`}> Commander un acte de décès </div> </Link>
          </div>
        )
      }
    </div>
  );
}

export default MunicipalitySearch;