import React from "react";
import { actesList } from "../../data/actesData.tsx"
import { Acte } from "../../data/interfaces.ts";
import { Link } from 'react-router-dom';

const ActesList = () => {

  const renderedActes = actesList.map(acte => <ActeBox key={acte.type} acte={acte} /> )

  return (  
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      { renderedActes }
    </div>
  );
}
 
export default ActesList


interface ActeBoxProps {
  acte: Acte
}

const ActeBox: React.FC<ActeBoxProps> = ({ acte }) => {

  // classes
  const iconClasses = "text-7xl text-green-900 m-1"

  return (  
    <Link to={acte.path} >
      <div className="flex flex-col gap-2 p-4 border rounded text-center items-center border-green-900 hover:-translate-y-2">
        { acte.renderIcon(iconClasses) }
        <div className="font-semibold"> { acte.label } </div>
      </div>
    </Link>
  );
}