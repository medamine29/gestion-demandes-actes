import React, { ReactNode } from "react";
import { ActAddress, ActFormat, BirthInfo, CivilityType, DeathInfo, MarriageInfo, Person, Relationship } from "./interfaces.ts";

export const getActTypeOptionsByRelationship = (relationship?: Relationship): ActFormat[] => {
  if (relationship === Relationship.OTHER) return [ ActFormat.EXTRACT_WITHOUT_FILIATION ]
  return [ ActFormat.INTEGRAL_COPY, ActFormat.EXTRACT_WITH_FILIATION, ActFormat.EXTRACT_WITHOUT_FILIATION, ActFormat.EXTRAIT_PLURILINGUE ]
}

export const getBirthActValidationsComponent = (birthInfo: Partial<BirthInfo>, actAddress: Partial<ActAddress>): ReactNode => {

  return (
    <div className="p-2 bg-gray-200 rounded">
      <div className="font-semibold p-1 underline"> L'acte concerne : </div>
      <div className="py-1 px-3"> 
        { birthInfo.civility === CivilityType.MALE ? "Monsieur" : "Madame" } 
        <strong> 
          { ` ${birthInfo.firstName} ${birthInfo.lastName}` } 
        </strong>
        , né(e) le 
        <strong>
          { ` ${ birthInfo.birthDate } à ${ birthInfo.birthPlace } ${birthInfo.country}.` }
        </strong>
        { getFathersInfo(birthInfo.unknownFather, birthInfo.fathersFirstName!, birthInfo.fathersLastName!) }
        { getMothersInfo(birthInfo.unknownMother, birthInfo.mothersFirstName!, birthInfo.mothersLastName!) }
      </div>
      <div className="font-semibold p-1 underline"> Détails de l'acte : </div>
      <div className="py-1 px-3">
        <div> <strong> Relation avec la personne concernée : </strong>  { birthInfo.relationship } </div>
        <div> <strong> Type d'acte demandé : </strong>  { birthInfo.actFormat } </div>
        <div> <strong> Motif de la demande demande : </strong>  { birthInfo.requestReason } </div>
      </div>
      <div className="font-semibold p-1 underline"> Adresse : </div>
      <div className="py-1 px-3">
        <div>
          L' <strong> acte </strong> vous sera envoyé à l'adresse :
          <div>
            { actAddress.civility === CivilityType.MALE ? "Monsieur" : "Madame" } 
            <strong> { `${ actAddress.firstName } ${ actAddress.lastName }` } </strong>
            <div>
              { `${actAddress.address} ${actAddress.postalCode} ${actAddress.city},` }
              <strong> { actAddress.country } </strong>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}

export const getParentsInfoByPerson = (person?: Person): ReactNode => {
  if (!person) return <div></div>

  if (person.unknownFather) return (
    <>
      { person.civility === CivilityType.MALE ? ", fils de " : ", fille de " }
      <strong>
        { `${person.mothersFirstName} ${person.mothersLastName} .` }
      </strong>
    </>
  )

  if (person.unknownMother) return (
    <>
      { person.civility === CivilityType.MALE ? ", fils de " : ", fille de " }
      <strong>
        { `${person.fathersFirstName} ${person.fathersLastName}.` }
      </strong>
    </>
  )

  return (
    <>
      { person.civility === CivilityType.MALE ? ", fils de " : ", fille de " }
      <strong>
        { `${person.fathersFirstName} ${person.fathersLastName}` }
      </strong>
      &nbsp; et &nbsp;  
      <strong>
        { `${person.mothersFirstName} ${person.mothersLastName}.` }
      </strong>
    </>
  )
}

export const getMothersInfo = (unknown: boolean = false, firstName: string, lastName: string): ReactNode => {
  if (unknown) return <div> Mère inconnue  </div>
  return <div> <strong> Mère : </strong>  { `${firstName} ${lastName}` } </div>
}

export const getFathersInfo = (unknown: boolean = false, firstName: string, lastName: string): ReactNode => {
  if (unknown) return <div> Père inconnu  </div>
  return <div> <strong> Père : </strong>  { `${firstName} ${lastName}` } </div>
}

export const getMarriageActValidationsComponent = (marriageInfo: Partial<MarriageInfo>, actAddress: Partial<ActAddress>): ReactNode => {

  return (
    <div className="p-2 bg-gray-200 rounded">
      <div className="font-semibold p-1 underline"> L'acte concerne : </div>
      <div className="py-1 px-3">
        <div className="ml-2">
          - { marriageInfo.firstPerson?.civility === CivilityType.MALE ? "Monsieur" : "Madame" }
          <strong> 
            { ` ${marriageInfo.firstPerson?.firstName} ${marriageInfo.firstPerson?.usageLastName} ${marriageInfo.firstPerson?.lastName}` } 
          </strong>
          , né(e) le
          <strong>
            { ' ' + marriageInfo.firstPerson?.birthDate }
          </strong>
          { getFathersInfo(marriageInfo.firstPerson?.unknownFather, marriageInfo.firstPerson?.fathersFirstName!, marriageInfo.firstPerson?.fathersLastName!) }
          { getMothersInfo(marriageInfo.firstPerson?.unknownMother, marriageInfo.firstPerson?.mothersFirstName!, marriageInfo.firstPerson?.mothersLastName!) }
        </div>
        <div className="ml-2">
          - { marriageInfo.secondPerson?.civility === CivilityType.MALE ? "Monsieur" : "Madame" }
          <strong> 
            { ` ${marriageInfo.secondPerson?.firstName} ${marriageInfo.secondPerson?.usageLastName} ${marriageInfo.secondPerson?.lastName}` } 
          </strong>
          , né(e) le
          <strong>
            { ' ' + marriageInfo.secondPerson?.birthDate }
          </strong>
          { getFathersInfo(marriageInfo.secondPerson?.unknownFather, marriageInfo.secondPerson?.fathersFirstName!, marriageInfo.secondPerson?.fathersLastName!) }
          { getMothersInfo(marriageInfo.secondPerson?.unknownMother, marriageInfo.secondPerson?.mothersFirstName!, marriageInfo.secondPerson?.mothersLastName!) }
        </div>
      </div>
      <div className="font-semibold p-1 underline"> Détails de l'acte : </div>
        <div className="py-1 px-3">
          <div> <strong> Date et lieu : </strong>  { marriageInfo.marriageDate } à { `${marriageInfo.marriagePlace}, ${marriageInfo.country}` } </div>
          <div> <strong> Relation avec la personne concernée : </strong>  { marriageInfo.relationship } </div>
          <div> <strong> Type d'acte demandé : </strong>  { marriageInfo.actFormat } </div>
          <div> <strong> Motif de la demande demande : </strong>  { marriageInfo.requestReason } </div>
        </div>
      <div className="font-semibold p-1 underline"> Adresse : </div>
        <div className="py-1 px-3">
          <div>
            L' <strong> acte </strong> vous sera envoyé à l'adresse :
            <div>
              { actAddress.civility === CivilityType.MALE ? "Monsieur" : "Madame" } 
              <strong> { `${ actAddress.firstName } ${ actAddress.lastName }` } </strong>
              <div>
                { `${actAddress.address} ${actAddress.postalCode} ${actAddress.city},` }
                <strong> { actAddress.country } </strong>
              </div>
            </div> 
          </div>
        </div>
    </div>
  )
}

export const getDeathActValidationsComponent = (deathInfo: Partial<DeathInfo>, actAddress: Partial<ActAddress> ): ReactNode => {

  return (
    <div className="p-2 bg-gray-200 rounded">
      <div className="font-semibold p-1 underline"> L'acte concerne : </div>
      <div className="py-1 px-3"> 
        { deathInfo.civility === CivilityType.MALE ? "Monsieur" : "Madame" } 
        <strong> 
          { ` ${deathInfo.firstName} ${deathInfo.lastName}` } 
        </strong>
        , décedé(e) le 
        <strong>
          { ` ${ deathInfo.deathDate } à ${ deathInfo.deathPlace } ${deathInfo.country}` }
        </strong>
      </div>
      <div className="font-semibold p-1 underline"> Détails de l'acte : </div>
      <div className="py-1 px-3">
        <div> <strong> Relation avec la personne concernée : </strong>  { deathInfo.relationship } </div>
        <div> <strong> Type d'acte demandé : </strong>  { deathInfo.actFormat } </div>
        <div> <strong> Motif de la demande demande : </strong>  { deathInfo.requestReason } </div>
      </div>
      <div className="font-semibold p-1 underline"> Adresse : </div>
      <div className="py-1 px-3">
        <div>
          L' <strong> acte </strong> vous sera envoyé à l'adresse :
          <div>
            { actAddress.civility === CivilityType.MALE ? "Monsieur" : "Madame" } 
            <strong> { `${ actAddress.firstName } ${ actAddress.lastName }` } </strong>
            <div>
              { `${actAddress.address} ${actAddress.postalCode} ${actAddress.city},` }
              <strong> { actAddress.country } </strong>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}