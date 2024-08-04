import React, { ReactNode } from "react";
import { RadioOption } from "../../data/interfaces.ts";
import { FormikErrors, FormikTouched, getIn } from "formik";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface RadioGroupProps<T> {
  id: string;
  label: string;
  value?: string;
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
  options: RadioOption[];
  setFieldValue: (field: string, value: any) => void;
}

const RadioGroup: React.FC<RadioGroupProps<any>> = ({ id, label, value, errors, touched, options, setFieldValue }) => {

  const inputContainerClasses = twMerge(
    classNames('w-full relative flex flex-col p-1.5 bg-white min-h-12 rounded', {
      'border border-red-700': getIn(errors, id) && getIn(touched, id)
    })
  )
  const errorMessageClasses = classNames('text-sm text-red-700')

  const renderedOptions = options.map(option => (
    <div
      key={option.value} 
      className="flex flex-1 gap-2 items-center"
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
    <div className={inputContainerClasses}>
      <div className="font-semibold">
        { label }
      </div>
      <div className="flex">
        { renderedOptions }
      </div>
      { getIn(errors, id) && getIn(touched, id) && <div className={errorMessageClasses}> { getIn(errors, id) as ReactNode } </div> }
    </div>
  );
}
 
export default RadioGroup;