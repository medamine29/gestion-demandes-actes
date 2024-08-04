import React, { useState } from "react";
import DeathActInfo from "../acts/DeathActInfo.tsx";
import ActAddress from "../acts/ActAddressForm.tsx";
import ActValidation from "../acts/ActValidation.tsx";
import { Stepper, Step } from 'react-form-stepper';
import { FaWpforms, FaMapMarkerAlt } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { stepperStyleConfig } from "../data/styles.ts";
import { useParams } from "react-router-dom";
import { useFetchMunicipalityDetailsQuery } from "../store/index.ts";

const DeathForm = () => {

  const [activeStep, setActiveStep] = useState<number>(0)
  const { city } = useParams();

  const {
    data: municipalityDetails
  } = useFetchMunicipalityDetailsQuery(city!, { skip: !city })

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <DeathActInfo setActiveStep={setActiveStep} />;
      case 1:
        return <ActAddress setActiveStep={setActiveStep} />;
      case 2:
        return <ActValidation setActiveStep={setActiveStep} />;
      default:
        return null;
    }
  }

  return (
    <div className="w-5/6 md:w-4/5 bg-white p-2 md:p-4 m-2 md:m-4">
      <div className="text-customBlue flex flex-col">
        <div className="text-xl md:text-3xl font-bold">
          Commandez votre acte de décès en ligne { municipalityDetails?.name }
        </div>
        <div>
          Remplissez simplement notre formulaire en quelques clics.
          Nous traitons votre demande rapidement afin que vous receviez votre acte de
          naissance directement dans votre boite aux lettres. Profitez de notre service sécurisé
          et rapide, tout en restant chez vous !
        </div>
      </div>

      <div className="w-full md:w-4/5 lg:w-3/5 flex flex-col items-center mx-auto">
        <Stepper 
          activeStep={activeStep}
          styleConfig={stepperStyleConfig}
        >
          <Step label="Informations sur l'acte"> <FaWpforms className="text-xl" /> </Step>
          <Step label="Adresse de livraison"> <FaMapMarkerAlt className="text-xl" /> </Step>
          <Step label="Vérification et validation"> <IoCheckmarkDoneSharp className="text-xl" /> </Step>
        </Stepper>

        { renderStep() }
      </div>

      <div className="w-full flex flex-col gap-3 mt-10 text-customBlue bg-customLightBlue p-4 rounded">

        <div>
          <b> Qu&#39;est-ce qu&#39;un acte de décès ? </b>
        </div>
        
        <div>
          En France, les <b> actes de décès, </b> encadrés par les directives du premier ministre et gérés
          par les <b> services publics </b>de <b> l’état civil</b>, constituent la base des démarches
          administrative après la perte d’une personne. Ce document officiel atteste qu&#39;une
          personne est décédée qu’on se trouve dans un arrondissement parisien ou dans une
          ville moyenne. L&#39;<b>acte de décès</b> est indispensable pour effectuer toute demande ou
          démarche officielle auprès des administrations ou dans la cadre d&#39;une succession.
           Cette pièce justificative riche en informations est essentielle pour prouver la
          survenance et les circonstances de la mort d’une personne. Les citoyens peuvent
          s&#39;adresser aux services municipaux ou opter pour les demandes en ligne sur notre
          site ou via Franceconnect pour obtenir ces documents. <b> Aucune restriction de filiation </b> 
          n&#39;existe pour les demandes d&#39;acte de décès, toutes personnes peut en faire la
          demande.
        </div>

        <div> <b> Obtenir un acte de décès en France : </b> </div>

        <div>
          Pour obtenir un <b> acte de décès survenu en France, </b> il faut généralement s&#39;adresser à
          la <b> mairie du lieu du décès. </b> Les démarches peuvent être effectuées en ligne sur notre
          site via notre formulaire dédié, ou en se <b> rendant directement au guichet.</b> Les délais
          de traitement peuvent varier en fonction des services administratifs.
        </div>

        <div> <b> Décès de Français nés à l&#39;étranger : </b> </div>

        <div>
          Si le décès concerne une personne de <b> nationalité Française née à l&#39;étranger, </b> vous
          pouvez faire la <b> demande en ligne </b> sur notre site via notre formulaire dédié ou par <b> voie
          postale </b> sur <b> papier libre </b> auprès du <b> Ministère de l&#39;Europe et des Affaires Étrangères. </b>
          Le <b> délai d&#39;acheminement du courrier </b> est d&#39;environ <b> 20 jours. </b>
        </div>

        <div> <b> Quelles sont les mentions apposées sur la copie intégrale d&#39;un acte de décès : </b> </div>

        <div> <b> La copie intégrale </b> d&#39;un <b> acte de décès </b> contient des informations essentielles telles que </div>

        <ul className="list-disc ml-4">
          <li> Le <b> nom de naissance et prénom </b> du défunt </li>
          <li> La <b> date et le lieu de naissance </b> </li>
          <li> La <b> profession et l’adresse du défunt </b> </li>
          <li> La <b> date et l&#39;heure du décès </b> </li>
          <li> Le <b> lieu du décès. </b> </li>
          <li> Les informations concernant ses parents <b> (noms, prénoms, professions et domicile) </b> </li>
          <li> <b> Le Nom et prénoms </b> de son conjoint ou de son partenaire de PACS </li>
          <li> L&#39;identité, l’âge et la profession de la personne déclarant le décès ainsi que son <b> lien de parenté, </b> le cas échéant. </li>
        </ul>

        <div> Le décès est également intégré en marge de l&#39;<b>acte de naissance du défunt</b> </div>

        <div> <b> Procédure en cas de décès à l&#39;étranger : </b> </div>

        <div>
          Si la disparition d&#39;un proche survient à l&#39;étranger, lors d&#39;un voyage par exemple, il est
          crucial de contacter rapidement le consulat ou l’ambassade de France dans le pays
          concerné, qui pourra vous assister dans votre démarche. Vérifiez aussi si
          la <b> personne concernée </b> avait souscrit un contrat d&#39;assistance couvrant les frais de
          rapatriement du corps.
          Il faudra également déclarer l’évènement auprès de <b> l&#39;officier de l&#39;état civil </b> local qui
          établira un acte de décès à retranscrire auprès des autorité Française.
        </div>

        <div> <b> Un acte de décès pour quelles démarches ? : </b> </div>

        <ol className="list-decimal ml-4">
          <li>
            La succession : Lors de la perte d’un proche, les héritiers sont tenus de suivre
            une procédure rigoureuse dictée par le notaire. La présentation de la <b> copie
            intégrale de l&#39;acte de décès </b> accompagnée d&#39;autres documents tels que
            le <b> livret de famille, </b> déclenche l&#39;ouverture de la succession
          </li>
          <li>
            Les démarches auprès des institutionnels et des administrations : Un courrier,
            accompagné de la copie de l&#39;acte de décès, doit être envoyé à diverses
            institutions pour leur faire part de l’évènement survenu.
          </li>
        </ol>

        <div>
          Liste des organismes à prévenir en cas de décès :
        </div>

        <ul className="list-disc ml-4">
          <li> l&#39;employeur ou les ASSEDIC, dans les 48 heures </li>
          <li> les impôts</li>
          <li> les banques, sociétés d’assurance, la CPAM, les mutuelle complémentaire </li>
          <li> les caisses de retraite, l&#39;assurance vieillesse de la sécurité sociale, ainsi que le bailleur ou le locataire selon les cas. </li>
        </ul>

        <div>
          <b> Quelle est la différence entre une déclaration de décès et un acte de décès ? </b>
        </div>

        <div>
          La déclaration de décès est effectuée par la personne qui constate la mort de la
          personne. S&#39;il est survenu à l&#39;hôpital ou en maison de retraite, l&#39;établissement se
          charge de la déclaration auprès de l&#39;officier de l&#39;<b>état civil </b> de la mairie du <b> lieu du
          décès </b> qui établira le <b> certificat de décès.</b> 
        </div>

        <div>
          En revanche, si la mort a eu lieu au domicile du défunt, ce sont les proches qui doivent
          effectuer la démarche auprès de la mairie de la ville où résidait la personne décédée.
          L&#39;acte de décès, quant à lui, est un document officiel qui certifie la mort d&#39;une
          personne et consigne les informations relatives au décès.
        </div>

        <div>
          <b> Comment vérifier l&#39;authenticité d&#39;un acte de décès remis par un tiers en France ? </b> <br/>
          Pour authentifier l&#39;acte qui vous a été remis, il est essentiel de vous rapprocher de la
          mairie qui l&#39;a établi. En vérifiant les registres d&#39;<b>état civil,</b> vous pourrez confirmer la
          validité du document.
        </div>

        <div> <b> Comment obtenir un acte de décès plurilingue ? </b> </div>

        <div>
          Destiné à être utilisé à l&#39;étranger, l&#39;<b>extrait plurilingue</b> concerne les pays signataires de
          la Convention de Vienne du 8 septembre 1976. Il peut être traduit en français,
          allemand, anglais, espagnol, grec, italien, néerlandais, portugais, turc et slave et être
          utilisé dans les états signataires.
        </div>

        <div>
          Grâce à cette convention, l&#39;<b>extrait plurilingue</b> bénéficie de dispenses majeures :
          aucune apostille, légalisation ou traduction par un traducteur assermenté n&#39;est
          requise. l&#39;<b>extrait plurilingue</b> est conçu de manière à être universellement compris. Le
          recto du document comporte des cases numérotées reprenant les mentions de l&#39;acte
          original. Le verso présente un tableau récapitulatif traduisant ces mentions dans
          plusieurs langues.
        </div>

        <div>
          Cette structure permet au destinataire de comprendre aisément le contenu de
          l&#39;extrait, renforçant ainsi son utilité et son efficacité dans un contexte international.
          Vous pouvez demander un <b> acte de décès</b> plurilingue auprès de la mairie de la
          commune du <b>dernier domicile</b>  du défunt.
        </div>
        
      </div>

    </div>
  );
}
 
export default DeathForm