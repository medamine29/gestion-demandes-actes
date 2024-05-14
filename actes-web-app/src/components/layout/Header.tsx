import React from "react"
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../store/index.ts";

const Header: React.FC<{}> = () => {

  const token = useTypedSelector(state => state.auth.token)

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between p-6 border-b border-green-900/50">
      <div className="flex flex-col text-start">
        <Link to="/" > <div className="font-bold text-2xl underline decoration-green-700 cursor-pointer"> NOM PROVISOIRE </div> </Link>
        <div className="text-gray-500"> Assistance administrative privée indépendante des administrations </div>
      </div>
      <div className="flex gap-2 font-semibold underline decoration-green-800">
        { token && <Link to="/dashboard" > <div className="hover:-translate-y-1 cursor-pointer"> Dashboard </div> </Link> }
        <Link to="/acte-de-naissance" > <div className="hover:-translate-y-1 cursor-pointer"> Acte de naissance </div> </Link>
        <Link to="/acte-de-mariage" > <div className="hover:-translate-y-1 cursor-pointer"> Acte de marriage </div> </Link>  
        <Link to="/acte-de-deces" > <div className="hover:-translate-y-1 cursor-pointer"> Acte de décès </div> </Link> 
        <Link to="/contact" > <div className="hover:-translate-y-1 cursor-pointer"> Contactez nous </div> </Link> 
      </div>
    </div>
  )
}

export default Header