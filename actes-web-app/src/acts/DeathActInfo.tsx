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
import { civilityRadioGroupOptions } from "../data/actesData.tsx";
import TextField from "../components/common/TextField.tsx";
import { CgProfile } from "react-icons/cg";

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
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 items-center items-stretch p-2"
      >
        <RadioGroup 
          id="civility"
          label="Civilité"
          value={values.civility}
          options={civilityRadioGroupOptions}
          setFieldValue={setFieldValue}
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

        <SearchBar
          id="deathPlace"
          value={values.deathPlace || ''}
          touched={touched}
          errors={errors}
          label="Commune de décès"
          placeholder="Sélectionner une commune"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          labelIcon={TbMapPinSearch}
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