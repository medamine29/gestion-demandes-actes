import classNames from "classnames";
import { FormikErrors, FormikTouched, getIn } from "formik";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface DateInputProps<T> {
  id: string;
  label: string;
  value?: string;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  setFieldValue: (field: string, value: any) => void;
  setFieldTouched: (field: string, touched: boolean) => void
}

const DateInput: React.FC<DateInputProps<any>> = ({ id, label, value, errors, touched, setFieldValue, setFieldTouched }) => { 

  const inputContainerClasses = twMerge(
    classNames('flex flex-col p-2 rounded bg-gray-100', {
      'border border-red-700': getIn(errors, id) && getIn(touched, id) 
    })
  );

  const handleOnChange = (e) => {
    setFieldTouched(id, true)
    setFieldValue(id, e.target.value)
  }

  const errorMessageClasses = classNames('text-sm text-red-700')
  
  return (
    <div className={inputContainerClasses}>
      <label htmlFor={id} className="font-semibold"> { label } </label>
      <input 
        type="date"
        id={id}
        name={id}
        className="bg-transparent"  
        value={value?.substring(0, 10)}
        onChange={handleOnChange}
      />
      { getIn(errors, id) && getIn(touched, id)  && <div className={errorMessageClasses}> { getIn(errors, id) as ReactNode } </div> }
    </div>
  );
}
 
export default DateInput;