import React from "react";
import { Link } from "react-router-dom";
import { categoriesList } from "../data/actesData.tsx";
import { Category } from "../data/interfaces.ts";

const Dashboard = () => {

  const renderedCategories = categoriesList.map(category => <CategoryBox key={category.type} category={category} /> )

  return (  
    <div className="w-full min-h-screen flex flex-col items-center bg-white p-4 gap-4 m-4">
      <div className="text-xl md:text-2xl font-semibold text-center"> Consulter les demandes d'actes et les messages </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-stretch">
        { renderedCategories }
      </div>
      <div className="w-4/5 h-8 border-b border-green-900" />
    </div>
    
  );
}
 
export default Dashboard;

interface CategoryBoxProps {
  category: Category
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ category }) => {

  // classes
  const iconClasses = "text-7xl text-green-900 m-1"

  return (  
    <Link to={category.path} >
      <div className="flex flex-col gap-2 py-4 px-12 border rounded text-center items-center border-green-900 hover:-translate-y-2">
        { category.renderIcon(iconClasses) }
        <div className="font-semibold"> { category.label } </div>
      </div>
    </Link>
  );
}