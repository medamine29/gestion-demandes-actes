import React from "react"
import { Link } from "react-router-dom"

const Footer: React.FC<{}> = () => {

  return (
    <div className="w-full bg-customBlue relative flex justify-center p-4">
      <div className="w-max md:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 text-white font-semibold justify-items-start md:justify-items-center" >
        <div className="flex flex-col">
          <Link to="/acte-de-naissance" > <div className="hover:-translate-y-1 cursor-pointer"> Acte de naissance </div> </Link>
          <Link to="/acte-de-mariage" > <div className="hover:-translate-y-1 cursor-pointer"> Acte de mariage </div> </Link>
          <Link to="/acte-de-deces" > <div className="hover:-translate-y-1 cursor-pointer"> Acte de décès </div> </Link>
        </div>
        <div className="flex flex-col">
          <Link to="/démarche" > <div className="hover:-translate-y-1 cursor-pointer"> démarches </div> </Link>
          <Link to="/mentions-légales" > <div className="hover:-translate-y-1 cursor-pointer"> mentions légales </div> </Link>
          <Link to="/cgv" > <div className="hover:-translate-y-1 cursor-pointer"> CGV </div> </Link>
          
        </div>
        <Link to="/contact" > <div className="hover:-translate-y-1 cursor-pointer"> Contactez nous </div> </Link>  
      </div>
    </div>
  )
}
 
export default Footer