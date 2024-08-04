import { ReactNode } from "react";

export enum ActeType {
  MARRIAGE = "marriage",
  DEATH = "death",
  BIRTH = "birth"
}

export enum CivilityType {
  MALE = "male",
  FEMALE = "female"
}

export enum Relationship {
  CONCERNED_PERSON = "Le titulaire de l'acte",
  SIBLING = "Son frère ou sa soeur",
  PARENT = "Ses parents",
  SPOUSE = "Son conjoint",
  CHILD = "Son fils ou sa fille",
  GRAND_PARENT = "Ses grands parents",
  GRAND_CHILD = "Son petit-fils ou sa petite-fille",
  UNCLE_AUNT = "Son oncle ou sa tante",
  LEGAL_REPRESENTANT = "Son représentant légal",
  HEIR = "Son héritier",
  OTHER = "Autre"
}

export enum ActFormat {
  INTEGRAL_COPY = "Copie intégrale",
  EXTRACT_WITH_FILIATION = "Extrait avec filiation",
  EXTRACT_WITHOUT_FILIATION = "Extrait sans filiation",
  EXTRAIT_PLURILINGUE = "Extrait plurilingue"
}

export enum RequestReason {
  MARRIAGE_FILE = "Constitution d'un dossier de mariage",
  ID = "Carte nationale d'identité",
  PASSPORT = "Passeport",
  SUCCSSION = "Succesion",
  SOCIAL_SECURITY_BENEFITS = "Prestations sociales",
  RETIREMENT = "Retraite",
  PACS = "Constitution d'un dossier de PACS",
  GENEALOGY = "Généalogie (Acte de naissance à partir de 1922)",
  NATIONALITY_CERTIFICATE = "Certificat de nationalité française",
  LITIGATION = "contentieux",
  PENSION = "Pension",
  OTHER = "Autre"
}
export interface Acte {
  label: string,
  type: ActeType,
  path: string,
  renderIcon: (classes?: string) => ReactNode
}

export enum Model {
  ACT = 'act',
  MESSAGE = 'message'
}
export interface Category extends Omit<Acte, 'type'> {
  type: Model;
}

export interface BirthInfo {
  civility: CivilityType,
  relationship: Relationship,
  actFormat: ActFormat,
  requestReason: RequestReason,
  birthDate: string,
  lastName: string,
  firstName: string,
  country: string,
  birthPlace: string,
  unknownFather: boolean,
  fathersFirstName: string,
  fathersLastName: string,
  unknownMother: boolean,
  mothersFirstName: string,
  mothersLastName: string
}

export interface RadioOption {
  value: string,
  label: string,
  checked?: boolean,
}

export interface ActAddress {
  civility: CivilityType,
  firstName: string,
  lastName: string,
  country: string,
  address: string,
  postalCode: string,
  city: string,
  email: string,
  validateEmail: string,
  phone: string
}

export interface TermAgreement {
  pricing: boolean,
  generalTerms: boolean,
  personalData: boolean,
  application: boolean
}

export interface Person  {
  civility?: CivilityType,
  lastName: string,
  usageLastName?: string,
  firstName: string,
  birthDate: string,
  unknownFather: boolean,
  fathersFirstName: string,
  fathersLastName: string,
  unknownMother: boolean,
  mothersFirstName: string,
  mothersLastName: string
}
export interface MarriageInfo {
  marriageDate: string,
  relationship: Relationship,
  actFormat: ActFormat,
  requestReason: RequestReason,
  country: string,
  marriagePlace: string,
  firstPerson: Person,
  secondPerson: Person
}

export interface DeathInfo {
  civility: CivilityType,
  relationship: Relationship,
  actFormat: ActFormat,
  requestReason: RequestReason,
  lastName: string,
  firstName: string,
  country: string,
  deathPlace: string,
  deathDate: string
}

export interface Contact {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  content: string 
}

export interface AddAct {
  actType: ActeType,
  actAddressInfo: Omit<ActAddress, 'validateEmail'>,
  birthInfo?: BirthInfo,
  marriageInfo?: MarriageInfo,
  deathInfo?: DeathInfo
}

export interface Admin {
  email: string,
  password: string
}

export interface ActRequest {
  _id: string,
  formattedActType: string,
  actType: ActeType,
  address: string,
  user: string,
  birthInfo?: BirthInfo,
  marriageInfo?: MarriageInfo,
  deathInfo?: DeathInfo
  createdAt: string
  isArchived: boolean
}

export interface MessageDetails {
  _id: string,
  user: string,
  email: string,
  phone: string,
  content: string,
  createdAt: string,
  isArchived: boolean
}

export interface FetchMessages {
  messages: MessageDetails[],
  messagesCount: number
}

export interface FetchActs {
  acts: ActRequest[],
  actsCount: number
}

export interface SearchQuery {
  showArchived?: boolean,
  actType?: ActeType,
  page?: number,
  perPage?: number
}

export interface Option {
  value: string;
  text: string;
}

export interface PaginationInfo {
  page: number
  perPage: number
  count: number
}

export interface PersonDetails {
  user: string,
  father: string,
  mother: string
}

export interface BirthInfoDetails {
  user: string,
  birthDetails: string,
  father: string,
  mother: string,
  relationship: Relationship,
  requestReason: RequestReason,
  actFormat: ActFormat
}

export interface DeathInfoDetails {
  user: string,
  deathDetails: string,
  relationship: Relationship,
  requestReason: RequestReason,
  actFormat: ActFormat,
}

export interface MarriageInfoDetails {
  marriageDetails: string,
  firstPerson: PersonDetails,
  secondPerson: PersonDetails,
  relationship: Relationship,
  requestReason: RequestReason,
  actFormat: ActFormat,
}

export interface ActClientDetails {
  user: string,
  address: string,
  email: string,
  phone: string
}
export interface ActDetails {
  _id: string,
  actType: ActeType,
  formattedActType: string,
  client: ActClientDetails,
  createdAt: string,
  isArchived: boolean,
  birthInfo: BirthInfoDetails,
  deathInfo: DeathInfoDetails,
  marriageInfo: MarriageInfoDetails
}

export interface MunicipalityDetails {
  _id?: string
  name: string
  address: string
  coordinates: {
    lon: number
    lat: number
  }
  department: string
  city: string
  region: string
  departmentCode: string
  postalCode: string
  email: string
  webSite?: string
}