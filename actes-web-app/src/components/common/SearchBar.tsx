import classNames from "classnames";
import { FormikErrors, FormikTouched } from "formik";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useFetchMunicipalitiesQuery } from "../../store/index.ts";
import { twMerge } from "tailwind-merge";

interface SearchBarProps<T> {
  id: string;
  value: string | number;
  touched?: FormikTouched<T>;
  errors?: FormikErrors<T>;
  label: string;
  optionPrefix?: string;
  placeholder?: string;
  labelIcon?: React.FC<{ className?: string }>;
  setFieldValue: (field: string, value: any) => void;
  setFieldTouched?: (field: string, touched: boolean) => void
}

const SearchBar: React.FC<SearchBarProps<any>> = ({ id, value, touched, errors, label, optionPrefix, placeholder, labelIcon: LabelIcon, setFieldValue, setFieldTouched }) => {

  // hooks
  const [isOpen, setIsOpen] = useState(false)
  const divEl = useRef<HTMLDivElement>(null)
  const [searchText, setSearchText] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchText, 600);

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
    if (debouncedSearchTerm.length > 1) setIsOpen(true)
    else setIsOpen(false)
  }, [debouncedSearchTerm])

  // queries & mutations
  const { 
    data: municipalities,
    isFetching: isFetchingMunicipalities
  } = useFetchMunicipalitiesQuery(debouncedSearchTerm, { skip: debouncedSearchTerm.length < 2 })

  // events
  const handleOnChange = (e) => {
    setSearchText(e.target.value)
    setFieldValue(id, '')
  }

  const handleOptionClick = (option: string) => {
    setIsOpen(false)
    setSearchText('')
    setFieldTouched && setFieldTouched(id, true)
    setFieldValue(id, option)
  }

  // classes
  const inputContainerClasses = twMerge(
    classNames('w-full relative flex flex-col bg-gray-100 gap-1 h-16 rounded', {
      'border border-red-700 mb-8': errors && errors[id] && touched && touched[id]
    })
  );
  const inputLabelClasses = classNames('font-semibold')
  const inputClasses = classNames('w-full bg-transparent text-gray-700 focus:outline-none')
  const errorMessageClasses = classNames('text-sm text-red-700')

  // renders
  const renderedOptions = municipalities?.map((muncipalityElem) => {
    return (
      <div
        key={muncipalityElem}
        className="hover:bg-gray-200 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(muncipalityElem)}
      >
        {optionPrefix} {muncipalityElem}
      </div>
    )
  })
  
  return (  
    <div 
      ref={divEl}
      className={inputContainerClasses}
    >

    <div className="p-2">
      <label className={inputLabelClasses}>
        { label }
      </label>

      <div className="flex items-center gap-2">

        {LabelIcon && <LabelIcon className="text-gray-700" />}

        <input
          id={id}
          value={searchText || value}
          placeholder={placeholder}
          className={inputClasses}
          onChange={handleOnChange}
        />

      </div>
    </div>

    {
      isOpen && (
        isFetchingMunicipalities
          ? (
            <img 
              src="/images/loading.gif" 
              alt="en cours..."
              className="z-50 bg-white"
            /> 
          )
          : (
            <div className="absolute top-full w-full border bg-white z-30 p-1 my-1 overflow-y-auto max-h-40"> { renderedOptions } </div>
          )
      )
    }

    { errors && errors[id] && touched && touched[id] && <div className={errorMessageClasses}> { errors[id] as ReactNode } </div> }
  </div>
  );
}
 
export default SearchBar;

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}