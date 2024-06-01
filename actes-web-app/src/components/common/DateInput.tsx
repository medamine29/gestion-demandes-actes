import classNames from "classnames";
import { FormikErrors, FormikTouched, getIn } from "formik";
import React, { ReactNode, useEffect, useState } from "react";
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

  const valueAsDate = value && new Date(value)

  const [date, setDate] = useState<string>(valueAsDate ? String(valueAsDate.getDate()).padStart(2, '0') : '')
  const [month, setMonth] = useState<string>(valueAsDate ? String(valueAsDate.getMonth() + 1).padStart(2, '0') : '')
  const [year, setYear] = useState<string>(valueAsDate ? String(valueAsDate.getFullYear()) : '')
  const [fieldsTouched, setFieldsTouched] = useState({ date: valueAsDate ? true : false, month: valueAsDate ? true : false, year: valueAsDate ? true : false })

  useEffect(() => {
    if (fieldsTouched.date && fieldsTouched.month && fieldsTouched.year) {
      console.log("hello !")
      setFieldTouched(id, true)
      setFieldValue(id, `${month}/${date}/${year}`)
    }
  }, [date, year, month])

  const errorMessageClasses = classNames('text-sm text-red-700')
  const inputClasses = classNames('bg-white/60 p-1 rounded w-1/3')
  
  return (
    <div className={inputContainerClasses}>
      <label htmlFor={id} className="font-semibold"> { label } </label>
      <div className="flex gap-1 justify-evenly">
        <input 
          type="number"
          className={inputClasses}
          value={date}
          placeholder="JJ"
          onChange={(e) => { 
            setDate(e.target.value) 
            setFieldsTouched({ ...fieldsTouched, date: true })
          }}
        />
        <input 
          type="number"
          className={inputClasses}
          value={month}
          placeholder="MM"
          onChange={(e) => { 
            setMonth(e.target.value) 
            setFieldsTouched({ ...fieldsTouched, month: true })
          }}
        />
        <input 
          type="number"
          className={inputClasses}
          value={year}
          placeholder="AAAA"
          onChange={(e) => { 
            setYear(e.target.value) 
            setFieldsTouched({ ...fieldsTouched, year: true })
          }}
        />
      </div>
      { getIn(errors, id) && getIn(touched, id)  && <div className={errorMessageClasses}> { getIn(errors, id) as ReactNode } </div> }
    </div>
  );
}
 
export default DateInput;