import { ActFormat, Acte, ActeType, Category, CivilityType, Model, RadioOption, Relationship } from "./interfaces.ts"
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

export const relationshipOptions: Relationship[] = [
  Relationship.CONCERNED_PERSON,
  Relationship.PARENT,
  Relationship.SPOUSE,
  Relationship.CHILD,
  Relationship.GRAND_PARENT,
  Relationship.GRAND_CHILD,
  Relationship.LEGAL_REPRESENTANT,
  Relationship.HEIR,
  Relationship.OTHER,
]