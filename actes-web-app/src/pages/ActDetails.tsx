import React from "react";
import { useParams } from "react-router-dom";
import { useFetchActDetailsQuery } from "../store/index.ts";
import { ActClientDetails, ActeType, BirthInfoDetails, DeathInfoDetails, MarriageInfoDetails, PersonDetails } from "../data/interfaces.ts";

const labelClasses = "font-bold"

const BirthActDetails: React.FC<{ formattedActType: string, client: ActClientDetails, birthInfo: BirthInfoDetails }> = (
  { formattedActType, client, birthInfo }
) => {
  return (  
    <div className="flex flex-col">
      <div className="text-center font-semibold text-lg underline decoration-green-300/70 pb-2"> { `Acte de ${formattedActType}` } </div>
      <div className={labelClasses}> Détails de l'acte : </div>
      <div className="text-gray-900/90"> - <u>Format de l'acte</u> : { client.actFormat } </div>
      <div className="text-gray-900/90"> - <u>Nom de la personne concerncé(e)</u> : { birthInfo.user } </div>
      <div className="text-gray-900/90"> - <u>Date de naissance</u> : { birthInfo.birthDetails } </div>
      <div className="text-gray-900/90"> - <u>Père</u> : { birthInfo.father } </div>
      <div className="text-gray-900/90"> - <u>Mère</u> : { birthInfo.mother } </div>
      <div className={labelClasses}> Demandeur : </div>
      <div className="text-gray-900/90"> - <u>Nom</u> : { client.user } </div>
      <div className="text-gray-900/90"> - <u>Relation avec la personne concerné(e)</u> : { client.relationship } </div>
      <div className="text-gray-900/90"> - <u>Numéro</u> : { client.phone } </div>
      <div className="text-gray-900/90"> - <u>E-mail</u> : { client.email } </div>
      <div className="text-gray-900/90"> - <u>Adresse</u> : { client.address } </div>
    </div>
  );
}

const DeathActDetails: React.FC<{ formattedActType: string, client: ActClientDetails, deathInfo: DeathInfoDetails }> = (
  { formattedActType, client, deathInfo }
) => {
  return (  
    <div className="flex flex-col">
      <div className="text-center font-semibold text-lg underline decoration-black/70 pb-2"> { `Acte de ${formattedActType}` } </div>
      <div className={labelClasses}> Détails de l'acte : </div>
      <div className="text-gray-900/90"> - <u>Format de l'acte</u> : { client.actFormat } </div>
      <div className="text-gray-900/90"> - <u>Nom de la personne concerncé(e)</u> : { deathInfo.user } </div>
      <div className="text-gray-900/90"> - <u>Date</u> : { deathInfo.deathDetails } </div>
      <div className={labelClasses}> Demandeur : </div>
      <div className="text-gray-900/90"> - <u>Nom</u> : { client.user } </div>
      <div className="text-gray-900/90"> - <u>Relation avec la personne concerné(e)</u> : { client.relationship } </div>
      <div className="text-gray-900/90"> - <u>Numéro</u> : { client.phone } </div>
      <div className="text-gray-900/90"> - <u>E-mail</u> : { client.email } </div>
      <div className="text-gray-900/90"> - <u>Adresse</u> : { client.address } </div>
    </div>
  );
}

const MarriageActDetails: React.FC<{ formattedActType: string, client: ActClientDetails, marriageInfo: MarriageInfoDetails }> = (
  { formattedActType, client, marriageInfo }
) => {

  const renderPerson = (title: string, person: PersonDetails) => (
    <div className="border border-gray-500 rounded p-2 my-2">
      <div className={labelClasses}> { `${title} personne :` } </div>
      <div className="flex gap-2">
        <div className={labelClasses}> Nom : </div>
        <div> { marriageInfo.firstPerson.user } </div>
      </div>
      <div className="flex gap-2">
        <div className={labelClasses}> Père : </div>
        <div> { marriageInfo.firstPerson.father } </div>
      </div>
      <div className="flex gap-2">
        <div className={labelClasses}> Mère : </div>
        <div> { marriageInfo.firstPerson.mother } </div>
      </div>
    </div>
  )

  return (  
    <div className="flex flex-col"> 
      <div className="text-center font-semibold text-lg underline decoration-pink-400/80 pb-2"> { `Acte de ${formattedActType}` } </div>
      <div className={labelClasses}> Détails de l'acte : </div>
      <div className="text-gray-900/90"> - <u>Format de l'acte</u> : { client.actFormat } </div>
      <div className="text-gray-900/90"> - <u>Date</u> : { marriageInfo.marriageDetails } </div>
      { renderPerson("Premiére", marriageInfo.firstPerson) }
      { renderPerson("Deuxiéme", marriageInfo.secondPerson) }
      <div className={labelClasses}> Demandeur : </div>
      <div className="text-gray-900/90"> - <u>Nom</u> : { client.user } </div>
      <div className="text-gray-900/90"> - <u>Relation du demandeur</u> : { client.relationship } </div>
      <div className="text-gray-900/90"> - <u>Numéro</u> : { client.phone } </div>
      <div className="text-gray-900/90"> - <u>E-mail</u> : { client.email } </div>
      <div className="text-gray-900/90"> - <u>Adresse</u> : { client.address } </div>
    </div>
  );
}
interface ActDetailsProps {
  actId: string
}

const ActDetails: React.FC<ActDetailsProps> = ({ actId }) => {

  const { 
    data: actDetails,
    isFetching: isFetchingActDetails
  } = useFetchActDetailsQuery(actId)

  if (!actDetails) return <></>

  const renderActDetails = () => {
    switch (actDetails.actType) {
      case ActeType.MARRIAGE:
        return <MarriageActDetails formattedActType={actDetails.formattedActType} marriageInfo={actDetails.marriageInfo} client={actDetails.client} />;
      case ActeType.BIRTH:
        return <BirthActDetails formattedActType={actDetails.formattedActType} birthInfo={actDetails.birthInfo} client={actDetails.client} />;
      case ActeType.DEATH:
        return <DeathActDetails formattedActType={actDetails.formattedActType} deathInfo={actDetails.deathInfo} client={actDetails.client} />;
      default:
        return null;
    }
  }

  return (  
    <div className="w-4/5 md:w-3/5 bg-white p-8 m-4">
      { renderActDetails() }
    </div>
  );
}

const Wrapper = () => {
  const { actId } = useParams();
  if (!actId) return <></>

  return <ActDetails actId={actId} />
}
 
export default Wrapper;