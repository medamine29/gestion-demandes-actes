import React from "react";
import { setDeathInfo, useFetchCountriesQuery, useTypedDispatch, useTypedSelector } from "../store/index.ts";
import { FormikHelpers, useFormik } from "formik";
import { DeathInfo } from "../data/interfaces.ts";
import { deathFormSchema } from "../data/validations.tsx";
import Button from "../components/common/Button.tsx";
import DateInput from "../components/common/DateInput.tsx";
import Dropdown from "../components/common/DropDown.tsx";
import SearchBar from "../components/common/SearchBar.tsx";
import { TbMapPinSearch } from "react-icons/tb";
import RadioGroup from "../components/common/RadioGroup.tsx";
import { civilityRadioGroupOptions, relationshipOptions, requestReasonOptions } from "../data/actesData.tsx";
import TextField from "../components/common/TextField.tsx";
import { CgProfile } from "react-icons/cg";
import { getActTypeOptionsByRelationship } from "../data/helpers.tsx";

interface DeathActInfoProps {
  setActiveStep: (step: number) => void;
}

const DeathActInfo: React.FC<DeathActInfoProps> = ({ setActiveStep }) => {

  const dispatch = useTypedDispatch()
  const initialDeathAct = useTypedSelector((state) => state.deathAct)

  // queries & mutations
  const { 
    data: countries,
    isFetching: isFetchingCountries
  } = useFetchCountriesQuery()
  
  const handleSubmitForm = async (values: Partial<DeathInfo>, actions: FormikHelpers<Partial<DeathInfo>>) => {
    const validValues = values as Required<DeathInfo>
    dispatch(setDeathInfo(validValues))
    setActiveStep(1)
  }

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched } = useFormik<Partial<DeathInfo>>({
    initialValues: initialDeathAct,
    validationSchema: deathFormSchema,
    onSubmit: handleSubmitForm
  })

  return (  
    <div className="flex flex-col items-center gap-2">
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 items-center items-stretch p-1"
      >
        
        <div className="col-span-2">
          <RadioGroup 
            id="civility"
            label="Civilité"
            value={values.civility}
            options={civilityRadioGroupOptions}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
          />
        </div>

        <TextField
          id="lastName"
          value={values.lastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom de naissance"
          placeholder="Saisir votre nom"
          info="Veuillez renseigner le nom de naissance de la personne concernée par l'acte de décès."
          labelIcon={CgProfile}
        />

        <TextField
          id="firstName"
          value={values.firstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Prénom(s)"
          placeholder="Saisir votre prénom"
          info="Veuillez renseigner le ou les prénoms de naissance de la personne concernée par l'acte de décès."
          labelIcon={CgProfile}
        />

        <SearchBar
          id="deathPlace"
          value={values.deathPlace || ''}
          touched={touched}
          errors={errors}
          label="Lieu de décès"
          placeholder="Sélectionner une commune"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          labelIcon={TbMapPinSearch}
        />

        <DateInput
          id="deathDate"
          label="Date de décès"
          value={values.deathDate || ''}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />

        <Dropdown
          id="country"
          options={countries}
          value={values.country || ''} 
          label="Pays"
          isFetching={isFetchingCountries}
          placeholder="Sélectionner un pays"
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />

        <Dropdown
          id="relationship"
          options={relationshipOptions}
          value={values.relationship}
          label="Vous êtes"
          placeholder="Sélectionner votre relation avec la personne concernée"
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />

        <Dropdown
          id="actFormat"
          options={getActTypeOptionsByRelationship(values.relationship)}
          value={values.actFormat}
          label="Type d'acte demandé"
          placeholder="Sélectionner le type d'acte"
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />

        <Dropdown
          id="requestReason"
          options={requestReasonOptions}
          value={values.requestReason}
          label="Motif de la demande"
          placeholder="Sélectionner le motif de la demande"
          touched={touched}
          errors={errors}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />

      </form>

      <Button
        className="justify-center py-2 px-8 bg-green-900 w-full rounded text-white"
        disabled={isSubmitting}
        type="submit"
        onClick={handleSubmit}
      >
        Continuer
      </Button>
    </div>
  );
}
 
export default DeathActInfo;