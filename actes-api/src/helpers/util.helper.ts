import { Civility } from "../constants/global.constant"
import { ActDetails, ActType, BirthInfo, DeathInfo, IAct, IWriteAct, MarriageInfo, Person } from "../models/act.model"
import { formatDate, formatDateShort } from "./date.helper"

export const translateActType = (actType: ActType): string => {
  if (actType === ActType.BIRTH) return 'naissance'
  else if (actType === ActType.DEATH) return 'décès'
  else if (actType === ActType.MARRIAGE) return 'mariage'
  return ''
}

export const formatBirthInfo = (birthInfo: BirthInfo) => {
  const formattedBirthInfo = {
    user: `${birthInfo.civility === Civility.MALE ? 'Monsieur' : 'Madame' } ${birthInfo.firstName} ${birthInfo.lastName}`,
    birthDetails: `Né(e) le ${formatDateShort(birthInfo.birthDate.toISOString())} à ${birthInfo.birthPlace}, ${birthInfo.country}`,
    father: birthInfo.unknownFather ? 'Père inconnu' : `${birthInfo.fathersFirstName} ${birthInfo.fathersLastName}`,
    mother: birthInfo.unknownMother ? 'Mère inconnu' : `${birthInfo.mothersFirstName} ${birthInfo.mothersLastName}`,
  }

  return formattedBirthInfo
}

export const formatDeathInfo = (deathInfo: DeathInfo) => {
  const formattedDeathInfo = {
    user: `${deathInfo.civility === Civility.MALE ? 'Monsieur' : 'Madame' } ${deathInfo.firstName} ${deathInfo.lastName}`,
    deathDetails: `Décedé(e) le ${formatDateShort(deathInfo.deathDate)} à ${deathInfo.deathPlace}, ${deathInfo.country}`,
  }

  return formattedDeathInfo
}

export const formatPerson = (person: Person) => {
  const formattedPerson = {
    user: `${person.civility === Civility.MALE ? 'Monsieur' : 'Madame' } ${person.firstName} ${person.usageLastName} ${person.lastName} né(e) le ${formatDateShort(person.birthDate)}`,
    father: person.unknownFather ? 'Père inconnu' : `${person.fathersFirstName} ${person.fathersLastName}`,
    mother: person.unknownMother ? 'Mère inconnu' : `${person.mothersFirstName} ${person.mothersLastName}`,
  }

  return formattedPerson
}

export const formatMarriageInfo = (marriageInfo: MarriageInfo) => {
  const formattedMarriageInfo = {
    marriageDetails: `le ${formatDateShort(marriageInfo.marriageDate.toISOString())} à ${marriageInfo.marriagePlace}, ${marriageInfo.country}`,
    firstPerson: formatPerson(marriageInfo.firstPerson),
    secondPerson: formatPerson(marriageInfo.secondPerson)
  }

  return formattedMarriageInfo
}

export const formatAct = (act: IAct): ActDetails => {
  const address = act.actAddressInfo
  const formattedAct: ActDetails = {
    _id: act._id,
    actType: act.actType,
    formattedActType: translateActType(act.actType),
    client: {
      user: `${address.civility === Civility.MALE ? 'Monsieur' : 'Madame' } ${address.firstName} ${address.lastName}}`,
      address: `${address.address}, ${address.postalCode}, ${address.city}, ${address.country}`,
      relationship: address.relationship,
      actFormat: address.actFormat,
      email: address.email,
      phone: address.phone
    },
    createdAt: formatDate(act.createdAt.toISOString()),
    isArchived: act.isArchived,
  }

  if (act.actType === ActType.BIRTH) formattedAct.birthInfo = formatBirthInfo(act.birthInfo)
  else if (act.actType === ActType.DEATH) formattedAct.deathInfo = formatDeathInfo(act.deathInfo)
  else if (act.actType === ActType.MARRIAGE) formattedAct.marriageInfo = formatMarriageInfo(act.marriageInfo)

  return formattedAct
}

export const getMailContentByAct = (act: IAct): string => {
  const formattedAct = formatAct(act)
  const { birthInfo, deathInfo, marriageInfo, client } = formattedAct

  const addressContent = (
    `
      <div style="margin-top: 4px; font-weight: bold;"> L'acte vous sera livrée à l'adresse suivante:  </div>
      <div style="margin-top: 4px;"> ${client.address} </div>
    `
  )

  if  (act.actType === ActType.BIRTH && birthInfo) {
    return (
      `
        <div> Acte de naissance pour ${birthInfo.user}. ${birthInfo.birthDetails}. </div>
        <div> Père : ${birthInfo.father}. </div>
        <div> Mère : ${birthInfo.mother}. </div>
        ${addressContent}
      `
    )
  } else if (act.actType === ActType.MARRIAGE && marriageInfo) {

    const { marriageDetails, firstPerson, secondPerson } = marriageInfo

    return (
      `
        <div> Acte de mariage pour : </div>
        <div> - ${firstPerson.user} </div>
        <div> Père :  ${firstPerson.father} </div>
        <div> Mère : ${firstPerson.mother} </div>
        <div> - ${secondPerson.user} </div>
        <div> Père :  ${secondPerson.father} </div>
        <div> Mère : ${secondPerson.mother} </div>
        <div style="margin-top: 4px; margin-bottom: 4px;"> <u> Marriés ${marriageDetails} </u> </div>
        ${addressContent}
      `
    )
  } else if (act.actType === ActType.DEATH && deathInfo) {
    return (
      `
        <div> Acte de décès pour : </div> 
        <div> ${deathInfo.user} ${deathInfo.deathDetails} </div>
        ${addressContent}
      `
    )
  }

  return ''
}