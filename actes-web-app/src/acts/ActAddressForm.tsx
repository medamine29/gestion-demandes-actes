import React from "react";
import { FormikHelpers, useFormik } from "formik";
import { ActAddress } from "../data/interfaces.ts"
import { birthAddressSchema } from "../data/validations.tsx";
import { setActAddress, useFetchCountriesQuery, useTypedDispatch, useTypedSelector } from "../store/index.ts";
import TextField from "../components/common/TextField.tsx";
import { CgProfile } from "react-icons/cg";
import Button from "../components/common/Button.tsx";
import RadioGroup from "../components/common/RadioGroup.tsx";
import { civilityRadioGroupOptions } from "../data/actesData.tsx";
import Dropdown from "../components/common/DropDown.tsx";
import { GiMailbox } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import { FaCity, FaPhone, FaMapPin } from "react-icons/fa";

interface ActAddressProps {
  setActiveStep: (step: number) => void;
}

const ActAddressForm: React.FC<ActAddressProps> = ({ setActiveStep }) => {

  const dispatch = useTypedDispatch()
  const initialBirthAddress = useTypedSelector((state) => state.actAddress)

  // queries & mutations
  const { 
    data: countries,
    isFetching: isFetchingCountries
  } = useFetchCountriesQuery()
  
  const handleSubmitForm = async (values: Partial<ActAddress>, actions: FormikHelpers<Partial<ActAddress>>) => {
    const validValues = values as Required<ActAddress>
    dispatch(setActAddress(validValues))
    setActiveStep(2)
  }

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit, setFieldValue, setFieldTouched } = useFormik<Partial<ActAddress>>({
    initialValues: initialBirthAddress,
    validationSchema: birthAddressSchema,
    onSubmit: handleSubmitForm,
  })

  return (  
    <div className="flex flex-col items-center gap-2 bg-customLightBlue p-2">
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 items-center items-stretch p-1"
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

        <Dropdown
          id="country"
          options={countries}
          value={values.country}
          label="Pays de résidence"
          isFetching={isFetchingCountries}
          placeholder="Sélectionner un pays"
          touched={touched}
          errors={errors}
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
          label="Nom"
          placeholder="Saisir votre nom"
          info="Veuillez renseigner votre nom"
          labelIcon={CgProfile}
        />

        <TextField
          id="firstName"
          value={values.firstName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Prénom"
          placeholder="Saisir votre prénom"
          info="Veuillez renseigner votre prénom"
          labelIcon={CgProfile}
        />

        <TextField
          id="address"
          value={values.address || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Adresse"
          placeholder="Saisir votre adresse"
          info="Veuillez renseigner votre adresse"
          labelIcon={GiMailbox}
        />

        <TextField
          id="postalCode"
          value={values.postalCode || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Code postal"
          placeholder="Saisir votre code postal"
          info="Veuillez renseigner votre code postal"
          labelIcon={FaMapPin}
        />

        <TextField
          id="city"
          value={values.city || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Ville"
          placeholder="Saisir votre ville"
          info="Veuillez renseigner votre ville"
          labelIcon={FaCity}
        />

        <TextField
          id="phone"
          value={values.phone || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Téléphone"
          placeholder="Saisir votre numéro de téléphone"
          info="Veuillez renseigner votre numéro de téléphone"
          labelIcon={FaPhone}
        />

        <TextField
          id="email"
          value={values.email || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Adresse e-mail"
          placeholder="Saisir votre adresse e-mail"
          info="Veuillez renseigner votre adresse e-email"
          labelIcon={MdOutlineEmail}
        />

        <TextField
          id="validateEmail"
          value={values.validateEmail || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched}
          errors={errors}
          label="Confirmation de l'adresse e-mail"
          placeholder="Saisir à nouveau votre adresse e-mail"
          info="Veuillez renseigner votre adresse e-mail à nouveau"
          labelIcon={MdOutlineEmail}
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
 
export default ActAddressForm;