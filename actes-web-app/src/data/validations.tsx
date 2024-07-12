import * as yup from "yup"
import { ActFormat, CivilityType, Relationship, RequestReason } from "./interfaces.ts"

const nowDate = new Date()
const alphabeticalRegex = /^[A-Za-z\s]+$/;
const postalCodeRegex = /^\d{5}$/;
const phoneNumberRegex = /^0\d(\s?\d{2}){4}$/;

export const birthFormSchema = yup.object().shape({
  civility: yup.string().oneOf(Object.values(CivilityType), "Veuillez renseigner une civilité valide").required("Ce champs est requis"),
  relationship: yup.string().oneOf(Object.values(Relationship), "Veuillez renseigner une relation valide").required("Ce champs est requis"),
  requestReason: yup.string().oneOf(Object.values(RequestReason), "Veuillez renseigner un motif valide").required("Ce champs est requis"),
  actFormat: yup.string().oneOf(Object.values(ActFormat), "Veuillez renseigner une relation valide").required("Ce champs est requis"),
  birthDate: yup.string()
    .test("isDate-check", "Veuillez renseigner une date valide", (value) => {
      if (!value) return false
      const valueAsDate = new Date(value)
      if (valueAsDate instanceof Date && !isNaN(valueAsDate.getTime())) return true
      return false;
    })
    .test("birthDate-check", "Veuillez renseigner une date antérieur à la date de ce jour", (value) => {
      if (!value) return false
      return new Date(value) < nowDate
    })
    .required("Ce champs est requis"),
  lastName: yup.string().min(2, "Le nom est trop court")
    .matches(alphabeticalRegex, "Le nom ne peut contenir que des lettres")
    .required("Ce champs est requis"),
  firstName: yup.string().min(2, "Le prénom est trop court")
    .matches(alphabeticalRegex, "Le prénom ne peut contenir que des lettres")
    .required("Ce champs est requis"),
  country: yup.string().required("Ce champs est requis"),
  birthPlace: yup.string().required("Ce champs est requis"),
  unknownFather: yup.boolean().required("Ce champs est requis"),
  fathersFirstName: yup.string().min(2, "Le prénom est trop court")
    .matches(alphabeticalRegex, "Le prénom ne peut contenir que des lettres")
    .when('unknownFather', 
    ([unknownFather], schema) => {
      if (!unknownFather) return schema.required("Ce champs est requis")
      else return yup.string()
    }),
  fathersLastName: yup.string().min(2, "Le nom est trop court")
    .matches(alphabeticalRegex, "Le nom ne peut contenir que des lettres")
    .when('unknownFather', 
    ([unknownFather], schema) => {
      if (!unknownFather) return schema.required("Ce champs est requis")
      else return yup.string()
    }),
  unknownMother: yup.boolean().required("Ce champs est requis")
    .when('unknownFather', 
      ([unknownFather], schema) => {
        if (unknownFather) return schema.oneOf([false], "Veuillez renseigner au moins un parent")
        else return yup.boolean()
      }),
  mothersFirstName: yup.string().min(2, "Le prénom est trop court")
    .matches(alphabeticalRegex, "Le prénom ne peut contenir que des lettres")
    .when('unknownMother', 
    ([unknownMother], schema) => {
      if (!unknownMother) return schema.required("Ce champs est requis")
      else return yup.string()
    }),
    mothersLastName: yup.string().min(2, "Le nom est trop court")
    .matches(alphabeticalRegex, "Le nom ne peut contenir que des lettres")
    .when('unknownMother', 
    ([unknownMother], schema) => {
      if (!unknownMother) return schema.required("Ce champs est requis")
      else return yup.string()
    })
})

export const birthAddressSchema = yup.object().shape({
  civility: yup.string().oneOf(Object.values(CivilityType), "Veuillez renseigner une civilité valide").required("Ce champs est requis"),
  lastName: yup.string().min(2, "Le nom est trop court")
    .matches(alphabeticalRegex, "Le nom ne peut contenir que des lettres")
    .required("Ce champs est requis"),
  firstName: yup.string().min(2, "Le prénom est trop court")
    .matches(alphabeticalRegex, "Le prénom ne peut contenir que des lettres")
    .required("Ce champs est requis"),
  country: yup.string().required("Ce champs est requis"),
  address: yup.string().required("Ce champs est requis"),
  postalCode: yup.string().matches(postalCodeRegex, "Veuillez renseigner un code postal valide").required("Ce champs est requis"),
  city: yup.string().required("Ce champs est requis"),
  email: yup.string().email("Veuillez renseigner un email valide").required("Ce champs est requis"),
  validateEmail: yup.string()
    .email("Veuillez renseigner un email valide")
    .oneOf([yup.ref('email')], "Les adresses email ne correspondent pas")
    .required("Ce champs est requis"),
  phone: yup.string().matches(phoneNumberRegex, "Veuillez renseigner un numéro valide").required("Ce champs est requis")
})

export const termAgreementSchema = yup.object().shape({
  pricing: yup.boolean().oneOf([true], "Veuillez cocher la case ci-dessus").required("Veuillez cocher la case ci-dessus"),
  generalTerms: yup.boolean().oneOf([true], "Veuillez cocher la case ci-dessus").required("Veuillez cocher la case ci-dessus"),
  personalData: yup.boolean().oneOf([true], "Veuillez cocher la case ci-dessus").required("Veuillez cocher la case ci-dessus"),
  application: yup.boolean().oneOf([true], "Veuillez cocher la case ci-dessus").required("Veuillez cocher la case ci-dessus")
})

const personSchema = yup.object({
  civility: yup.string().oneOf(Object.values(CivilityType), "Veuillez renseigner une civilité valide").required("Ce champs est requis"),
  lastName: yup.string().min(2, "Le nom est trop court")
    .matches(alphabeticalRegex, "Le nom ne peut contenir que des lettres")
    .required("Ce champs est requis"),
  usageLastName: yup.string().min(2, "Le nom d'usage est trop court")
    .matches(alphabeticalRegex, "Le nom d'usage ne peut contenir que des lettres"),
  firstName: yup.string().min(2, "Le prénom est trop court")
    .matches(alphabeticalRegex, "Le prénom ne peut contenir que des lettres")
    .required("Ce champs est requis"),
  birthDate: yup.string()
    .test("isDate-check", "Veuillez renseigner une date valide", (value) => {
      if (!value) return false
      const valueAsDate = new Date(value)
      if (valueAsDate instanceof Date && !isNaN(valueAsDate.getTime())) return true
      return false;
    })
    .test("birthDate-check", "Veuillez renseigner une date antérieur à la date de ce jour", (value) => {
      if (!value) return false
      return new Date(value) < nowDate
    })
    .required("Ce champs est requis"),
  unknownFather: yup.boolean().required("Ce champs est requis"),
  fathersFirstName: yup.string().min(2, "Le prénom est trop court")
    .matches(alphabeticalRegex, "Le prénom ne peut contenir que des lettres")
    .when('unknownFather', 
      ([unknownFather], schema) => {
        if (!unknownFather) return schema.required("Ce champs est requis")
        else return yup.string()
      }),
  fathersLastName: yup.string().min(2, "Le nom est trop court")
    .matches(alphabeticalRegex, "Le nom ne peut contenir que des lettres")
    .when('unknownFather', 
      ([unknownFather], schema) => {
        if (!unknownFather) return schema.required("Ce champs est requis")
        else return yup.string()
      }),
  unknownMother: yup.boolean().required("Ce champs est requis")
    .when('unknownFather', 
    ([unknownFather], schema) => {
      if (unknownFather) return schema.oneOf([false], "Veuillez renseigner au moins un parent")
      else return yup.boolean()
    }),
  mothersFirstName: yup.string().min(2, "Le prénom est trop court")
    .matches(alphabeticalRegex, "Le prénom ne peut contenir que des lettres")
    .when('unknownMother', 
      ([unknownMother], schema) => {
        if (!unknownMother) return schema.required("Ce champs est requis")
        else return yup.string()
      }),
  mothersLastName: yup.string().min(2, "Le nom est trop court")
    .matches(alphabeticalRegex, "Le nom ne peut contenir que des lettres")
    .when('unknownMother', 
      ([unknownMother], schema) => {
        if (!unknownMother) return schema.required("Ce champs est requis")
        else return yup.string()
      }),
})

export const marriageFormSchema = yup.object().shape({
  marriageDate: yup.string()
    .test("isDate-check", "Veuillez renseigner une date valide", (value) => {
      if (!value) return false
      const valueAsDate = new Date(value)
      if (valueAsDate instanceof Date && !isNaN(valueAsDate.getTime())) return true
      return false;
    })
    .test("birthDate-check", "Veuillez renseigner une date antérieur à la date de ce jour", (value) => {
      if (!value) return false
      return new Date(value) < nowDate
    })
    .required("Ce champs est requis"),
  country: yup.string().required("Ce champs est requis"),
  relationship: yup.string().oneOf(Object.values(Relationship), "Veuillez renseigner une relation valide").required("Ce champs est requis"),
  requestReason: yup.string().oneOf(Object.values(RequestReason), "Veuillez renseigner un motif valide").required("Ce champs est requis"),
  actFormat: yup.string().oneOf(Object.values(ActFormat), "Veuillez renseigner une relation valide").required("Ce champs est requis"),
  marriagePlace: yup.string().min(2, "Le prénom est trop court")
    .required("Ce champs est requis"),
  firstPerson: personSchema,
  secondPerson: personSchema
})

export const deathFormSchema = yup.object().shape({
  civility: yup.string().oneOf(Object.values(CivilityType), "Veuillez renseigner une civilité valide").required("Ce champs est requis"),
  relationship: yup.string().oneOf(Object.values(Relationship), "Veuillez renseigner une relation valide").required("Ce champs est requis"),
  requestReason: yup.string().oneOf(Object.values(RequestReason), "Veuillez renseigner un motif valide").required("Ce champs est requis"),
  actFormat: yup.string().oneOf(Object.values(ActFormat), "Veuillez renseigner une relation valide").required("Ce champs est requis"),
  lastName: yup.string().min(2, "Le nom est trop court")
    .matches(alphabeticalRegex, "Le nom ne peut contenir que des lettres")
    .required("Ce champs est requis"),
  firstName: yup.string().min(2, "Le prénom est trop court")
    .matches(alphabeticalRegex, "Le prénom ne peut contenir que des lettres")
    .required("Ce champs est requis"),
  country: yup.string().required("Ce champs est requis"),
  deathPlace: yup.string().min(2,"Veuillez sélectionner une commune").required("Ce champs est requis"),
  deathDate: yup.string()
    .test("isDate-check", "Veuillez renseigner une date valide", (value) => {
      if (!value) return false
      const valueAsDate = new Date(value)
      if (valueAsDate instanceof Date && !isNaN(valueAsDate.getTime())) return true
      return false;
    })
    .test("birthDate-check", "Veuillez renseigner une date antérieur à la date de ce jour", (value) => {
      if (!value) return false
      return new Date(value) < nowDate
    })
    .required("Ce champs est requis")
})

export const contactFormSchema = yup.object().shape({
  firstName: yup.string().min(2, "Le prénom est trop court")
    .matches(alphabeticalRegex, "Le prénom ne peut contenir que des lettres")
    .required("Ce champs est requis"),
  lastName: yup.string().min(2, "Le nom est trop court")
    .matches(alphabeticalRegex, "Le nom ne peut contenir que des lettres")
    .required("Ce champs est requis"),
  phone: yup.string().matches(phoneNumberRegex, "Veuillez renseigner un numéro valide").required("Ce champs est requis"),
  email: yup.string().email("Veuillez renseigner un email valide").required("Ce champs est requis"),
  content: yup.string().max(500, "Ce champs ne peut pas dépasser 500 charactéres")
})

export const loginSchema = yup.object().shape({
  email: yup.string().email("Veuillez renseigner un email valide").required("Ce champs est requis"),
  password: yup.string().min(8).required("Ce champs est requis")
})