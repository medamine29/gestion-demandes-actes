import React, { ReactNode, useEffect, useState } from "react";
import { useAddActMutation, useTypedSelector } from "../store/index.ts";
import { ActAddress, ActeType, AddAct, BirthInfo, DeathInfo, MarriageInfo, TermAgreement } from "../data/interfaces.ts";
import { getBirthActValidationsComponent, getDeathActValidationsComponent, getMarriageActValidationsComponent } from "../data/helpers.tsx";
import Button from "../../src/components/common/Button.tsx"
import CheckBox from "../components/common/CheckBox.tsx";
import { FormikHelpers, useFormik } from "formik";
import { termAgreementSchema } from "../data/validations.tsx";
import PaiementMethod from "../components/actes/PaiementMethod.tsx";
import { useSnackbar } from 'react-simple-snackbar'
interface ActValidationProps {
  setActiveStep: (step: number) => void;
}

const ActValidation: React.FC<ActValidationProps> = ({ setActiveStep }) => {

  const [openModal, setOpenModal] = useState<boolean>(false)

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

  
  const [addAct] = useAddActMutation();
  const [openSnackbar] = useSnackbar()

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

  const handleSubmitForm = async (values: TermAgreement, actions: FormikHelpers<TermAgreement>) => {
    const validValues = values as Required<TermAgreement>
    handleAddAct()
  }

  const { values, errors, touched, isSubmitting, handleSubmit, setFieldValue } = useFormik<TermAgreement>({
    initialValues: {
      pricing: false,
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
        className="flex flex-col border border-orange-500 rounded cursor-pointer hover:-translate-y-2"
        onClick={() => { setActiveStep(0) }}
      >
        { validationsComponent }
        <Button
          className="justify-center p-3 text-customBlue font-semibold border-0 text-lg underline decoration-orange-700"
        >
          MODIFIER
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2"
      >
        <div className="h-4" />

        <CheckBox
          id="pricing"
          value={values.pricing}
          label="Validez votre commande d’acte de naissance – Frais de traitement : 32€ (incluant les frais d’envoi)"
          labelClassName={labelClasses}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
        />

        <CheckBox
          id="generalTerms"
          value={values.generalTerms}
          labelClassName={labelClasses}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
        >
          En cochant cette case j’accepte les <u> conditions générales de vente </u>
        </CheckBox>

        <CheckBox
          id="application"
          value={values.application}
          label="J&#39;accepte, conformément aux dispositions de l’article du Code de la
            Consommation, que le service soit exécuté dès la validation de ma commande et, en
            tout état de cause, avant l&#39;expiration du délai de rétractation de 14 jours prévu par
            l&#39;article L.221-18 du Code de la Consommation."
          labelClassName={labelClasses}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
        />

        <CheckBox
          id="personalData"
          value={values.personalData}
          label="Uniquement si j&#39;ai autorisé ci-dessus l&#39;exécution du service avant la
            fin du délai de rétractation de 14 jours, je renonce expressément, en vertu des
            dispositions de l&#39;article L.221-28 1° du Code de la Consommation, au droit de
            rétractation applicable aux ventes de services à distance."
          labelClassName={labelClasses}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
        />

        <Button
          className="justify-center py-3 px-8 bg-customBlue rounded text-white text-lg font-semibold underline decoration-orange-700"
          disabled={isSubmitting}
          type="submit"
          onClick={handleSubmit}
        >
          VALIDER LA DEMANDE
        </Button>
      </form>

      { openModal && <PaiementMethod onClose={() => { setOpenModal(false) }} /> }
      
    </div>
  );
}
 
export default ActValidation;