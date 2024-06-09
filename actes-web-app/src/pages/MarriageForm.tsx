import React, { useState } from "react";
import MarriageActInfo from "../acts/MarriageActInfo.tsx";
import ActAddress from "../acts/ActAddressForm.tsx";
import ActValidation from "../acts/ActValidation.tsx";
import { Stepper, Step } from 'react-form-stepper';
import { FaWpforms, FaMapMarkerAlt } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { stepperStyleConfig } from "../data/styles.ts";
import { useParams } from "react-router-dom";
import { useFetchMunicipalityDetailsQuery } from "../store/index.ts";

const MarriageForm = () => {

  const [activeStep, setActiveStep] = useState<number>(0)
  const { city } = useParams();

  const {
    data: municipalityDetails
  } = useFetchMunicipalityDetailsQuery(city!, { skip: !city })

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <MarriageActInfo setActiveStep={setActiveStep} />;
      case 1:
        return <ActAddress setActiveStep={setActiveStep} />;
      case 2:
        return <ActValidation setActiveStep={setActiveStep} />;
      default:
        return null;
    }
  }

  return (  
    <div className="w-full md:w-4/5 lg:w-3/5 bg-white p-2 md:p-4 m-2 md:m-4">
      <div className="text-xl font-semibold underline decoration-green-800">
        Demande d'acte de mariage { municipalityDetails?.name }
      </div>

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
  );
}
 
export default MarriageForm