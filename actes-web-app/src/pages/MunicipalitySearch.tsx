import { FormikHelpers, useFormik } from "formik";
import React, { ReactNode, useState } from "react";
import { TbMapPinSearch } from "react-icons/tb";
import SearchBar from "../components/common/SearchBar.tsx";
import { useFetchMunicipalityDetailsQuery } from "../store/index.ts";
import { Link } from "react-router-dom";
import Map from "../components/common/Map.jsx"

const MunicipalitySearch = () => {

  const [mairie, setMairie] = useState<string>('')

  const {
    data: municipalityDetails
  } = useFetchMunicipalityDetailsQuery(mairie, { skip: !mairie })

  const handleChange =  (_, value: string) => {
    setMairie(value)
  }

  const actClasses = "hover:-translate-y-1 cursor-pointer underline text-lg"

  return (  
    <div className="w-5/6 md:w-4/5 bg-customLightBlue p-8 m-4 flex flex-col items-center gap-2">
      <div className="text-xl md:text-3xl p-4 font-bold text-customBlue">
        Trouvez les coordonnées de votre mairie de naissance
      </div>
      <SearchBar
        id="birthPlace"
        value={mairie}
        label="Recherche par commune"
        placeholder="commune."
        labelIcon={TbMapPinSearch}
        setFieldValue={handleChange}
        optionPrefix="Mairie de"
      />

      {
        municipalityDetails && (
          <div className="flex flex-col gap-2 w-full my-2">
            {
              municipalityDetails.address && <div>  Mairie de <strong> { municipalityDetails.name } </strong> { `se situe ${municipalityDetails.address}, ${municipalityDetails.postalCode}, ${municipalityDetails.city} (${municipalityDetails.department} ${municipalityDetails.departmentCode})` } </div>
            }
            { municipalityDetails.email && <div> { municipalityDetails.email } </div> }
            { municipalityDetails.webSite && <div> <a href={municipalityDetails.webSite} className="underline"> { municipalityDetails.webSite } </a> </div> }
            
            <Map center={[municipalityDetails.coordinates.lat, municipalityDetails.coordinates.lon]} markerTitle={municipalityDetails.name} />
            
            <div className="flex flex-col text-justify gap-3 p-3 my-2">
              <p>
                Vous avez besoin d’un acte d’état civil pour vos démarches administratives à { municipalityDetails.city } ? La mairie de { municipalityDetails.name } est à votre disposition. Ses officiers d’états civil vous accueillent aux horaires d’ouverture pour vous fournir l’acte d’état civil nécessaire, qu’il s’agisse d’un acte de naissance, d’un acte de mariage ou d’un acte de décès. 
              </p>
              <p>
                Pour plus de confort et de rapidité, commandez vos actes d’états civils en ligne en toute sécurité.  En quelque clic, sans quitter votre domicile, obtenez vos documents grâce à nos formulaires intuitifs.                
              </p>
              <strong className="self-center text-xl"> Simplifiez vos formalités ! </strong>
            </div>

            <div className="flex flex-col md:flex-row w-full justify-evenly">
              <Link to={`/acte-de-naissance/${municipalityDetails.name}`} > <div className={`${actClasses} decoration-green-400/50`}> Commander un acte de naissance </div> </Link>
              <Link to={`/acte-de-mariage/${municipalityDetails.name}`} > <div className={`${actClasses} decoration-pink-400/50`}> Commander un acte de mariage </div> </Link>
              <Link to={`/acte-de-deces/${municipalityDetails.name}`} > <div className={`${actClasses} decoration-black/50`}> Commander un acte de décès </div> </Link>
            </div>

          </div>
        )
      }
  
      <div className="w-full flex flex-col gap-3 mt-10 text-customBlue"> 

        <div className="text-xl">
          <strong> Que faire en cas d’erreur sur l’acte de naissance : </strong>
        </div>

        <div>
          Une coquille sur un <b> acte de naissance </b> peut profondément marquer l&#39;identité d&#39;une
          personne. En matière de <b> prénoms, </b> la créativité de certains parents peut parfois dépasser les
          limites, au point que l&#39; <b> État civil </b> refuse l&#39;enregistrement. Le prénom, compagnon de toute
          une vie, nécessite une vigilance accrue : une simple faute d&#39;orthographe peut avoir des
          conséquences durables.
        </div>

        <div>
          Dans le cas d&#39;une erreur sur un <b> acte de naissance, </b> il est essentiel d&#39;agir rapidement pour
          rectifier cette faute. La première étape consiste à se rendre à la mairie où l&#39;acte a été
          enregistré.<b> Un officier d&#39;état civil </b> vous aidera à vérifier les informations et à entamer les
          démarches nécessaires pour corriger l&#39;erreur. Cette procédure peut inclure la fourniture de
          documents justificatifs et, parfois, une démarche judiciaire si l&#39;erreur est complexe.
        </div>

        <div>
          Les erreurs de prénoms sur les <b> actes de naissance, </b> bien que rares, peuvent avoir des
          implications importantes. Il est donc crucial de prendre les mesures appropriées pour
          rectifier ces erreurs afin de garantir que les informations officielles reflètent fidèlement
          <b> l&#39;identité de la personne. </b>
        </div>

        <div className="text-xl">
          <b> Double Nom de Famille à la naissance : comment ça marche ? </b>
        </div>

        <div>
          Le nom de famille, élément fondamental de l&#39;identité de chaque individu, peut être attribué
          à un enfant de diverses manières à sa naissance. Traditionnellement, l&#39;enfant reçoit le nom
          de son père (patronyme), mais d&#39;autres options sont également possibles. On peut choisir de
          lui donner le nom de sa mère ou un double nom de famille combinant ceux des deux
          parents, dans l&#39;ordre souhaité. Comment fonctionne ce système de double nom de famille ?
          Peut-on le retirer ? Voici tout ce que vous devez savoir.
        </div>

        <div>
          En France, trois possibilités s&#39;offrent aux parents pour le nom de famille de leur enfant dont
          la filiation est établie :
          <ol className="list-decimal list-inside ml-4">
            <li> Le nom du père. </li>
            <li> Le nom de la mère. </li>
            <li> Un double nom, combinant les noms des deux parents, séparés par un simple espace. </li>
          </ol>
          Pour choisir le double nom de famille vous ne devez pas obligatoirement être marié.
        </div>

        <div>
          Si les parents souhaitent attribuer un double nom de famille à leur enfant, ils doivent remplir
          une déclaration conjointe de choix du nom de famille (formulaire Cerfa n°15286*01).
        </div>

        <div>
          Ce document, portant les signatures des deux parents, doit être remis à l&#39;officier de <b> l&#39;état civil </b>
          au moment de la déclaration de naissance. Il est crucial de noter que cette démarche
          doit être effectuée avant la naissance du premier enfant, car tous les enfants suivants (nés
          des mêmes parents) porteront automatiquement le même nom de famille que l&#39;aîné.
        </div>

        <div>
          Une fois attribué, le double nom de famille est inscrit dans les registres d&#39;état civil et ne peut
          être modifié ou retiré sans une procédure légale. Toute demande de changement doit
          passer par une décision judiciaire et est soumise à des conditions strictes.
        </div>

        <div>
          Le choix du nom de famille, qu&#39;il soit simple ou double, est un acte important qui reflète
          l&#39;identité familiale et personnelle de l&#39;enfant. Il est donc essentiel pour les parents de bien
          comprendre les implications et les procédures associées à cette décision.
        </div>

        <div className="text-xl">
          <b> Reconnaissance Anticipée d&#39;un Enfant : Ce Qu&#39;il Faut Savoir </b>
        </div>

        <div>
          Reconnaître un enfant peut se faire de manière anticipée, c’est-à-dire avant même sa
          naissance. Mais dans quelles situations cette démarche administrative est-elle nécessaire, et
          comment s’y prendre ?
        </div>

        <div>
          Contrairement à la <b> déclaration de naissance, </b> obligatoire dans les trois jours suivant
          l&#39;accouchement, la <b> reconnaissance </b> d’un enfant est une <b> démarche volontaire. </b> La mère n&#39;en a
          pas besoin pour établir sa maternité ; son nom inscrit sur l&#39;acte de naissance suffit. En
          revanche, le père doit faire une reconnaissance s&#39;il souhaite prouver <b> son lien de filiation </b>
          avec l&#39;enfant.
        </div>

        <div>
          La reconnaissance peut se faire à tout moment : avant la naissance (dès la déclaration de
          grossesse), lors de la déclaration de naissance, ou après celle-ci. Elle peut être initiée par la
          mère, le père, ou les deux parents conjointement.
        </div>

        <div>
          La reconnaissance anticipée est particulièrement cruciale dans plusieurs situations :
          <ul className="list-inside ml-4">
            <li>
              - En cas de problème de santé de la mère lors de l&#39;accouchement, le père devient le
              responsable légal de l&#39;enfant.
            </li>
            <li>
              - En cas de séparation du couple avant la naissance, le père devra assumer ses
              responsabilités légales envers l&#39;enfant reconnu.
            </li>
            <li>
              - Si le père décède pendant la grossesse, l&#39;enfant pourra porter son nom et le lien de
              filiation sera établi.
            </li>
            <li>
              - Pour les couples de femmes recourant à une Assistance Médicale à la Procréation
              (AMP), une reconnaissance conjointe anticipée est nécessaire.
            </li>
          </ul>
        </div>

        <div>
          Pour reconnaître un enfant avant sa naissance, il suffit de se rendre dans n’importe quelle
          <b> mairie, </b> au <b> service de l&#39;état civil, </b> muni d’une pièce d’identité. La déclaration donne lieu à un
          <b> acte de reconnaissance </b> rédigé sur place et signé par l’un ou les deux parents concernés.
          Cette démarche peut également se faire devant un notaire.
        </div>

        <div>
          Lors de la déclaration de naissance, une copie de cet acte de reconnaissance devra être
          présentée. Si la reconnaissance a lieu après la naissance, <b> l’officier d’état civil </b> l’inscrira sur
          <b> l’acte de naissance </b> ainsi que dans le <b> livret de famille. </b>
        </div>

        <div className="text-xl">
          <b> Reconnaitre un enfant dont on n’est pas le père : </b>
        </div>

        <div>
          Un homme peut reconnaitre un enfant qui est né d’une autre union à condition que cet
          enfant n’a pas été déjà reconnu par le père biologique. C’est une pratique courante qui a un
          effet immédiat et reste valide indéfiniment sauf si une personne conteste sa validité.
        </div>

        <div>
          La paternité peut être contestée s’il est détecté que l’intention est de frauder la loi. Une
          contestation de paternité s’effectue devant un juge qui peut ordonner un test de paternité.
          Si la fraude est avérée, l’auteur peut être condamné à verser des dommages et intérêts à
          l’enfant en réparation du préjudice subi.
        </div>

        <div>
          Frauder la loi en reconnaissant un enfant pour percevoir des aides ou faciliter des séjours
          irréguliers en France par exemple peut entrainer de la prison ferme et des amendes de
          plusieurs milers d’euros.
        </div>

        <div className="text-xl">
          <b> Le Livret de Famille évolue : Une Réforme Nécessaire </b>
        </div>

        <div>
          Le modèle de <b> livret de famille </b> a récemment été modifié pour intégrer les dernières
          évolutions législatives. Un arrêté publié le 3 mai 2022 au Journal Officiel met à jour ce
          document essentiel afin de refléter les réformes sociétales récentes.
        </div>

        <div>
          Les mises à jour concernent plusieurs aspects importants de la filiation et de l’état civil. Le
          <b> livret de famille </b> prend désormais en compte l’accès à la procréation médicalement assistée
          (PMA) pour les couples de femmes et les femmes célibataires, la réforme de l’adoption, les
          nouvelles règles concernant le choix du nom issu de la filiation, l’identité des enfants nés
          sans vie, et <b> l’acte de décès </b> des enfants majeurs.
        </div>

        <ul className="list-disc ml-4">

          <li className="text-lg"> Les Enfants Nés Sans Vie </li>
          <div className="-ml-4">
            Les prénoms et nom d’un enfant né sans vie peuvent désormais être apposés sur le <b> livret de
            famille </b> à la demande des parents. Cette inscription, bien que sans effet juridique, permet de
            reconnaître symboliquement l’enfant.
          </div>

          <li className="text-lg"> Procréation Médicalement Assistée (PMA) </li>
          <div className="-ml-4">
            Pour les couples de femmes ayant recours à la PMA, la filiation est établie pour la femme qui
            accouche par sa désignation dans <b> l’acte de naissance. </b> Pour l’autre femme, la filiation est
            établie par reconnaissance conjointe anticipée faite devant notaire, en même temps que le
            consentement à la PMA. Cette reconnaissance est ensuite remise à l’officier de <b> l’état civil </b> au
            moment de la déclaration de naissance.
          </div>
          <div>
            En matière de nom de famille, les parents peuvent désormais choisir le nom de leur enfant
            au plus tard le jour de la déclaration de naissance, en attribuant soit le nom de l’une des
            deux mères, soit leurs deux noms accolés dans l’ordre de leur choix, dans la limite d’un nom
            de famille pour chacune. En l’absence de déclaration conjointe, l’enfant portera les deux
            noms accolés par ordre alphabétique.
          </div>

          <li className="text-lg"> Changement de Nom </li>
          <div className="-ml-4">
            Le <b> livret de famille </b> s’adapte également aux nouvelles dispositions sur le changement de
            nom de famille, effectives à partir du 1er juillet 2022. Désormais, avec l’accord des parents,
            un enfant peut utiliser le nom du parent qui ne lui a pas transmis le sien, en l’ajoutant ou en
            le substituant à son propre nom, dans la limite d’un nom de famille pour chacun. Le parent
            non transmetteur peut ajouter son nom à titre d’usage, avec information préalable de
            l’autre parent. Si l’enfant a plus de 13 ans, son accord est requis.
          </div>

          <li className="text-lg"> Adoption </li>
          <div className="-ml-4">
            Enfin, les nouvelles dispositions sur l’adoption permettent désormais aux époux, partenaires
            liés par un pacte civil de solidarité (pacs) ou concubins vivant ensemble depuis plus d’un an
            ou ayant plus de 26 ans, de demander l’adoption. L’adoption est également accessible aux
            personnes de plus de 26 ans, avec consentement de leur conjoint ou partenaire si elles sont
            mariées ou pacsées.
          </div>

        </ul>

        <div className="text-xl">
          <b> Dématérialisation des certificats de décès : avantages et inconvénients </b>
        </div>

        <div>
          Depuis le 1er juin 2022, une nouvelle ère s&#39;est ouverte pour les médecins avec l&#39;obligation
          d&#39;établir les certificats de décès par voie dématérialisée. Cette réforme, ambitieuse et
          nécessaire, promet d&#39;améliorer les délais de délivrance des actes par les officiers <b> d&#39;état civil. </b>
          Mais derrière cette avancée numérique se cachent des défis, notamment liés à la qualité des
          réseaux de communication qui, dans certaines régions, se montrent capricieux.
        </div>

        <div>
          Ainsi, bien que la dématérialisation soit un progrès indéniable, elle n&#39;est pas exempte de
          difficultés. En cas d&#39;impossibilité technique de transmettre le <b> certificat de décès </b> par voie
          numérique, une solution de secours subsiste : le support papier. Cette flexibilité permet de
          pallier les défaillances technologiques et d&#39;assurer la continuité des démarches
          administratives.
        </div>

        <div>
          Les certificats de décès dématérialisés sont directement envoyés à la <b> mairie du lieu du
          décès, </b> qui établit ensuite <b> l&#39;acte de décès. </b> Cet acte est à son tour transmis électroniquement
          à la mairie de naissance grâce à la plateforme COMEDEC. Cette dernière facilite la
          transmission des données <b> d&#39;état civil </b> de manière dématérialisée entre les communes
          adhérentes, garantissant ainsi une <b> mise à jour </b> rapide et efficace des <b> actes de naissance </b> avec
          la mention du décès.
        </div>

        <div>
          La dématérialisation des certificats de décès représente donc un avantage considérable en
          termes de rapidité et de modernisation des services publics. Cependant, son succès dépend
          encore largement de l&#39;infrastructure technologique disponible, mettant en lumière les
          inégalités territoriales en matière de connectivité.
        </div>

        <div className="text-xl">
          <b> Quels sont les délais à respecter en cas de décès ? </b>
        </div>

        <div>
          Dans notre société moderne, la gestion administrative d&#39;un décès peut sembler froide et
          impersonnelle face à la douleur de la perte. Pourtant, ces démarches sont incontournables
          et régies par des délais stricts. Voici une liste claire et détaillée des étapes à suivre, mettant
          en lumière l&#39;importance de la rapidité et de la précision dans ces moments difficiles.
        </div>

        <div>
          Démarches immédiates (24-48 heures)
        </div>

        <ol className="list-decimal list-inside ml-4 space-y-2">

          <li className="text-lg"> Déclaration de décès : </li>
          <ul className="ml-2">
            <li> - Délai : 24 heures (48 heures si week-end ou jour férié) </li>
            <li> - Lieu : <b> Mairie du lieu du décès </b> ou du <b> domicile du défunt </b> </li>
            <li> - Document exigé : <b> Certificat de décès </b> établi par un médecin </li>
            <li> - Résultat : Délivrance de <b> l&#39;acte de décès </b> </li>
          </ul>

          <li className="text-lg"> Contact avec le professionnel funéraire : </li>
          <ul className="ml-2">
            <li> - Si une convention obsèques est inscrite, contacter rapidement l&#39;organisme </li>
            <li> - Justification : Organisation des funérailles dans les six jours (sauf cas particuliers) </li>
          </ul>

          <li className="text-lg"> Notification à l&#39;employeur ou aux Assedic : </li>
          <ul className="ml-2">
            <li> - Délai : 48 heures </li>
            <li> - Concerne : Défunt salarié ou indemnisé </li>
          </ul>

          <div className="-ml-4"> Démarches à court terme (une semaine) </div>

          <li className="text-lg"> Contact avec le notaire : </li>
          <ul className="ml-2">
            <li> - Rôle : Gestion de la succession </li>
            <li> - Données à fournir : Informations sur le patrimoine du défunt </li>
          </ul>

          <li className="text-lg"> Information à la banque : </li>
          <ul className="ml-2">
            <li> - Action : Blocage du compte du défunt </li>
            <li> - Justification : Protection des avoirs et préparation de la succession </li>
          </ul>

          <div className="-ml-4"> Démarches à moyen terme (15 jours) </div>

          <li className="text-lg"> Notifications diverses : </li>
          <ul className="ml-2">
            <li> - Assurances et mutuelles </li>
            <li> - Retraite complémentaire </li>
            <li> - CPAM (Caisse Primaire d&#39;Assurance Maladie) </li>
            <li> - Abonnements (électricité, téléphone, TV, etc.) </li>
          </ul>

        </ol>

        <div className="text-lg"> Points particuliers à noter </div>

        <ul>
          <li> - La rapidité est essentielle pour compléter ces formalités dans les temps. </li>
          <li> - Certains délais peuvent être étendus en cas de circonstances exceptionnelles. </li>
          <li> - La délivrance de <b> l&#39;acte de décès </b> est cruciale pour les démarches ultérieures. </li>
          <li> - Pour les personnes mariées, l&#39;époux ou l&#39;épouse survivant(e) joue souvent un rôle central dans ces démarches. </li>
        </ul>

        <div>
          En conclusion, bien que ces tâches administratives puissent paraître pesantes dans un
          moment de deuil, elles sont indispensables pour assurer une transition légale et financière
          en bon ordre. Une approche méthodique et le respect de ces délais permettront de gérer
          cette période difficile avec plus de sérénité.
        </div>

        <div className="text-xl">
          <b> Le certificat d&#39;hérédité : un outil méconnu mais précieux pour les successions modestes </b>
        </div>

        <div>
          Dans le dédale administratif qui suit un décès, le certificat d&#39;hérédité se révèle être un atout
          souvent négligé, pourtant capable d&#39;alléger considérablement le fardeau des héritiers, tant
          sur le plan procédural que financier. Ce document, bien que non indispensable lorsqu&#39;un
          notaire orchestre la succession, peut s&#39;avérer être la clé de voûte pour les héritages de
          moindre envergure, ouvrant les portes de nombreuses démarches essentielles.
        </div>

        <div>
          À l&#39;heure où les successions se complexifient, intégrant des éléments tels que des plans
          d&#39;épargne en actions ou impliquant des droits de succession conséquents, ce &quot;sésame&quot; légal
          prend tout son sens. Il offre aux héritiers la possibilité de naviguer plus aisément dans les
          eaux troubles des formalités post-mortem, qu&#39;il s&#39;agisse de percevoir des créances, de
          débloquer des fonds, ou même d&#39;accéder à certaines prestations sociales comme l&#39;allocation
          veuvage.
        </div>

        <div>
          L&#39;obtention de ce précieux document est remarquablement simple et, fait non négligeable,
          entièrement gratuite. La mairie de la dernière résidence du défunt est l&#39;interlocuteur
          privilégié pour cette démarche. Les héritiers potentiels, qu&#39;ils soient descendants,
          ascendants, collatéraux ou conjoints, doivent simplement prouver leur lien avec le défunt en
          présentant quelques documents d&#39;usage : <b> livret de famille </b> du défunt, <b> acte de décès </b> et
          justificatif d&#39;identité du demandeur. Le maire, investi de cette responsabilité, évalue alors la
          légitimité de la demande avant de délivrer le certificat.
        </div>

        <div>
          L&#39;importance de ce document ne saurait être sous-estimée, particulièrement pour les
          héritiers devant gérer seuls les méandres d&#39;une succession. Il facilite grandement les
          interactions avec les administrations et les établissements bancaires, permettant par
          exemple à un conjoint survivant de percevoir la pension de retraite du défunt ou aux enfants
          de simplifier leurs démarches auprès de diverses institutions.
        </div>

        <div>
          Dans un contexte où chaque succession apporte son lot de défis administratifs et
          émotionnels, le certificat d&#39;hérédité apparaît comme une bouée de sauvetage, offrant un peu de répit dans cette période tumultueuse. Il est donc judicieux pour les familles
          confrontées à un deuil de s&#39;informer auprès de leur mairie sur les modalités d&#39;obtention de
          ce document. Cette démarche, simple mais efficace, peut grandement contribuer à alléger le
          poids des formalités et à apporter une certaine tranquillité d&#39;esprit dans ces moments
          difficiles.
        </div>

        <div>
          En définitive, le certificat d&#39;hérédité, bien que souvent méconnu, s&#39;impose comme un outil
          précieux dans l&#39;arsenal des héritiers. Son obtention, gratuite et relativement aisée, devrait
          être envisagée dès que possible après un décès, offrant ainsi à la famille endeuillée un
          moyen concret de simplifier les démarches administratives et de se concentrer sur l&#39;essentiel
          : honorer la mémoire du défunt et commencer le processus de deuil.
        </div>

        <div className="text-xl">
          <b> L’acte de notoriété : qu’est-ce c’est ? </b>
        </div>

        <div>
          Dans le domaine des successions, l&#39;acte de notoriété joue un rôle fondamental. Selon
          l’article 730 du <b> Code civil, </b> la preuve de la qualité d’héritier peut théoriquement être
          apportée par tous moyens. Cependant, en pratique, l’acte de notoriété reste
          incontournable. Cet acte, rédigé par un notaire, est un document clé qui atteste
          officiellement de la qualité d&#39;héritier des signataires.
        </div>

        <div>
          Pour obtenir cet acte, les héritiers doivent se rendre chez un notaire et régler des honoraires
          forfaitaires de 57,69 euros hors TVA, auxquels peuvent s’ajouter des émoluments de
          formalités. De plus, un droit fixe d’enregistrement de 25 euros est perçu pour le compte du
          Trésor public.
        </div>

        <div>
          L’acte de notoriété contient une affirmation signée par les héritiers, stipulant qu&#39;ils sont
          habilités, seuls ou avec d’autres personnes désignées, à recueillir tout ou partie de la
          succession. Cette affirmation fait foi, et les signataires sont présumés avoir des droits
          successoraux conformément à ce qui est indiqué dans l’acte. En outre, l’acte recense le
          constat de décès du défunt et les documents produits pour son établissement, tels que les
          extraits <b> d’actes de naissance </b> des enfants et une copie du testament.
        </div>

        <div>
          Lorsque le notaire gère la succession, il établit généralement plusieurs copies de l’acte de
          notoriété, qu’il adresse ensuite aux différents organismes avec lesquels le défunt était en
          rapport, comme les banques, les caisses de retraite et les compagnies d’assurances. Cela
          permet aux héritiers de prélever des fonds sur les comptes bancaires du défunt, d’ouvrir les
          coffres et d’obtenir le paiement du capital d’une assurance vie.
        </div>

        <div>
          Il est donc évident que, même dans les cas où les héritiers souhaitent régler la succession
          sans l’intervention directe d’un notaire, ils ne peuvent pas se passer de l&#39;acte de notoriété
          pour des démarches spécifiques, telles que la récupération des capitaux d’une assurance vie.
          Cet acte est non seulement une preuve officielle de la qualité d’héritier, mais il facilite
          également toutes les démarches administratives et financières liées à la succession.
        </div>
        
        <div>
          En somme, l’acte de notoriété est un passage obligé et essentiel pour toute succession,
          garantissant la reconnaissance officielle des héritiers et la fluidité des processus post-
          succession. Ne pas en disposer peut compliquer considérablement la gestion des biens et
          des droits du défunt.
        </div>

        <div className="text-xl">
          <b> Pour quelles raison un prénom peut être refusé à L’état Civil ? </b>
        </div>

        <div>
          Depuis la loi n°93-22 du 8 janvier 1993, les parents bénéficient d&#39;une plus grande latitude
          pour choisir le prénom de leur enfant. Toutefois, cette liberté reste encadrée par des règles
          strictes. L’État n’a pas établi de liste de « prénoms interdits », mais il a fixé des limites claires.
          Ces restrictions visent à protéger l&#39;intérêt de l&#39;enfant et à respecter certaines normes
          sociétales et linguistiques.
        </div>

        <div>
          Lorsque l’officier d’état-civil juge un prénom irrecevable, il alerte le procureur de la
          République. Un juge aux affaires familiales (JAF) est alors saisi pour décider de la suppression
          du prénom des registres de l&#39;état-civil. En cas de refus, les parents doivent choisir un
          nouveau prénom, ou, à défaut, le JAF s’en charge. Il est donc prudent de connaître les motifs
          de refus avant de déclarer un prénom à l&#39;état-civil.
        </div>

        <div>
          L&#39;article 57 du <b> Code civil </b> stipule que le prénom, seul ou associé au nom de famille, ne doit
          pas porter préjudice à l&#39;enfant. Les prénoms ridicules, grossiers, trop insolites ou ayant une
          connotation négative sont exclus.
        </div>

        <div>
          La justice reste subjective dans ses décisions, comme en témoignent les refus de prénoms
          tels que Joyeux, Fraise, Nutella, Titeuf, et Pastriste, tandis que Mowgli et Tarzan ont été
          acceptés.
        </div>

        <div>
          Le prénom choisi doit aussi respecter le droit des autres à voir protéger leur nom de famille.
          Combiner des noms de célébrités n&#39;est pas une échappatoire non plus.
          Un enfant portant le nom d&#39;un seul de ses parents ne peut pas avoir celui de l&#39;autre parent
          comme prénom. Par exemple, si un enfant porte le nom Dupont, il ne peut pas avoir Martin
          comme prénom si Martin est le nom de l’autre parent.
        </div>
        
        <div>
          L’écriture du prénom doit également respecter des règles strictes. Une circulaire du 23 juillet
          2014 stipule que l’alphabet utilisé doit être celui de la langue française. Les seuls signes
          diacritiques admis sont les points, trémas, accents et cédilles. Le tilde (~), l’apostrophe ou
          l’accent aigu sur le « i » sont proscrits pour préserver l’unité linguistique dans les relations
          avec l’administration et les services publics.
        </div>

        <div>
          Cette règle suscite des oppositions, notamment de la part d’élus et de parents défenseurs
          des langues et identités régionales. La liberté de choix des prénoms, bien que plus large
          qu&#39;auparavant, reste ainsi une liberté relative, encadrée pour protéger l’intérêt supérieur de
          l’enfant et respecter les normes sociétales et linguistiques.
        </div>

        <div className="text-xl">
          <b> Papiers d’Identité : Pourquoi est-ce si long ? </b>
        </div>

        <div>
          Depuis la fin des confinements, obtenir une carte d’identité ou un passeport est devenu un
          véritable parcours du combattant. Les délais d’attente se sont considérablement allongés, ce
          qui pose un problème de plus en plus pressant, notamment à l’approche des vacances d’été.
        </div>

        <div>
          Selon le ministère de l’Intérieur, il faut en moyenne deux mois pour obtenir un rendez-vous,
          puis un mois supplémentaire pour la fabrication du document, soit un total de trois mois.
          Dans certains territoires, ce délai peut être encore plus long. À Bordeaux, par exemple, il est
          nécessaire d’anticiper largement et parfois même de traverser le département pour espérer
          obtenir un rendez-vous à temps.
        </div>

        <div>
          La principale raison de cet allongement des délais est une explosion des demandes. Le
          ministère de l’Intérieur indique que les services de l’État doivent traiter 14,5 millions de
          requêtes en 2023, contre 12 millions en 2022 et 9,5 millions en 2019. Cette augmentation
          est en partie due au Brexit, qui nécessite désormais un passeport valide pour se rendre au
          Royaume-Uni.
        </div>

        <div>
          L’engorgement est également accentué par la forte baisse des demandes pendant la
          pandémie de Covid-19 et par les protocoles sanitaires qui ont ralenti les services. De plus, les
          exigences accrues des sites marchands et autres services en ligne pour des documents
          d’identité à jour augmentent la pression sur les mairies.
        </div>

        <div>
          Pour remédier à cette situation, l’État a demandé aux communes de renforcer leurs
          capacités de traitement et de mettre à disposition des créneaux de rendez-vous
          supplémentaires dans les zones saturées, comme les grandes villes. Une dotation
          exceptionnelle a été allouée pour cela. Le nombre de machines pour fabriquer les
          documents d’identité a également été augmenté au centre d’imprimerie des titres sécurisés
          de Douai (Nord), dans le but de rattraper une partie du retard accumulé avant l’été et de
          résorber le reste d’ici la fin de l’année.
        </div>

        <div>
          Les usagers doivent faire preuve de patience, anticiper au maximum leurs démarches et
          consulter régulièrement le site de l’ANTS (Agence nationale des titres sécurisés), qui
          répertorie les créneaux disponibles dans les mairies. Des plateformes comme Vitemadose
          ont inspiré la création de vitemonpasseport.fr, facilitant la prise de rendez-vous. Cependant,
          ces outils ne sont pas exhaustifs car toutes les mairies ne participent pas à ces démarches.
        </div>

        <div>
          Face à ces défis, la vigilance et l’anticipation sont essentielles pour éviter les déconvenues,
          surtout avant les périodes de forte demande comme les vacances d’été.
        </div>

        <div className="text-xl">
          <b> Refaire ses papiers d’identité avant les vacances d’été : </b>
        </div>

        <div>
          L&#39;été approche, et avec lui, la nécessité de renouveler ses papiers d&#39;identité. Que ce soit
          pour voyager, passer un examen, obtenir un crédit, ouvrir un compte en banque, une ligne
          téléphonique ou acheter un véhicule, il est impératif d’anticiper ses demandes de passeport
          ou de carte d’identité pour éviter de se heurter à des délais trop longs.
        </div>

        <div>
          Il est essentiel de rappeler qu’aucun texte n’oblige à posséder une carte d’identité ou un
          passeport. D’autres documents peuvent suffire pour prouver son identité en cas de contrôle
          : permis de conduire, <b> acte de naissance, livret de famille, </b> livret militaire, carte d’électeur, ou
          encore carte vitale. Cependant, bon nombre de démarches nécessitent spécifiquement une
          carte d’identité ou un passeport, notamment pour voyager ou accéder à des services
          officiels.
        </div>

        <div>
          Au sein de l&#39;Union européenne, une carte nationale d’identité valide suffit pour voyager. En
          revanche, hors UE, un passeport est généralement exigé, souvent valide plusieurs mois après
          la date de retour prévue en France. D’où l’importance de solliciter un renouvellement à
          temps auprès de sa préfecture.
        </div>

        <div>
          Les démarches pour obtenir un titre d’identité se font sur rendez-vous dans les sites équipés
          de stations biométriques. Il est recommandé de réaliser une <b> pré-demande en ligne, </b> ce qui
          facilite la prise de rendez-vous. Le coût de ces démarches varie : 86 euros pour un adulte, 42
          euros pour un mineur de 15 à 18 ans, et 17 euros pour un enfant de moins de 15 ans.
        </div>

        <div>
          Lors du rendez-vous, plusieurs documents sont nécessaires : pré-demande, justificatif de
          domicile, <b> <u> acte de naissance </u> </b> pour une première demande, et une photo d’identité datant de
          moins de trois mois. Les photos doivent être réalisées dans une cabine agréée par le
          ministère de l’Intérieur ou par un professionnel.
        </div>

        <div>
          Une fois le titre prêt – entre trois semaines et un mois en moyenne, voire plus selon les
          périodes – il doit être retiré dans un délai de trois mois, sous peine de destruction.
        </div>

        <div>
          Pour des situations particulières, comme un voyage humanitaire, un décès d’ascendant
          direct ou un déplacement professionnel imprévu, il est possible de demander un passeport
          d’urgence. Cependant, cette délivrance est exceptionnelle et non automatique.
        </div>

        <div>
          Concernant les mineurs, il est impératif qu&#39;ils possèdent un document d’identité à leur nom
          pour voyager. Hors UE, ils doivent également être munis d’un passeport.
        </div>

        <div>
          La validité des titres d’identité varie : les cartes d’identité délivrées avant le 1er janvier 2014
          sont valides 15 ans, mais pour voyager, mieux vaut disposer d’un document non périmé.
          Certains pays, même au sein de l’UE, n’acceptent pas les cartes prolongées de cinq ans.
        </div>

        <div>
          Le passeport, quant à lui, est valide dix ans pour les adultes et cinq ans pour les mineurs. Il
          est possible de le renouveler avant expiration pour limiter les justificatifs nécessaires, bien
          que le coût reste le même.
        </div>

        <div>
          En cas de perte ou de vol, il est recommandé de conserver une photocopie de ses
          documents et de les stocker sur le site service-public.fr. En cas de perte ou de vol à l’étranger, il faut d&#39;abord faire une déclaration aux autorités locales, puis solliciter un laissez-
          passer ou un passeport d’urgence auprès de l&#39;ambassade ou du consulat français, une
          formalité payante et nécessitant un certain délai.
        </div>

        <div>
          Ainsi, pour éviter les désagréments et les délais prolongés, mieux vaut anticiper et s’assurer
          d’avoir ses documents à jour avant les grandes vacances.
        </div>

        <div className="text-xl">
          <b> Que faire en cas de Vol de passeport : </b>
        </div>

        <div>
          Lorsqu’un passeport est volé, il est crucial d’agir rapidement. Déclarer le vol sans délai vous
          permet de lancer la procédure pour obtenir un nouveau passeport.
        </div>

        <div>
          Le passeport est essentiel pour voyager, et son vol peut causer de sérieux désagréments,
          notamment à l’étranger. Pour gérer au mieux cette situation exceptionnelle, voici les étapes
          à suivre.
        </div>

        <div>
          Que ce soit lors d’un voyage ou après un simple oubli de sac, la perte d’un passeport est un
          problème majeur, surtout à l’étranger. Sans ce document, il est impossible de se rendre ou
          de quitter de nombreux pays. Dans certains cas d’urgence, un passeport temporaire non
          biométrique peut être délivré pour permettre de quitter le pays. Mais les vols peuvent
          survenir n’importe quand, en France ou ailleurs. La première étape est de rester calme. Une
          procédure simple vous permet de rendre votre passeport volé invalide et de démarrer les
          démarches pour en obtenir un nouveau.
        </div>

        <div>
          La première chose à faire en cas de vol de passeport est de le déclarer immédiatement. En
          France, rendez-vous à la gendarmerie ou au commissariat le plus proche pour faire une
          déclaration de vol. Cette démarche rend le passeport volé invalide et inutilisable. L’agent
          enregistre la demande et remet un récépissé à conserver précieusement, car il sera
          nécessaire lors de la demande d’un nouveau passeport.
        </div>

        <div>
          À l’étranger, la procédure est similaire. La victime doit se rendre à l’ambassade ou au
          consulat de France le plus proche pour déclarer le vol. Pour faciliter la démarche en France, il
          est possible de déposer une pré-plainte en ligne sur le site du gouvernement avant de se
          rendre à la gendarmerie.
        </div>

        <div>
          Une fois le récépissé délivré, la victime peut faire une nouvelle demande de passeport. Cette
          démarche s’effectue dans une mairie équipée d’une station d’enregistrement, et il n’est pas
          nécessaire de se rendre dans la mairie de sa ville de résidence. Pour gagner du temps, une
          pré-<b>demande en ligne</b> peut être remplie avant de se déplacer en mairie.
        </div>

        <div>
          Sur place, il faudra présenter plusieurs documents justificatifs : une photo d’identité, un
          justificatif de domicile, le récépissé de la déclaration de vol, et un timbre fiscal d’une valeur
          de 86 euros. Dès que la demande est envoyée, le passeport est fabriqué. Les délais peuvent
          varier en fonction de la charge de travail des services administratifs. Une fois disponible, le passeport doit être récupéré à la mairie où la demande a été effectuée, dans les trois mois
          suivant sa réception.
        </div>

        <div>
          En résumé, face au vol de votre passeport, la rapidité et l’organisation sont vos meilleurs
          alliés pour retrouver rapidement votre liberté de mouvement.
        </div>

      </div>

    </div>
  );
}

export default MunicipalitySearch;