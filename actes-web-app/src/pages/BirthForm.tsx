import React, { useState } from "react";
import BirthActInfo from "../acts/BirthActInfo.tsx";
import ActAddress from "../acts/ActAddressForm.tsx";
import ActValidation from "../acts/ActValidation.tsx";
import { Stepper, Step } from 'react-form-stepper';
import { FaWpforms, FaMapMarkerAlt } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { stepperStyleConfig } from "../data/styles.ts";
import { useParams } from "react-router-dom";
import { useFetchMunicipalityDetailsQuery } from "../store/index.ts";

const BirthForm = () => {

  const [activeStep, setActiveStep] = useState<number>(0)
  const { city } = useParams();

  const {
    data: municipalityDetails
  } = useFetchMunicipalityDetailsQuery(city!, { skip: !city })

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <BirthActInfo setActiveStep={setActiveStep} />;
      case 1:
        return <ActAddress setActiveStep={setActiveStep} />;
      case 2:
        return <ActValidation setActiveStep={setActiveStep} />;
      default:
        return null;
    }
  }

  return (  
    <div className="w-5/6 md:w-4/5 bg-white p-2 md:p-4 m-2 md:m-4">
      <div className="text-customBlue flex flex-col">
        <div className="text-xl md:text-3xl font-bold">
          Commandez votre acte de naissance en ligne { municipalityDetails?.name }
        </div>
        <div>
          Remplissez simplement notre formulaire en quelques clics.
          Nous traitons votre demande rapidement afin que vous receviez votre acte de
          naissance directement dans votre boite aux lettres. Profitez de notre service sécurisé
          et rapide, tout en restant chez vous !
        </div>
      </div>

      <div className="w-full md:w-4/5 lg:w-3/5 flex flex-col items-center mx-auto">
        <Stepper 
          activeStep={activeStep}
          styleConfig={stepperStyleConfig}
        >
          <Step label="Informations sur l'acte"> <FaWpforms className="text-xl" /> </Step>
          <Step label="Adresse de réception"> <FaMapMarkerAlt className="text-xl" /> </Step>
          <Step label="Vérification et validation"> <IoCheckmarkDoneSharp className="text-xl" /> </Step>
        </Stepper>

        { renderStep() }
      </div>

      <div className="w-full flex flex-col gap-3 mt-10 text-customBlue bg-customLightBlue p-4 rounded">
        <div>
          acte-de-naissance-express.fr offre un service de commande d&#39;acte d&#39;états civils en
          ligne avec un focus particulier sur les <b> actes de naissances, </b> les <b> actes de mariage </b> et
          les <b> actes de décès. </b> Que vous soyez né en France ou à l&#39;étranger, vous pouvez
          commander une  <b> copie intégrale </b> ou <b> un extrait </b> d&#39;<b>acte de naissance avec ou sans
          filiation </b> grâce à un formulaire intuitif et sécurisé. Une assistance au remplissage du
          document et un suivi personnalisé de votre dossier sont également inclus dans le
          service.
        </div>
      </div>

    </div>
  );
}
 
export default BirthForm