import React, { ReactNode } from "react";
import { ActAddress, ActFormat, BirthInfo, CivilityType, DeathInfo, MarriageInfo, Person, Relationship } from "./interfaces.ts";

export const getActTypeOptionsByRelationship = (relationship?: Relationship): ActFormat[] => {
  if (relationship === Relationship.OTHER) return [ ActFormat.EXTRACT_WITHOUT_FILIATION ]
  
  if (relationship === Relationship.HEIR) return  [ ActFormat.EXTRACT_WITH_FILIATION, ActFormat.EXTRAIT_PLURILINGUE ]

  return [ ActFormat.INTEGRAL_COPY, ActFormat.EXTRACT_WITH_FILIATION, ActFormat.EXTRAIT_PLURILINGUE ]
}

export const getBirthActValidationsComponent = (birthInfo: Partial<BirthInfo>, actAddress: Partial<ActAddress>): ReactNode => {

  return (
    <div className="p-2 bg-gray-200 rounded">
      <div className="font-semibold p-1 underline"> L'acte concerne : </div>
      <div className="p-2"> 
        { birthInfo.civility === CivilityType.MALE ? "Monsieur" : "Madame" } 
        <strong> 
          { ` ${birthInfo.firstName} ${birthInfo.lastName}` } 
        </strong>
        , né(e) le 
        <strong>
          { ` ${ birthInfo.birthDate } à ${ birthInfo.birthPlace } ${birthInfo.country}` }
        </strong>
        <div>
          L' <strong> acte </strong> vous sera envoyé en <strong> 3 exemplaires </strong> à l'adresse :
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

export const getParentsInfo = (person?: Person): ReactNode => {
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

export const getMarriageActValidationsComponent = (marriageInfo: Partial<MarriageInfo>, actAddress: Partial<ActAddress>): ReactNode => {

  return (
    <div className="p-2 bg-gray-200 rounded">
      <div className="font-semibold p-1 underline"> L'acte concerne : </div>
      <div className="p-2">
        <div className="ml-4">
          - { marriageInfo.firstPerson?.civility === CivilityType.MALE ? "Monsieur" : "Madame" }
          <strong> 
            { ` ${marriageInfo.firstPerson?.firstName} ${marriageInfo.firstPerson?.usageLastName} ${marriageInfo.firstPerson?.lastName}` } 
          </strong>
          , né(e) le
          <strong>
            { ' ' + marriageInfo.firstPerson?.birthDate }
          </strong>
          { getParentsInfo(marriageInfo.firstPerson) }
        </div>
        <div className="ml-4">
          - { marriageInfo.secondPerson?.civility === CivilityType.MALE ? "Monsieur" : "Madame" }
          <strong> 
            { ` ${marriageInfo.secondPerson?.firstName} ${marriageInfo.secondPerson?.usageLastName} ${marriageInfo.secondPerson?.lastName}` } 
          </strong>
          , né(e) le
          <strong>
            { ' ' + marriageInfo.secondPerson?.birthDate }
          </strong>
          { getParentsInfo(marriageInfo.secondPerson) }
        </div>
        <div>
          qui se sont mariés le
          <strong> { marriageInfo.marriageDate } </strong>
          à
          <strong> { `${marriageInfo.marriagePlace}, ${marriageInfo.country}` }  </strong>
        </div>
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
      <div className="p-2"> 
        { deathInfo.civility === CivilityType.MALE ? "Monsieur" : "Madame" } 
        <strong> 
          { ` ${deathInfo.firstName} ${deathInfo.lastName}` } 
        </strong>
        , décedé(e) le 
        <strong>
          { ` ${ deathInfo.deathDate } à ${ deathInfo.deathPlace } ${deathInfo.country}` }
        </strong>
        <div>
          L' <strong> acte </strong> vous sera envoyé en <strong> 3 exemplaires </strong> à l'adresse :
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