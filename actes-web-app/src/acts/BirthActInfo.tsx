import React from "react";
import { FormikHelpers, useFormik } from "formik";
import { BirthInfo } from "../data/interfaces.ts"
import { birthFormSchema } from "../data/validations.tsx";
import { setBirthInfo, useFetchCountriesQuery, useTypedDispatch, useTypedSelector } from "../store/index.ts";
import TextField from "../components/common/TextField.tsx";
import { CgProfile } from "react-icons/cg";
import Button from "../components/common/Button.tsx";
import RadioGroup from "../components/common/RadioGroup.tsx";
import { civilityRadioGroupOptions, birthActRelationshipOptions, birthActRequestReasonOptions } from "../data/actesData.tsx";
import DateInput from "../components/common/DateInput.tsx";
import Dropdown from "../components/common/DropDown.tsx";
import SearchBar from "../components/common/SearchBar.tsx";
import { TbMapPinSearch } from "react-icons/tb";
import CheckBox from "../components/common/CheckBox.tsx";
import { getActTypeOptionsByRelationship } from "../data/helpers.tsx";

interface BirthActInfoProps {
  setActiveStep: (step: number) => void;
}

const BirthActInfo: React.FC<BirthActInfoProps> = ({ setActiveStep }) => {

  const dispatch = useTypedDispatch()
  const initialBirthInfo = useTypedSelector((state) => state.birthAct)

  // queries & mutations
  const { 
    data: countries,
    isFetching: isFetchingCountries
  } = useFetchCountriesQuery()
  
  const handleSubmitForm = async (values: Partial<BirthInfo>, actions: FormikHelpers<Partial<BirthInfo>>) => {
    const validValues = values as Required<BirthInfo>
    dispatch(setBirthInfo(validValues))
    setActiveStep(1)
  }

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched } = useFormik<Partial<BirthInfo>>({
    initialValues: initialBirthInfo,
    validationSchema: birthFormSchema,
    onSubmit: handleSubmitForm
  })

  return (  
    <div className="w-full flex flex-col items-center gap-2">
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 items-center items-stretch p-1 bg-customLightBlue p-2"
      >
        <RadioGroup 
          id="civility"
          label="Civilité"
          value={values.civility}
          options={civilityRadioGroupOptions}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
        />

        <DateInput
          id="birthDate"
          label="Date de naissance"
          value={values.birthDate || ''}
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
          info="Veuillez renseigner le nom de naissance de la personne concernée par l'acte de naissance."
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
          info="Veuillez renseigner le ou les prénoms de naissance de la personne concernée par l'acte de naissance."
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
          id="birthPlace"
          value={values.birthPlace || ''}
          touched={touched}
          errors={errors}
          label="Commune de naissance"
          placeholder="Sélectionner une commune"
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          labelIcon={TbMapPinSearch}
        />

        <CheckBox
          id="unknownFather"
          value={values.unknownFather}
          label="Père inconnu"
          errors={errors}
          setFieldValue={setFieldValue}
        />

        <TextField
          id="fathersLastName"
          value={values.fathersLastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom du père"
          placeholder="Saisir le nom du père"
          info="Veuillez renseigner le nom du père de la personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.unknownFather}
        />

        <TextField
          id="fathersFirstName"
          value={values.fathersFirstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Prénom du père"
          placeholder="Saisir le prénom du père"
          info="Veuillez renseigner le prénom du père de la personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.unknownFather}
        />
      
        <CheckBox
          id="unknownMother"
          value={values.unknownMother}
          label="Mère inconnu"
          errors={errors}
          setFieldValue={setFieldValue}
        />

        <TextField
          id="mothersLastName"
          value={values.mothersLastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom de jeune fille de la mère"
          placeholder="Saisir le nom de jeune fille de la mère"
          info="Veuillez renseigner le nom de jeune fille de la mère de la personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.unknownMother}
        />

        <TextField
          id="mothersFirstName"
          value={values.mothersFirstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Prénom de la mère"
          placeholder="Saisir le prénom de la mère"
          info="Veuillez renseigner le prénom de la mère de la personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.unknownMother}
        />

          <Dropdown
            id="relationship"
            options={birthActRelationshipOptions}
            value={values.relationship}
            label="Vous êtes"
            placeholder="Sélectionner votre relation avec la personne concernée"
            touched={touched}
            errors={errors}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            className="col-span-1 md:col-span-2"
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
            options={birthActRequestReasonOptions}
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
        className="justify-center py-2 px-8 bg-customBlue rounded text-white"
        disabled={isSubmitting}
        type="submit"
        onClick={handleSubmit}
      >
        Continuer
      </Button>
    </div>
  );
}
 
export default BirthActInfo;