import React, { useState } from "react";
import MarriageActInfo from "../acts/MarriageActInfo.tsx";
import ActAddress from "../acts/ActAddressForm.tsx";
import ActValidation from "../acts/ActValidation.tsx";
import { Stepper, Step } from 'react-form-stepper';
import { FaWpforms, FaMapMarkerAlt } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { stepperStyleConfig } from "../data/styles.ts";
import { useParams } from "react-router-dom";
import { useFetchMunicipalityDetailsQuery } from "../store/index.ts";

const MarriageForm = () => {

  const [activeStep, setActiveStep] = useState<number>(0)
  const { city } = useParams();

  const {
    data: municipalityDetails
  } = useFetchMunicipalityDetailsQuery(city!, { skip: !city })

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <MarriageActInfo setActiveStep={setActiveStep} />;
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
          Commandez votre acte de mariage en ligne { municipalityDetails?.name }
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
          <b> A quoi sert un acte de mariage ? </b>
        </div>

        <div>
          L’acte de mariage est établi par un officier d’état civil. Il atteste du statut marital des
          époux. C’est une preuve officielle que deux personnes se sont légalement engagés
          dans une union matrimoniale. Bien plus qu’une simple formalité, l’acte de mariage
          est indispensable lors de démarches administratives comme une donation, une
          succession, l’obtention de prestations sociales ou tout autre formalité concernant les
          conjoints.
        </div>

        <b> Comment demander un acte de mariage ? </b>

        <div>
          Avant toute chose soyez vigilants sur les délais de traitement qui peuvent varier en
          fonction de la méthode sélectionnée pour l’obtention de votre acte de mariage :
        </div>

        <div>
          Sur notre site en cliquant ICI et en remplissant notre formulaire d’acte de mariage en
          quelques clics.
        </div>

        <div>
          <b> Si le mariage a été célébré en France, </b> vous pouvez aussi faire votre <b> demande en
          ligne </b> en vous connectant sur Franceconnect ou en créant un compte sur <b> service
          public.</b>
        </div>

        <div>
          Si vous préférez une démarche plus traditionnelle, vous pouvez faire une demande
          par courrier recommandé en contactant la mairie où votre mariage a été célébré.
          Vous recevrez alors votre <b> document officiel </b> par voie postale.
        </div>

        <div>
          Le courrier doit indiquer les éléments suivants :
        </div>

        <table className="min-w-full bg-white border border-gray-200 mx-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-xs md:text-base leading-normal">
              <th className="py-3 px-4 text-left">  </th>
              <th className="py-3 px-4 text-left"> Acte de mariage integral </th>
              <th className="py-3 px-4 text-left"> Acte de mariage avec filiation </th>
              <th className="py-3 px-4 text-left"> Acte de mariage sans filiation </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs md:text-base font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 text-left"> Date du mariage </td>
              <td className="py-3 px-4 text-center text-green-700 font-bold"> X </td>
              <td className="py-3 px-4 text-center text-green-700 font-bold"> X </td>
              <td className="py-3 px-4 text-center text-green-700 font-bold"> X </td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 text-left"> Nom de famille </td>
              <td className="py-3 px-4 text-center text-green-700 font-bold"> X </td>
              <td className="py-3 px-4 text-center text-green-700 font-bold"> X </td>
              <td className="py-3 px-4 text-center text-green-700 font-bold"> X </td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 text-left"> Prénoms des epous </td>
              <td className="py-3 px-4 text-center text-green-700 font-bold"> X </td>
              <td className="py-3 px-4 text-center text-green-700 font-bold"> X </td>
              <td className="py-3 px-4 text-center text-green-700 font-bold"> X </td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 text-left"> Noms et prenoms des parents </td>
              <td className="py-3 px-4 text-center text-green-700 font-bold"> X </td>
              <td className="py-3 px-4 text-center text-green-700 font-bold"> X </td>
              <td className="py-3 px-4 text-center text-red-700 font-bold"> X </td>
            </tr>
          </tbody>
        </table>

        <div>
          Pour ceux qui privilégient le contact humain, vous pouvez formuler votre demande de
          vive voix en vous rendant en personne à la mairie où votre union a été officialisée.
          Cependant, soyez vigilant aux horaires d&#39;ouverture et aux périodes d&#39;affluence car
          l’attente peut être longue. Prenez le temps de planifier votre visite pour simplifier vos
          démarches administratives.
        </div>

        <div>
          Si vous privilégiez la simplicité et la rapidité, notre <u> formulaire en ligne </u> offre une
          alternative pratique et intuitive. Il vous guidera pas à pas tout au long de la
          procédure. Une fois la validation de votre demande confirmée, vous recevrez votre
          acte de mariage par courrier dans les jours qui suivent sans aucun déplacement de
          votre part.
        </div>

        <div>
          <b> Existent-ils différents types d’acte de mariage ? </b>
        </div>

        <ul className="ml-4 list-disc">
          <li> <b> La demande de copie intégrale d’acte de mariage : </b> </li>
          <div>
            La copie intégrale d’acte de mariage reproduit fidèlement toutes les données
            consignées dans l’acte de mariage original, telles qu’elles sont enregistrées sur le
            registre d’état civil de votre la commune où le mariage a été célébré. C’est le
            document le plus complet. Elle comporte les éléments suivants :
          </div>
          <ul className="ml-4">
            <li> - Noms (y compris le nom de <b> jeune fille</b>), prénom, <b> date et lieu </b> de naissance des époux </li>
            <li> - Identité, profession et domicile, des parents respectifs </li>
            <li> - Identité des témoins qui attestent par leur signature de l’authenticité du document </li>
            <li> - Statut matrimonial antérieur des conjoints : si l’un des époux est divorcé, (e) veuf(ve)… </li>
            <li>
              - Les signatures officielles : les principaux acteurs du mariage signent l’acte de
              mariage : les mariés, l’officier d’état civil ou la personne qui a célébré la
              cérémonie ainsi que les témoins
            </li>
            <li> - Mentions marginales lorsqu&#39;elles existent </li>
          </ul>
          <div>
            La copie intégrale représente un exemplaire authentique et complet de votre dossier
            de mariage, délivrée par les autorités communales compétentes en matière de
            documents administratifs.
          </div>
          <li> <b> L’extrait avec filiation : </b> Obtenir une synthèse détaillée de votre acte de mariage </li>
          <div>
            L&#39;<b>extrait avec filiation</b> représente une version condensée mais exhaustive de l&#39;acte
            de mariage original Il comporte les informations essentielles telles que les mentions
            suivantes :
          </div>
          <ul className="ml-4">
            <li> - <b> Nom de naissance, </b> prénoms, <b> date et lieu </b> de naissance des époux </li>
            <li> - Identité complètes profession et domicile des parents respectifs </li>
            <li> - Mentions marginales lorsqu&#39;elles existent </li>
          </ul>
          <div>
            Vous pouvez obtenir facticement l’extrait avec filiation auprès des autorités
            compétentes en matière de délivrance de documents administratifs.
          </div>
          <li> <b> L’extrait sans filiation : </b> </li>
          <div>
            Il s’agit d’une synthèse de l’acte de mariage sans mentionner les parents respectifs
            des époux. En revanche il contient toujours les noms, prénoms date et lieux de
            naissance des mariés et les mentions marginales si elles existent.
          </div>
          <div>
            <b> Qui peut demander un acte de mariage : </b>
          </div>
          <div>
            Que vous souhaitiez obtenir un acte intégral de mariage ou un extrait avec filiation,
            plusieurs options s&#39;offrent à vous pour saisir votre demande. Les archives publiques
            de l’état civil stipulent que vous pouvez soumettre votre requête de plusieurs
            manières comme nous l’avons détaillé plus haute : par courrier recommandé, en personne auprès du bureau compètent ou en utilisant le formulaire en ligne dédié,
            uniquement si vous êtes une des personnes suivantes :
          </div>
          <ul className="ml-4">
            <li> - Le titulaire de l&#39;acte sous réserve d’être majeur ou son représentant légal </li>
            <li> - L’époux, l’épouse ou le partenaire de Pacs </li>
            <li> - Un ascendant de la <b> personne concernée </b> (parent, grand-parent) </li>
            <li> - Un descendant de la <b> personne concernée </b> (enfant, petit-enfant) </li>
            <li> - Un professionnel autorisé par la loi tel qu’un avocat ou un notaire </li>
          </ul>
          <div>
            Vous devez respecter ces conditions spécifiques pour garantir le succès de votre
            demande d’acte de mariage et bénéficier de l’attention des autorités compétentes en
            matière d’informations publiques sur <b> les liens de parenté </b> et l’état civil.
          </div>
          <div>
            Si vous ne faites pas partie de ces catégories vous ne pourrez obtenir qu’un acte de
            mariage sans filiation accessibles à tous sans justification.
          </div>
        </ul>

        <div>
          <b> Acte de mariage si le mariage a eu lieu à l’étranger : </b>
        </div>

        <div>
          Pour les mariages célébrés à l’étranger pour les personnes de nationalité française,
          la procédure diffère : il est nécessaire d’adresser votre demande auprès du service
          du Ministère chargé de l&#39;Europe et des affaires étrangères. Assurez-vous que votre
          union ait été enregistrée sur les registres consulaires français de l’état civil du pays
          étranger où le mariage a eu lieu.
        </div>

        <div>
          Pour simplifier vos démarches et gagner du temps, nous vous proposons de remplir
          <b> notre formulaire en ligne </b> pour demander votre acte de mariage, nous ferons
          rapidement le nécessaire pour que vous obteniez votre document.
        </div>

        <div>
          Vous pouvez également effectuer votre <b> demande en ligne </b> sur Franceconnect ou sur
          le site service public. Si vous préférez, l’envoi d’une demande par courrier sur
          papier libre en recommandé à l’adresse suivante est également possible :
        </div>

        <div>
          Ministère chargé de l&#39;Europe et des affaires étrangères <br/>
          Service central d’état civil (scec) <br/>
          11 rue de la Maison-Blanche <br/>
          44941 Nantes Cedex 09
        </div>

        <div>
          Si votre mariage n’a pas encore été transcrit par les services consulaires des
          ambassades françaises, vous avez la possibilité de saisir une demande écrite à
          l&#39;adresse appropriée, en fonction du lieu où la cérémonie s&#39;est déroulée y compris
          hors de l’union européenne. Lors d’un mariage à Las Vegas par exemple il faut
          demander une transcription du mariage auprès du consulat de Los Angeles. Cette
          démarche est particulièrement importante pour les couples dont l&#39;un des conjoints ou
          les deux ont la nationalité française. Elle permettra que les informations relatives à
          votre acte de mariage étranger soient conservées et transposées dans les registres
          français :
        </div>

        <div>
          Les bureaux des transcriptions pour l’Europe et le Maghreb sont tous les deux situés
          au <b> Service central d’état civil </b> de Nantes :
        </div>

        <div>
          <b> 
            Service central d’état civil <br/>
            Bureau des Transcriptions pour l’Europe <br/>
          </b>
          11 rue de la Maison Blanche <br/>
          44941 NANTES CEDEX 9 <br/>
          ou <br/>
          <b>
            Service central d’état civil <br/>
            Bureau des Transcriptions pour le Maghreb <br/>
          </b>
          11 rue de la Maison Blanche <br/>
          44941 NANTES CEDEX 9 <br/>
        </div>

        <div>
          <b> Quelles démarches après un mariage civil : </b>
        </div>

        <ul className="ml-4">
          <li> - <b> Le Livret de Famille </b> : Premier Document des Jeunes Mariés </li>
          <div>
            Se marier implique une série de démarches administratives pour officialiser votre
            nouveau statut marital. Dès le jour de votre union en mairie, vous recevrez un livret
            de famille. Ce document officiel recense les actes d’état civil des membres de votre
            famille et sera mis à jour tout au long de votre vie pour refléter les événements
            majeurs comme les naissances, adoptions, divorces et décès. Conservez-le
            précieusement, car il sera utile pour des démarches telles que l’inscription des
            enfants à l’école, les voyages à l’étranger, ou encore l’achat d’un bien immobilier.
          </div>
          <li> - <b> L&#39;Acte de Mariage </b> : Document Indispensable </li>
          <div>
            L’acte de mariage est un document officiel attestant de votre union civile. Il est délivré
            par la mairie où le mariage a été célébré. Ce document contient des informations
            essentielles sur les époux, ainsi que des mentions relatives à un éventuel contrat de
            mariage. Vous devrez le conserver précieusement car il est nécessaire pour diverses
            démarches administratives, notamment en cas de divorce ou de remariage.
          </div>
          <li> - Changement de Nom : Obligatoire ou Non ? </li>
          <div>
            Après un mariage, changer de nom n’est pas obligatoire. Si vous souhaitez
            conserver votre nom de famille, aucune démarche n’est requise. En revanche, si
            vous décidez de porter le nom de votre conjoint en tant que nom d’usage, il faudra
            remplir une déclaration de changement de nom d’usage et en informer les
            organismes concernés tels que les impôts, la banque, la sécurité sociale, la CAF, et
            votre employeur.
          </div>
          <li> - Mise à Jour des Papiers d&#39;Identité </li>
          <div>
            Si vous changez de nom d’usage, tous vos documents officiels devront être mis à
            jour. Rendez-vous à la mairie pour votre carte d’identité et votre passeport, ou utilisez

            le site de l’Agence Nationale des Titres Sécurisés (ANTS). Pour le permis de
            conduire et la carte grise, effectuez les démarches en ligne sur le site de l’ANTS.
          </div>
          <li> - Changement de Régime Fiscal </li>
          <div>
            Le mariage ou le PACS implique un changement de statut fiscal. Vous devrez
            désormais faire une déclaration commune de revenus. Pour l’année du mariage,
            vous avez le choix entre une déclaration commune ou deux déclarations séparées.
            Signalez cet événement aux services des impôts dans les 60 jours pour ajuster votre
            prélèvement à la source.
          </div>
          <li> - Régimes Matrimoniaux : Que Choisir ? </li>
          <div>
            Sans contrat de mariage spécifique, vous serez automatiquement mariés sous le
            régime de la communauté réduite aux acquêts, où les biens acquis avant le mariage
            restent personnels et ceux acquis après sont communs. Vous pouvez opter pour un
            autre régime matrimonial, comme la séparation de biens, en établissant un contrat de
            mariage avec l’aide d’un notaire.
          </div>
        </ul>

        <div>
          <b> Qu’est-ce qu’un extrait d’acte de mariage plurilingue ? </b>
        </div>

        <div>
          Un acte de mariage plurilingue est un acte destiné aux citoyens français afin de
          prouver leur situation matrimoniale à l’étranger. Destiné à simplifier les démarches
          administratives internationales, cet extrait permet d’éviter les coûts souvent
          exorbitants d’un traducteur assermenté.
        </div>

        <div>
          L&#39;extrait est rédigé en français et traduit directement en plusieurs langues des pays
          signataires de la convention de la Commission Internationale de l’État Civil, ratifiée
          en 1976 à Vienne. Les langues disponibles incluent :
        </div>

        <ul className="list-disc ml-4">
          <li> Allemand </li>
          <li> Anglais </li>
          <li> Espagnol </li>
          <li> Grec </li>
          <li> Italien </li>
          <li> Néerlandais </li>
          <li> Portugais </li>
          <li> Turc </li>
          <li> Bosniaque </li>
          <li> Serbe </li>
          <li> Croate </li>
        </ul>

        <div> Comment obtenir un extrait de mariage plurilingue ? </div>

        <div>
          Vous pouvez commander un extrait plurilingue de mariage directement en ligne sur
          notre site via un formulaire dédié qui reste la solution la plus rapide. Notre

          plateforme, vous permet solliciter une copie intégrale ou un extrait, comportant
          uniquement les informations nécessaires à vos démarches. Pour ceux qui préfèrent
          les méthodes plus traditionnelles, il est également possible de se rendre dans la
          mairie du lieu du mariage ou encore de faire la demande par courrier sur papier libre.
          Chaque méthode offre une garantie d&#39;efficacité, vous permettant d’obtenir votre acte
          sans tracas, tout en bénéficiant d’un service public de qualité.
        </div>

      </div>

    </div>
  );
}
 
export default MarriageForm