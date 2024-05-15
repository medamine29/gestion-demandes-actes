import React, { ReactNode, useState } from "react";
import { useAddActMutation, useTypedSelector } from "../store/index.ts";
import { ActAddress, ActeType, AddAct, BirthInfo, DeathInfo, MarriageInfo, TermAgreement } from "../data/interfaces.ts";
import { getBirthActValidationsComponent, getDeathActValidationsComponent, getMarriageActValidationsComponent } from "../data/helpers.tsx";
import Button from "../../src/components/common/Button.tsx"
import CheckBox from "../components/common/CheckBox.tsx";
import { FormikHelpers, useFormik } from "formik";
import { termAgreementSchema } from "../data/validations.tsx";
import PaiementMethod from "../components/actes/PaiementMethod.tsx";
import { useSnackbar } from 'react-simple-snackbar'
import { useNavigate } from "react-router-dom";
interface ActValidationProps {
  setActiveStep: (step: number) => void;
}

const ActValidation: React.FC<ActValidationProps> = ({ setActiveStep }) => {

  const [openModal, setOpenModal] = useState<boolean>(false)

  const [addAct] = useAddActMutation();
  const [openSnackbar] = useSnackbar()
  const navigate = useNavigate()

  const successSnackBarContent: ReactNode = (
    <div className="underline decoration-green-600">
      Demande enregistrée avec succès
    </div>
  )

  const failureSnackBarContent: ReactNode = (
    <div className="underline decoration-red-700">
      une erreur s'est produite
    </div>
  )

  const { marriageInfo, birthInfo, deathInfo, actAddressInfo } = useTypedSelector(
    (state) => ({ 
      marriageInfo: state.marriageAct, 
      birthInfo: state.birthAct, 
      deathInfo: state.deathAct, 
      actAddressInfo: state.actAddress, 
      actType: state.auth.actType 
    })
  )

  const handleAddAct = async () => {
    if (actType && actAddressInfo) {
      let requestBody: AddAct = { actType, actAddressInfo: actAddressInfo as Required<ActAddress> }
      if (actType === ActeType.BIRTH) requestBody.birthInfo = birthInfo as Required<BirthInfo>
      else if (actType === ActeType.DEATH) requestBody.deathInfo = deathInfo as Required<DeathInfo>
      else if (actType === ActeType.MARRIAGE) requestBody.marriageInfo = marriageInfo as Required<MarriageInfo>
      try {
        await addAct(requestBody).unwrap()
        openSnackbar(successSnackBarContent, 2500)
      } catch (error) {
        openSnackbar(failureSnackBarContent, 2500)
      }
      
    }
  }

  const actType: ActeType | undefined = useTypedSelector((state) => state.auth.actType)
  const { birthAct, marriageAct, deathAct, actAddress} = useTypedSelector(({ birthAct, marriageAct, deathAct, actAddress }) => ({ birthAct, marriageAct, deathAct, actAddress }))
  let validationsComponent: ReactNode = <div></div>

  if (actType === ActeType.BIRTH) {
    validationsComponent = getBirthActValidationsComponent(birthAct, actAddress)
  } else if (actType === ActeType.MARRIAGE) {
    validationsComponent = getMarriageActValidationsComponent(marriageAct, actAddress)
  } else if (actType === ActeType.DEATH) {
    validationsComponent = getDeathActValidationsComponent(deathAct, actAddress)
  }

  const handleSubmitForm = async (values: TermAgreement, actions: FormikHelpers<TermAgreement>) => {
    // const validValues = values as Required<TermAgreement>
    //  setOpenModal(true)
    await handleAddAct()
    navigate('/');
  }

  const { values, errors, isSubmitting, handleSubmit, setFieldValue } = useFormik<TermAgreement>({
    initialValues: {
      generalTerms: false,
      personalData: false,
      application: false
    },
    validationSchema: termAgreementSchema,
    onSubmit: handleSubmitForm
  })

  const labelClasses = "font-normal text-sm text-gray-800"

  return (  
    <div>
      <div 
        className="flex flex-col border border-gray-300 rounded cursor-pointer hover:-translate-y-2"
        onClick={() => { setActiveStep(1) }}
      >
        { validationsComponent }
        <Button
          className="justify-center p-2 text-green-900 font-semibold border-0"
        >
          MODIFIER
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2"
      >
        <CheckBox
          id="generalTerms"
          value={values.generalTerms}
          label="Je reconnais avoir pris connaissance des conditions générales d'utilisation et de service, et accepte celles-ci sans réserve."
          labelClassName={labelClasses}
          errors={errors}
          setFieldValue={setFieldValue}
        />

        <CheckBox
          id="application"
          value={values.application}
          label="J'accepte, en application des dispositions de l'article L.221-28 1° du Code de la Consommation, que le service soit exécuté dans les meilleurs délais suivant la validation de ma commande et en tous cas avant l'expiration du délai de rétractation de 14 jours prévu par l'article L.221-18 du Code de la Consommation"
          labelClassName={labelClasses}
          errors={errors}
          setFieldValue={setFieldValue}
        />

        <CheckBox
          id="personalData"
          value={values.personalData}
          label="Dans le cas uniquement où j'ai autorisé ci-dessus le service à être exécuté avant l'expiration du délai de rétractation de 14 jours, je renonce expressément, en application des dispositions de l'article L.221-28 1° du Code de la Consommation, au droit de rétractation applicable en matière de vente de services à distance."
          labelClassName={labelClasses}
          errors={errors}
          setFieldValue={setFieldValue}
        />

        <Button
          className="w-full justify-center py-2 px-8 bg-green-900 rounded text-white"
          disabled={isSubmitting}
          type="submit"
          onClick={handleSubmit}
        >
          Continuer
        </Button>
      </form>

      { openModal && <PaiementMethod onClose={() => { setOpenModal(false) }} /> }
      
    </div>
  );
}
 
export default ActValidation;