import classNames from "classnames";
import { FormikErrors, getIn } from "formik";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CheckBoxProps<T> {
  id: string;
  value?: boolean;
  label: string;
  labelClassName?: string;
  errors?: FormikErrors<T>;
  setFieldValue: (field: string, value: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps<any>> = ({ id, value = false, label, labelClassName, errors, setFieldValue }) => {

  const handleOnChange = () => {
    setFieldValue(id, !value)
  }

  const inputContainerClasses = twMerge(
    classNames('flex flex-col col-span-1 md:col-span-2 border-b border-gray-300', {
      'border-red-700': getIn(errors, id)
    })
  );
  const errorMessageClasses = classNames('text-sm text-red-700')
  const labelClasses = classNames('font-semibold', labelClassName)

  return (  
    <div className={inputContainerClasses}>
      <div className="flex p-2 gap-2 items-center">
        <input
          id={id}
          type="checkbox"
          name={id}
          checked={value}
          onChange={handleOnChange}
        />
        <label htmlFor={id} className={labelClasses}> { label } </label>
      </div>
      <div className="ml-8">
        { getIn(errors, id) && <div className={errorMessageClasses}> { getIn(errors, id) as ReactNode } </div> }
      </div>
    </div>
    
  );
}
 
export default CheckBox;