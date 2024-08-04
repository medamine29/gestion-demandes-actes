import React from "react"
import ActesList from "../components/actes/ActesList.tsx"
import Checkout from "../components/paiement/Checkout.tsx"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

const Home: React.FC<{}> = () => {

  return (
    <div className="w-full flex flex-col items-center justify-center text-customBlue">
      <div className="flex flex-col gap-3 py-6 px-12">
        <div className="text-md md:text-lg"> Gagnez du Temps ! Commandez <strong> vos actes d'état civil en ligne </strong> en toute simplicité. </div>
        <div className="text-sm md:text-md"> Accès à nos services 24/7, sans contrainte de déplacement. </div>
        <div>
          Ne perdez plus votre temps en mairie où les temps d’attente sont très longs et les horaires d’ouverture limités.
        </div>
        <div>
          Notre plateforme <a href="/" className="underline"> assistance-etats-civils.fr</a>  <strong> acte-de-naissance-express.fr </strong> vous offre la possibilité de <b> commander en ligne </b> vos actes <b> d'états civils </b> avec un focus principal sur les <strong> actes de naissances </strong>, les <strong> actes de mariage </strong> et les <strong> actes de décès </strong>.
        </div>
        <div>
          Nous vous accompagnons dans chaque étape du processus avec nos <b> formulaires intuitifs </b>.
        </div>
        <div>
          Vous n’avez plus qu’à renseigner les informations essentielles pour l’obtention de vos actes d’états civils et nous nous occupons du reste !
        </div>
        <div>
          Plus besoin de vous déplacer à plusieurs reprises pour constituer un dossier de mariage, obtenir vos papiers d’identité, entamer une démarche d’adoption, une demande de visa, une succession, un changement de nom…
        </div>
        <div>
          Gagnez un temps précieux et simplifiez vos <b> démarches administratives </b> avec notre plateforme de commande en ligne <a href="/" className="underline"> assistance-etats-civils.fr</a>
        </div>
      </div>
      <ActesList />
    </div>
  )
}

const Homee = () => {

  const initialOptions = {
    clientId: "AZ0fEfRHaATtpmX-o2EZtQiS82Cb4boTafPvBBTOakFCL8Ezt4x9aLHxQ_3CSD6LXBERbYcsMAw_7Xuo",
    currency: "EUR",
    intent: "capture",
    disableFunding: "card"
  };

  return (
    <div className="flex flex-col">
      <PayPalScriptProvider options={initialOptions}>
        <Checkout/>
      </PayPalScriptProvider>
    </div>
  )
}
 
export default Home