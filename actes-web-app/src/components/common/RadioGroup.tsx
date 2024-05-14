import React from "react";
import { RadioOption } from "../../data/interfaces.ts";

interface RadioGroupProps {
  id: string;
  label: string;
  value?: string;
  options: RadioOption[];
  setFieldValue: (field: string, value: any) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ id, label, value, options, setFieldValue }) => {

  const renderedOptions = options.map(option => (
    <div
      key={option.value} 
      className="flex flex-1 gap-2"
    >
      <input 
        type="radio" 
        id={option.value}
        name={id}
        value={option.value}
        onChange={(e) => { setFieldValue(id, e.target.value) }}
        checked={ value === option.value }
      />
      <label htmlFor={option.value}> { option.label } </label>
    </div>
  ))

  return (  
    <div className="flex flex-col p-2 rounded bg-gray-100">
      <div className="font-semibold">
        { label }
      </div>
      <div className="flex">
        { renderedOptions }
      </div>
    </div>
  );
}
 
export default RadioGroup;