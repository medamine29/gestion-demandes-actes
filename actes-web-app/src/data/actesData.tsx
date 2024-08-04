import { Acte, ActeType, Category, CivilityType, Model, RadioOption, Relationship, RequestReason } from "./interfaces.ts"
import { FaFileWaveform } from "react-icons/fa6";
import { GiLovers } from "react-icons/gi";
import { FaBirthdayCake } from "react-icons/fa";
import React from "react";
import { FaWpforms } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

export const actesList: Acte[] = [
  {
    label: "Acte de naissance",
    type: ActeType.BIRTH,
    path: "/acte-de-naissance",
    renderIcon: (classes) => <FaBirthdayCake className={classes} />
  },
  {
    label: "Acte de mariage",
    type: ActeType.MARRIAGE,
    path: "/acte-de-mariage",
    renderIcon: (classes) => <GiLovers className={classes} />
  },
  {
    label: "Acte de déces",
    type: ActeType.DEATH,
    path: "/acte-de-deces",
    renderIcon: (classes) => <FaFileWaveform className={classes} />
  }
]

export const categoriesList: Category[] = [
  {
    label: "Actes",
    type: Model.ACT,
    path: "/actes",
    renderIcon: (classes) => <FaWpforms className={classes} />
  },
  {
    label: "Messages",
    type: Model.MESSAGE,
    path: "/messages",
    renderIcon: (classes) => <FaRegMessage className={classes} />
  }
]

export const civilityRadioGroupOptions: RadioOption[] = [
  {
    value: CivilityType.MALE,
    label: "Monsieur",
    checked: false
  },
  {
    value: CivilityType.FEMALE,
    label: "Madame",
    checked: false
  }
]

export const marriageActRelationshipOptions: Relationship[] = [
  Relationship.CONCERNED_PERSON,
  Relationship.PARENT,
  Relationship.SIBLING,
  Relationship.SPOUSE,
  Relationship.CHILD,
  Relationship.SIBLING,
  Relationship.GRAND_PARENT,
  Relationship.GRAND_CHILD,
  Relationship.HEIR,
  Relationship.LEGAL_REPRESENTANT,
  Relationship.OTHER,
]

export const birthActRelationshipOptions: Relationship[] = [
  Relationship.CONCERNED_PERSON,
  Relationship.PARENT,
  Relationship.SPOUSE,
  Relationship.CHILD,
  Relationship.SIBLING,
  Relationship.GRAND_PARENT,
  Relationship.GRAND_CHILD,
  Relationship.OTHER,
]

export const deathActRelationshipOptions: Relationship[] = [
  Relationship.PARENT,
  Relationship.SPOUSE,
  Relationship.CHILD,
  Relationship.GRAND_PARENT,
  Relationship.GRAND_CHILD,
  Relationship.LEGAL_REPRESENTANT,
  Relationship.HEIR,
  Relationship.OTHER,
]

export const birthActRequestReasonOptions: RequestReason[] = [
  RequestReason.MARRIAGE_FILE,
  RequestReason.ID,
  RequestReason.PASSPORT,
  RequestReason.SUCCSSION,
  RequestReason.SOCIAL_SECURITY_BENEFITS,
  RequestReason.RETIREMENT,
  RequestReason.PACS,
  RequestReason.GENEALOGY,
  RequestReason.NATIONALITY_CERTIFICATE,
  RequestReason.LITIGATION,
  RequestReason.PENSION,
  RequestReason.OTHER
]

export const deathActRequestReasonOptions: RequestReason[] = [
  RequestReason.SUCCSSION,
  RequestReason.SOCIAL_SECURITY_BENEFITS,
  RequestReason.LITIGATION,
  RequestReason.PENSION,
  RequestReason.GENEALOGY,
  RequestReason.OTHER
]

export const marriageActRequestReasonOptions: RequestReason[] = [
  RequestReason.MARRIAGE_FILE,
  RequestReason.SOCIAL_SECURITY_BENEFITS,
  RequestReason.RETIREMENT,
  RequestReason.GENEALOGY,
  RequestReason.OTHER
]