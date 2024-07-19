import React, { useState } from "react";
import BirthActInfo from "../acts/BirthActInfo.tsx";
import ActAddress from "../acts/ActAddressForm.tsx";
import ActValidation from "../acts/ActValidation.tsx";
import { Stepper, Step } from 'react-form-stepper';
import { FaWpforms, FaMapMarkerAlt } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { stepperStyleConfig } from "../data/styles.ts";
import { useParams } from "react-router-dom";
import { useFetchMunicipalityDetailsQuery } from "../store/index.ts";

const BirthForm = () => {

  const [activeStep, setActiveStep] = useState<number>(0)
  const { city } = useParams();

  const {
    data: municipalityDetails
  } = useFetchMunicipalityDetailsQuery(city!, { skip: !city })

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <BirthActInfo setActiveStep={setActiveStep} />;
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
          Commandez votre acte de naissance en ligne { municipalityDetails?.name }
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
          <Step label="Adresse de réception"> <FaMapMarkerAlt className="text-xl" /> </Step>
          <Step label="Vérification et validation"> <IoCheckmarkDoneSharp className="text-xl" /> </Step>
        </Stepper>

        { renderStep() }
      </div>

      <div className="w-full flex flex-col gap-3 mt-10 text-customBlue bg-customLightBlue p-4 rounded">
        <div>
          acte-de-naissance-express.fr offre un service de commande d&#39;acte d&#39;états civils en
          ligne avec un focus particulier sur les <b> actes de naissances, </b> les <b> actes de mariage </b> et
          les <b> actes de décès. </b> Que vous soyez né en France ou à l&#39;étranger, vous pouvez
          commander une  <b> copie intégrale </b> ou <b> un extrait </b> d&#39;<b>acte de naissance avec ou sans
          filiation </b> grâce à un formulaire intuitif et sécurisé. Une assistance au remplissage du
          document et un suivi personnalisé de votre dossier sont également inclus dans le
          service.
        </div>

        <div>
          Une fois votre <b> démarche en ligne </b> validée, votre demande d&#39;<b>acte de naissance</b> sera
          délivrée puis traitée par votre <b>mairie de naissance</b>  et expédiée à votre domicile en
          quelques jours seulement, tout en assurant la confidentialité de vos informations
          personnelles.
        </div>
        
        <b> Qu&#39;est-ce qu&#39;un acte de naissance ? </b>

        <div>
          L’<b>acte de naissance</b> est un document administratif officiel délivré par l’état civil qui
          atteste de l&#39;identité d&#39;une personne et de sa filiation. Il contient tous les éléments liés à
          la naissance :
        </div>

        <ul className="list-disc ml-4">
          <li> Date </li>
          <li> Heure </li>
          <li> Lieu </li>
          <li> Nom </li>
          <li> Prénoms </li>
          <li> Sexe </li>
          <li> Identité des parents </li>
        </ul>

        <div>
          Il peut être demandé pour accomplir certaines formalités administratives, telles que
          l&#39;obtention d&#39;une carte d&#39;identité, d&#39;un passeport ou d&#39;un <b> livret de famille, </b> ou encore
          pour une demande de <b> nationalité française, </b> de changement de régime matrimonial,
          de mariage ou de prestations de la Caisse d&#39;allocations familiales (CAF).
        </div>

        <b> Quel document pour obtenir un extrait d&#39;acte de naissance ? </b>
        
        <ul className="list-disc ml-4">
          <li> Pièce d&#39;identité valide (carte d&#39;identité, passeport) </li>
          <li> <b> Livret de famille </b> (si vous n’êtes pas la <b> personne concernée</b>) </li>
          <li> Informations sur la <b> personne concernée (nom, prénom, date de naissance, lieu de naissance) </b> </li>
          <li> Adresse postale pour l’acheminement de l&#39;acte de <b> naissance </b> </li>
        </ul>

        <b> Quels sont les types d’actes de naissance ? </b>

        <div> Il existe Trois types d&#39;<b>actes de naissance :</b> </div>

        <ol className="list-decimal ml-4">
          <li>
            <b> La copie d&#39;acte intégral </b> : Comme son nom l&#39;indique cet acte est une
            reproduction fidèle de votre acte d&#39;état civil. Il contient toutes les informations
            essentielles comme votre <b> nom </b> vos <b> prénoms</b>, votre jour, mois, année et <b> lieu de
            naissance </b> mais également celles de vos parents. Pour l&#39;obtenir vous pouvez
            vous adresser auprès de la mairie de la commune où vous êtes né, à <b> Paris </b> ce
            sera auprès de la mairie de votre <b> arrondissement de naissance. </b> Vous pouvez
            également effectuer votre <b>demande en ligne </b> ou par courrier ce qui vous
            permettra de gagner du temps et de faciliter vos démarches administratives.
            L&#39;émission de cet acte est gratuite.
          </li>
          <li>
            <b> Extrait d&#39;acte de naissance avec filiation </b> : C&#39;est un acte de naissance qui
            contient   les informations liées à votre naissance mais aussi les <b> noms,
            prénoms </b> date et lieux de naissance de vos parents.  L&#39;émission de cet acte est
            gratuite.
          </li>
          <li>
            <b> Extrait d&#39;acte de naissance sans filiation </b> : Cet acte contient les informations
            clés sur votre naissance sans mentionner votre filiation. L&#39;émission de cet acte
            est gratuite.
          </li>
        </ol>

        <div>
          <b> Puis-je obtenir un acte de naissance pour quelqu&#39;un d&#39;autre ? </b>
        </div>

        <div>
          En France, tout citoyen Français né en France ou dans les Dom TOM peut demander
          un <b> acte de naissance </b> sans filiation sans avoir à justifier les raisons de sa demande.
        </div>

        <div>
          Les règles sont plus strictes pour la délivrance d’un <b> acte de naissance </b> intégral ou
          avec filiation. Selon la loi française, seules les personnes suivantes peuvent en faire la
          demande en fournissant les justificatifs nécessaires (<b> livret de famille </b> par exemple)
          pour prouver son identité et sa qualité de demandeur :
        </div>

        <ul className="list-disc ml-4">
          <li> <b> La personne concernée </b> par l’acte (à condition qu’elle soit majeure), ou son <b> représentant légal </b> </li>
          <li> Son conjoint ou partenaire de Pacs </li>
          <li> Ses ascendants directs (parent, grand-parent, etc.) </li>
          <li> Ses descendants directs (enfant, petit-enfant, etc.) </li>
          <li> Les professionnels autorisés par la loi (avocat, notaire…) </li>
        </ul>

        <div>
          Pour les personnes nées dans les états devenus indépendants comme l’Algérie, la
          Tunisie et le Maroc ou les Français nés à l’étranger la demande doit être faite auprès
          du <b> Ministère chargé de l&#39;Europe et des affaires étrangères. </b>
        </div>

        <div>
          Les demandes peuvent être faites en ligne directement sur notre site en complétant
          avec exactitude le formulaire. Après traitement de votre commande par acte-de-
          naissance-express.fr, la mairie de votre commune de naissance vous délivrera par
          courrier votre <b> acte de naissance </b> en quelques jours.
        </div>

        <b> Les étapes pour commander un acte de naissance ? </b>

        <div>
          Besoin d&#39;un <b>acte de naissance </b> en France ? Pas de souci, plusieurs options s&#39;offrent à
          vous :
        </div>

        <ul className="list-disc ml-4">
          <li> En ligne </li>
          <li> Par courrier </li>
          <li> En personne à la mairie de votre commune de naissance. </li>
        </ul>

        <div>
          Que ce soit en ligne, par courrier ou en vous rendant directement à votre <b> mairie de
          naissance, </b>  les démarches sont simples et accessibles à tous.
        </div>

        <div>
          Si la naissance a eu lieu en France métropolitaine ou dans les départements d&#39;outre-
          mer, vous pouvez demander une copie intégrale, un <b> extrait avec filiation </b> ou
          un <b> extrait sans filiation. </b>
        </div>

        <div>
          Soit en préparant les documents nécessaires en vous rendant à votre mairie de
          naissance pour effectuer votre demande soit en remplissant un formulaire en ligne.
          Une fois votre demande envoyée, vous recevrez votre document par courrier postal à
          l’adresse indiquée.
        </div>

        <div>
          Pour les naissances dans un État devenu indépendant (par exemple Algérie, Tunisie,
          Maroc,) le processus se fait exclusivement via une plateforme en ligne distincte.
        </div>

        <div>
          Les membres de la famille peuvent également faire la demande, selon leur lien de
          parenté avec la <b> personne concernée. </b> De plus, certains professionnels, comme les
          avocats ou les notaires, peuvent <b> obtenir un acte de naissance </b> ou de mariage auprès
          des archives publiques.
        </div>

        <div>
          Les délais de traitement varient selon la situation de la <b> personne concernée </b> et le type
          de demande effectuée, mais dans tous les cas, la délivrance de  l&#39;<b>acte de naissance </b>
          est une procédure simple et rapide.
        </div>

        <b> Commander un acte de naissance en ligne si vous êtes né en France : </b>

        <div>
          Si vous êtes né en France métropolitaine ou dans les territoires d&#39;outre-mer vous
          devez adresser votre demande à la mairie de votre <b> commune de naissance </b> en
          fournissant les pièces justificatives nécessaires.
        </div>

        <div> Trois possibilités s&#39;offrent à vous : </div>

        <ul className="list-disc ml-4">
          <li> 
            Si vous optez pour une demande en personne, vous devez vous rendre au
            guichet de l&#39;état civil de votre <b> mairie de naissance </b> avec votre C.N.I valide
            (carte nationale d&#39;identité) aux horaires d&#39;ouverture habituels. Il est
            recommandé de vérifier les heures d’affluence car l&#39;attente peut être longue en
            fonction de la période et de la fréquentation de la mairie.
          </li>
          <li>
            Si vous préférez une <b> demande par courrier, </b> vous devez adresser une lettre sur
            papier libre à la mairie de votre <b> commune de naissance </b> en indiquant vos
            <b> noms, prénoms date et lieux </b> de naissance pour un <b> extrait sans filiation </b> et
            pour une <b> copie intégrale </b> ou un <b> extrait avec filiation </b> en ajoutant les <b> noms
            prénoms date et lieux </b> de naissance de vos parents. N&#39;oubliez pas d&#39;indiquer
            votre adresse pour recevoir les exemplaires de votre <b> acte de naissance </b> qui
            vous seront envoyé rapidement.
          </li>
          <li>
            Enfin, vous pouvez également faire une <b> demande en ligne, </b> en passant par
            Franceconnect, une plateforme de services en ligne sécurisée proposée par
            l’administration. Toutefois, toutes les communes de France ne proposent pas
            ce service. Vous pouvez également saisir vos informations sur notre formulaire
            en ligne en précisant la nature de l&#39;<b>acte de naissance </b> que vous souhaitez
            obtenir et vous le recevrez par courrier postal directement à votre domicile.
          </li>
        </ul>

        <div>
          Les formalités administratives sont identiques pour les parent ascendants ou
          descendant qui sollicitent un <b> acte de naissance </b> d&#39;une tierce personne, il vous faudra
          fournir des justificatifs de filiation lors de la demande, tels que le <b> livret de famille </b> ou
          un <b> acte de naissance, </b> afin de prouver le lien familial avec le sujet de la demande
        </div>

        <b> Comment obtenir l’acte de naissance d’un français né à l’étranger ? </b>

        <div>
          Pour <b> obtenir l&#39;acte de naissance </b> d&#39;un Français né à l&#39;étranger (ou dans les états
          devenus indépendants) ou encore si vous avez acquis la <b> nationalité française </b> après
          votre naissance, il vous suffit désormais de vous connecter avec Franceconnect ou de
          créer un compte sur le site service-public.fr.
        </div>

        <div>
          La procédure est entièrement dématérialisée depuis mars 2021, permettant ainsi de
          demander une <b> copie intégrale, </b> un <b> extrait avec filiation </b> ou un <b> extrait sans filiation. </b> Le
          document est ensuite disponible au format PDF à télécharger dans votre espace
          personnel sous environ 20 jours ou encore par courrier si vous cochez la case lors de
          votre demande bien que le délai de réception soit plus long.
        </div>

        <div>
          L&#39;autre alternative est de faire une <b> demande par courrier </b> au  <b> Service Central de l’État
          Civil (SCEC) </b> qui dépend du <b> ministère de l’Europe et des Affaires étrangères </b> à
          l&#39;adresse suivante :
        </div>

        <div>
          <b> Service central d’état civil </b> <br/>
          11, rue de la Maison Blanche <br/>
          44941 Nantes Cedex 09
        </div>

        <div>
          Au sein de notre service en ligne, vous avez la possibilité de soumettre votre demande
          en remplissant notre formulaire dédié. Après validation, vous recevrez l’acte requis
          directement dans votre boite aux lettres par <b> voie postale. </b>
        </div>

        <b>
          Peut-on recevoir son acte d&#39;état civil par courrier électronique ?
        </b>

        <div>
          Non, l’acheminement de l&#39;acte de naissance se fait exclusivement par voie postale.
          Le délai de livraison pour recevoir un acte de naissance par courrier est d’environ une
          semaine.
        </div>

        <b> Quelle est la validité d&#39;un acte de naissance pour les démarches administratives ? </b>

        <div>
          En théorie, les <b> actes de naissance, </b> qu’ils s’agissent de copies intégrales ou extraits,
          restent valides tant que les informations qu&#39;ils contiennent sont à jour. Cependant,
          pour certaines démarches administratives une limite de validité peut être imposée.
          Par exemple, pour un mariage, l&#39;<b>acte de naissance </b> doit généralement dater de moins
          de 3 mois.
        </div>

        <b> Comment faire une déclaration de naissance ? </b>

        <div>
          La naissance d&#39;un enfant en France nécessite une déclaration obligatoire permettant
          ainsi d&#39;établir son <b> acte de naissance. </b> Cette formalité doit être accomplie dans les 5
          jours suivant l’accouchement auprès de la mairie du <b> lieu de naissance </b> ou de l&#39;hôpital.
        </div>

        <div>
          Pour ce faire, les parents doivent se munir de l&#39;attestation d&#39;un médecin ou d&#39;une
          sage-femme ainsi que des papiers d&#39;identités des deux parents. Si vous n&#39;avez pas
          reconnu l&#39;enfant avant sa naissance, vous devrez fournir un justificatif de domicile.
        </div>

        <div>
          Attention, si la déclaration n&#39;est pas effectuée dans les délais impartis, les parents
          devront saisir le tribunal judiciaire et se faire assister d&#39;un avocat. Ils s’exposent
          également à une amende de 3750 € en cas de non-régularisation de la situation.
        </div>

        <b> Peut-on corriger un acte de naissance en cas d&#39;erreur de l&#39;officier d&#39;état civil ? </b>

        <div>
          Si vous repérez une erreur de forme telle qu&#39;une faute d&#39;orthographe dans un <b> nom de
          famille, </b> une adresse parentale incorrecte ou un oubli. Il y a un recours possible en
          envoyant un courrier accompagné de la <b> copie intégrale </b> comportant l&#39;erreur et des
          pièces justificative telle qu&#39;une pièce d&#39;identité ou un <b> livret de famille. </b> Il est également
          possible de remplir le formulaire CERFA 11531.03 et de l&#39;envoyer avec vos justificatifs.
        </div>

        <div>
          Dans les deux cas, vos documents doivent être adressés à la mairie responsable de
          l&#39;erreur. Pour les actes établis à l&#39;étranger, le courrier doit être envoyé au <b> Service
          central d&#39;état civil (SCEC) </b> de Nantes.
          En cas d&#39;erreur substantielle comme un erreur de filiation ou de sexe la même
          procédure s&#39;applique, mais votre dossier doit être transmis au tribunal judiciaire de
          votre domicile ou de la ville où l&#39;acte a été rédigé.
        </div>

        <b> Qu’est-ce qu’un extrait d’acte de naissance plurilingue ? </b>

        <div>
          Un <b> acte de naissance </b> plurilingue est un acte destiné aux citoyens français afin de
          prouver leur état civil à ’étranger. Destiné à simplifier les démarches administratives
          internationales, cet extrait permet d’éviter les coûts souvent exorbitants d’un
          traducteur assermenté.
        </div>

        <div>
          L&#39;extrait est rédigé en français et traduit directement en plusieurs langues des pays
          signataires de la convention de la Commission Internationale de l’État Civil, ratifiée en
          1976 à Vienne. Les langues disponibles incluent :
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

        <b> Comment obtenir un extrait de naissance plurilingue ? </b>

        <div>
          Vous pouvez commander ce document directement en ligne sur notre site via <u> un
          formulaire dédié </u> qui reste la solution la plus rapide. Notre plateforme, vous permet
          solliciter une copie <b> intégrale ou un extrait, </b> comportant uniquement les informations
          nécessaires à vos démarches. Pour ceux qui préfèrent les méthodes plus
          traditionnelles, il est également possible de se rendre dans la mairie de naissance de
          la <b> personne concernée </b> ou de faire la demande par courrier. Chaque méthode offre
          une garantie d&#39;efficacité, vous permettant d’obtenir votre acte sans tracas, tout en
          bénéficiant d’un <b> service public </b> de qualité.
        </div>

        <b> Quelle est l&#39;utilité de la mention marginale ? : </b>

        <div>
          Une <b> mention marginale </b> sur un <b> acte de naissance </b> est une information ajoutée à la
          marge d’un acte de naissance pour compléter ou modifier le contenu de l&#39; <b> acte de
          naissance.</b>
        </div>

        <div>
          La mention marginale est automatiquement inscrite au registre de l&#39;état civil lors de
          changement important dans votre vie, tels que mariage, divorce, décès, adoption,
          changement de <b> nom de famille, </b> de sexe, acquisition de la <b>nationalité française, </b> etc.
           Ces indications permettent de suivre l&#39;évolution de l&#39;état civil d&#39;une personne et sont
          indispensables pour établir des liens entre différents actes.
        </div>

        <b> Faire une demande d’acte de naissance pour une personne née il y a plus de 100 ans : </b>

        <div>
          Il n’est plus possible de se rendre à sa mairie de naissance pour demander un acte
          d’état civil datant de plus de 100 ans. Ces précieux documents, témoins d’événements
          marquants de nos ancêtres, ont désormais trouvé leur place dans les <b> archives
          publiques communales ou départementales. </b> Pour les consulter, il faut s&#39;adresser
          directement à ces institutions spécialisées de votre <b> lieu de naissance, </b> qui sauront
          répondre à vos demandes avec la rigueur légale requise.
        </div>

        <div> Une Démarche Simplifiée et Accessible </div>
        
        <div>
          Il n’est pas nécessaire de prouver un lien de filiation pour <b> obtenir un acte </b> centenaire.
          Tout le monde peut en faire la demande, gratuitement que ce soit pour des
          recherches personnelles, historiques, ou généalogiques.
        </div>

        <div> Comment accéder aux archives ? </div>

        <div>
          Pour ceux qui préfère la simplicité du numérique, il est également possible de faire la
          <b> demande en ligne </b> en vous rendant sur le site de <a href="https://francearchives.gouv.fr/)"> <u> France archive</u></a>. En quelques clics, vous pouvez consulter et obtenir les
          documents nécessaires sans quitter le confort de votre foyer.
        </div>

      </div>

    </div>
  );
}
 
export default BirthForm