import React from "react"
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../store/index.ts";

const Header: React.FC<{}> = () => {

  const token = useTypedSelector(state => state.auth.token)

  return (
    <div className="w-full bg-customBlue text-white flex flex-col p-6">
      <div className="flex ml-auto gap-2 text-sm">
        { token && <Link to="/dashboard" > <div className="hover:-translate-y-1 cursor-pointer"> Dashboard </div> </Link> }
        <Link to="/acte-de-naissance" > <div className="hover:-translate-y-1 cursor-pointer"> Acte de naissance </div> </Link>
        <Link to="/acte-de-mariage" > <div className="hover:-translate-y-1 cursor-pointer"> Acte de marriage </div> </Link>  
        <Link to="/acte-de-deces" > <div className="hover:-translate-y-1 cursor-pointer"> Acte de décès </div> </Link> 
        <Link to="/contact" > <div className="hover:-translate-y-1 cursor-pointer"> Contactez nous </div> </Link> 
      </div>
      <div className="flex flex-col p-4">
        <Link to="/" > <div className="font-bold text-4xl cursor-pointer"> acte-de-naissance-express.fr </div> </Link>
        <div className="font-light text-sm"> Assistance administrative privée indépendante des administrations </div>
      </div>
      
    </div>
  )
}

export default Header