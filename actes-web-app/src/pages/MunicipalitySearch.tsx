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
        Rechercher les informations sur une mairie et commander vos actes d'état civil
      </div>
      <SearchBar
        id="birthPlace"
        value={mairie}
        label="Saisir le nom ou le code postale"
        placeholder="Sélectionner une mairie"
        labelIcon={TbMapPinSearch}
        setFieldValue={handleChange}
      />

      {
        municipalityDetails && (
          <div className="flex flex-col gap-2 w-full my-2">
            <div className="text-lg"> Mairie de <strong> { municipalityDetails.name } </strong> </div>
            { municipalityDetails.email && <div>  <strong className="underline">email</strong> : { municipalityDetails.email } </div> }
            { municipalityDetails.address && <div>  <strong className="underline">adresse</strong> :  { municipalityDetails.address } </div> }
            { municipalityDetails.url && <div>  <strong className="underline">site internet</strong> : <a href={municipalityDetails.url} className="underline"> { municipalityDetails.url } </a> </div> }
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