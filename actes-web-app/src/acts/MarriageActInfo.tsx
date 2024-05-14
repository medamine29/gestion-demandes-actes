import React, { useEffect } from "react";
import { setMarriageInfo, useFetchCountriesQuery, useTypedDispatch, useTypedSelector } from "../store/index.ts";
import { FormikHelpers, useFormik } from "formik";
import { MarriageInfo } from "../data/interfaces.ts";
import { marriageFormSchema } from "../data/validations.tsx";
import Button from "../components/common/Button.tsx";
import DateInput from "../components/common/DateInput.tsx";
import Dropdown from "../components/common/DropDown.tsx";
import SearchBar from "../components/common/SearchBar.tsx";
import { TbMapPinSearch } from "react-icons/tb";
import RadioGroup from "../components/common/RadioGroup.tsx";
import { civilityRadioGroupOptions } from "../data/actesData.tsx";
import TextField from "../components/common/TextField.tsx";
import { CgProfile } from "react-icons/cg";
import CheckBox from "../components/common/CheckBox.tsx"

interface MarriageActInfoProps {
  setActiveStep: (step: number) => void;
}

const MarriageActInfo: React.FC<MarriageActInfoProps> = ({ setActiveStep }) => {

  const dispatch = useTypedDispatch()
  const initialMarriageInfo = useTypedSelector((state) => state.marriageAct)

  // queries & mutations
  const { 
    data: countries,
    isFetching: isFetchingCountries
  } = useFetchCountriesQuery()
  
  const handleSubmitForm = async (values: Partial<MarriageInfo>, actions: FormikHelpers<Partial<MarriageInfo>>) => {
    const validValues = values as Required<MarriageInfo>
    dispatch(setMarriageInfo(validValues))
    setActiveStep(1)
  }

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched } = useFormik<Partial<MarriageInfo>>({
    initialValues: initialMarriageInfo,
    validationSchema: marriageFormSchema,
    onSubmit: handleSubmitForm
  })

  return (
    <div className="flex flex-col items-center gap-2">
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 items-center items-stretch p-2"
      >

      <div className="col-span-2">
        <DateInput
          id="marriageDate"
          label="Date du mariage"
          value={values.marriageDate || ''}
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
        />
      </div>
        
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
        id="marriagePlace"
        value={values.marriagePlace || ''}
        touched={touched}
        errors={errors}
        label="Commune du mariage"
        placeholder="Sélectionner une commune"
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        labelIcon={TbMapPinSearch}
      />

      <div className="col-span-2 w-full grid grid-cols-1 md:grid-cols-2 gap-2 items-center items-stretch border border-gray-700 rounded">
        
        <div className="col-span-2 p-2 border-b font-semibold">
          Identité de la 1ère personne faisant l'objet de la demande
        </div>
        
        <RadioGroup 
          id="firstPerson.civility"
          label="Civilité"
          value={values.firstPerson?.civility}
          options={civilityRadioGroupOptions}
          setFieldValue={setFieldValue}
        />

        <TextField
          id="firstPerson.firstName"
          value={values.firstPerson?.firstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Prénom de naissance"
          placeholder="Saisir le prénom de naissance"
          info="Veuillez renseigner le prénom de naissance de la première personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
        />

        <TextField
          id="firstPerson.lastName"
          value={values.firstPerson?.lastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom de naissance"
          placeholder="Saisir le nom de naissance"
          info="Veuillez renseigner le nom de naissance de la première personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
        />

        <TextField
          id="firstPerson.usageLastName"
          value={values.firstPerson?.usageLastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom d'usage (si différent)"
          placeholder="Saisir le nom d'usage"
          info="Veuillez renseigner le nom d'usage si différent de la première personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
        />

        <div className="col-span-2">
          <DateInput
            id="firstPerson.birthDate"
            label="Date de naissance"
            value={values.firstPerson?.birthDate || ''}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        </div>

        <CheckBox
          id="firstPerson.unknownFather"
          value={values.firstPerson?.unknownFather}
          label="Père inconnu"
          errors={errors}
          setFieldValue={setFieldValue}
        />

        <TextField
          id="firstPerson.fathersLastName"
          value={values.firstPerson?.fathersLastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom du père"
          placeholder="Saisir le nom du père"
          info="Veuillez renseigner le nom du père de la premiére personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.firstPerson?.unknownFather}
        />

        <TextField
          id="firstPerson.fathersFirstName"
          value={values.firstPerson?.fathersFirstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Prénom du père"
          placeholder="Saisir le prénom du père"
          info="Veuillez renseigner le prénom du père de la premiére personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.firstPerson?.unknownFather}
        />

        <CheckBox
          id="firstPerson.unknownMother"
          value={values.firstPerson?.unknownMother}
          label="Mère inconnu"
          errors={errors}
          setFieldValue={setFieldValue}
        />

        <TextField
          id="firstPerson.mothersLastName"
          value={values.firstPerson?.mothersLastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom du mère"
          placeholder="Saisir le nom de la mère"
          info="Veuillez renseigner le nom de la mère de la premiére personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.firstPerson?.unknownMother}
        />

        <TextField
          id="firstPerson.mothersFirstName"
          value={values.firstPerson?.mothersFirstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Prénom de la mère"
          placeholder="Saisir le prénom de la mère"
          info="Veuillez renseigner le prénom de la mère de la premiére personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.firstPerson?.unknownMother}
        />
        
      </div>

      <div className="col-span-2 w-full grid grid-cols-1 md:grid-cols-2 gap-2 items-center items-stretch border border-gray-700 rounded">
        
        <div className="col-span-2 p-2 border-b font-semibold">
          Identité de la 2éme personne faisant l'objet de la demande
        </div>
        
        <RadioGroup 
          id="secondPerson.civility"
          label="Civilité"
          value={values.secondPerson?.civility}
          options={civilityRadioGroupOptions}
          setFieldValue={setFieldValue}
        />

        <TextField
          id="secondPerson.firstName"
          value={values.secondPerson?.firstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Prénom de naissance"
          placeholder="Saisir le prénom de naissance"
          info="Veuillez renseigner le prénom de naissance de la deuxiéme personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
        />

        <TextField
          id="secondPerson.lastName"
          value={values.secondPerson?.lastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom de naissance"
          placeholder="Saisir le nom de naissance"
          info="Veuillez renseigner le nom de naissance de la deuxiéme personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
        />

        <TextField
          id="secondPerson.usageLastName"
          value={values.secondPerson?.usageLastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom d'usage (si différent)"
          placeholder="Saisir le nom d'usage"
          info="Veuillez renseigner le nom d'usage si différent de la deuxiéme personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
        />

        <div className="col-span-2">
          <DateInput
            id="secondPerson.birthDate"
            label="Date de naissance"
            value={values.secondPerson?.birthDate || ''}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
          />
        </div>

        <CheckBox
          id="secondPerson.unknownFather"
          value={values.secondPerson?.unknownFather}
          label="Père inconnu"
          errors={errors}
          setFieldValue={setFieldValue}
        />

        <TextField
          id="secondPerson.fathersLastName"
          value={values.secondPerson?.fathersLastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom du père"
          placeholder="Saisir le nom du père"
          info="Veuillez renseigner le nom du père de la deuxiéme personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.secondPerson?.unknownFather}
        />

        <TextField
          id="secondPerson.fathersFirstName"
          value={values.secondPerson?.fathersFirstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Prénom du père"
          placeholder="Saisir le prénom du père"
          info="Veuillez renseigner le prénom du père de la deuxiéme personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.secondPerson?.unknownFather}
        />

        <CheckBox
          id="secondPerson.unknownMother"
          value={values.secondPerson?.unknownMother}
          label="Mère inconnu"
          errors={errors}
          setFieldValue={setFieldValue}
        />

        <TextField
          id="secondPerson.mothersLastName"
          value={values.secondPerson?.mothersLastName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Nom de la mère"
          placeholder="Saisir le nom de la mère"
          info="Veuillez renseigner le nom de la mère de la deuxiéme personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.secondPerson?.unknownMother}
        />

        <TextField
          id="secondPerson.mothersFirstName"
          value={values.secondPerson?.mothersFirstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Prénom de la mère"
          placeholder="Saisir le prénom de la mère"
          info="Veuillez renseigner le prénom de la mère de la deuxiéme personne concernée par l'acte de naissance."
          labelIcon={CgProfile}
          disabled={values.secondPerson?.unknownMother}
        />
        
      </div>

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
 
export default MarriageActInfo;