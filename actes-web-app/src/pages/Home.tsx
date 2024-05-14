import React from "react"
import ActesList from "../components/actes/ActesList.tsx"

const Home: React.FC<{}> = () => {

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white">
      <div className="py-6 px-2 flex flex-col items-center">
        <div className="text-xl md:text-2xl font-semibold text-center"> Gagnez du Temps ! Commandez vos actes d'état civil en ligne en toute simplicité. </div>
        <div className="text-sm md:text-md text-gray-700 text-center"> Accès à nos services 24/7, sans contrainte de déplacement. </div>
      </div>
      <ActesList />
      <div className="w-4/5 h-8 border-b border-gray-400">
      </div>
      <div className="py-6 px-12 text-center text-gray-700">
        <div>
          Ne perdez plus votre temps en mairie où les temps d’attente sont très longs et les horaires d’ouverture limités.
        </div>
        <div>
          Notre plateforme <a href="/" className="underline"> assistance-etats-civils.fr</a>  <strong> NOM PROVISOIRE </strong> vous offre la possibilité de commander en ligne vos actes d'états civils avec un focus principal sur les <strong> actes de naissances </strong>, les <strong> actes de mariage </strong> et les <strong> actes de décès </strong>.
        </div>
        <div>
          Nous vous accompagnons dans chaque étape du processus avec nos formulaires intuitifs.
        </div>
        <div>
          Vous n’avez plus qu’à renseigner les informations essentielles pour l’obtention de vos actes d’états civils et nous nous occupons du reste !
        </div>
        <div>
          Plus besoin de vous déplacer à plusieurs reprises pour constituer un dossier de mariage, obtenir vos papiers d’identité, entamer une démarche d’adoption, une demande de visa, une succession, un changement de nom…
        </div>
        <div className="p-2 font-semibold">
          Gagnez un temps précieux et simplifiez vos démarches administratives avec notre plateforme de commande en ligne <a href="/" className="underline"> assistance-etats-civils.fr</a>
        </div>
      </div>
    </div>
  )
}
 
export default Home