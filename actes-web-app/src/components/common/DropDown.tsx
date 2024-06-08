import React, { useState, useEffect, useRef, ReactNode } from "react";
import { GoChevronDown } from "react-icons/go"
import classNames from "classnames";
import { FormikErrors, FormikTouched } from "formik";
import { twMerge } from "tailwind-merge";

interface DropdownProps<T> {
  id: string;
  label: string;
  placeholder?: string;
  options?: string[];
  value?: string;
  className?: string;
  isFetching?: boolean;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  setFieldValue: (field: string, value: any) => void;
  setFieldTouched: (field: string, touched: boolean) => void
}

const Dropdown: React.FC<DropdownProps<any>> = ({ id, placeholder, options = [], value, label, className, isFetching = false, errors, touched, setFieldValue, setFieldTouched }) => {

  // hooks
  const [isOpen, setIsOpen] = useState(false)
  const divEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!divEl.current) return
      if (!divEl.current.contains(event.target as Node)) setIsOpen(false)
    }

    document.addEventListener('click', handler, false)

    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])

  useEffect(() => {
    if (value && options?.length && !options.includes(value)) setFieldValue(id , options[0])
  }, [options])

  // classes
  const dropdownClasses = classNames(className, 'relative cursor-pointer rounded')
  const inputContainerClasses = twMerge(
    classNames('bg-gray-100 p-2 rounded', {
      'border border-red-700': errors[id] && touched[id]
    }, className)
  );
  const errorMessageClasses = classNames('text-sm text-red-700')

  // event handlers
  const handleClick = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen)
  }

  const handleOptionClick = (selectedOption: string) => {
    setIsOpen(false)
    setFieldTouched(id, true)
    setFieldValue(id ,selectedOption)
  }

  // renders
  const renderedOptions = options.map((optionElem) => {
    return (
      <div
        key={optionElem}
        className="hover:bg-gray-200 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(optionElem)}
      >
        {optionElem}
      </div>
    )
  })

  return (
    <div 
      ref={divEl} 
      className={dropdownClasses}
    >
      <div className={inputContainerClasses}>
        <div className="font-semibold"> { label } </div>
        <div 
          className="flex justify-between items-center gap-2"
          onClick={handleClick}
        >
          <input
            value={value || ''}
            placeholder={placeholder}
            className="w-full bg-transparent"
            readOnly
          />
          <GoChevronDown className="text-lg"/>
        </div>
      </div>

      {
        isOpen && (
          isFetching
            ? (
              <img 
                src="/images/loading.gif" 
                alt="en cours..."
                className="z-50 bg-white"
              /> 
            )
            : (
              <div className="absolute top-full w-full border bg-white z-30 p-1 my-1 overflow-y-auto max-h-80"> { renderedOptions } </div>
            )
        )
      }

      <div className="px-2">
        { errors[id] && <div className={errorMessageClasses}> { errors[id] as ReactNode } </div> }
      </div>
      
    </div>
  )
}

export default Dropdown