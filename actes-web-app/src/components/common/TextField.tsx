import React, { ReactNode, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import classNames from "classnames";
import { FormikErrors, FormikTouched, getIn } from "formik";
import { Tooltip } from 'react-tooltip';
import { twMerge } from "tailwind-merge";

interface TextFieldProps<T> {
  id: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur: (e: React.ChangeEvent<any>) => void;
  touched: FormikTouched<T>;
  errors: FormikErrors<T>;
  label: string;
  hideable?: boolean;
  placeholder?: string;
  info?: string;
  labelIcon?: React.FC<{ className?: string }>;
  disabled?: boolean; 
}

const TextField: React.FC<TextFieldProps<any>> = ({ id, value, onChange, onBlur, touched, errors, label, labelIcon: LabelIcon, hideable = false, info, disabled = false, placeholder = 'saisir...' }) => {

  // hooks
  const [showHiddenText, setHiddenText] = useState<boolean>(!hideable);
 
  // classes
  const inputContainerClasses = twMerge(
    classNames('w-full relative flex flex-col p-2 bg-gray-100 gap-1 h-16 rounded', {
      'border border-red-700 mb-8': getIn(errors, id) && getIn(touched, id),
      'opacity-50 cursor-not-allowed': disabled
    })
  )
  const inputLabelClasses = classNames('font-semibold')
  const inputClasses = classNames('bg-transparent text-gray-700 focus:outline-none')
  const errorMessageClasses = classNames('text-sm text-red-700')

  return (  
    <div className={inputContainerClasses}>
      <label className={inputLabelClasses}>
        { label }
      </label>

      <div className="flex items-center gap-2">

        {LabelIcon && <LabelIcon className="text-gray-700" />}

        <input
          id={id}
          type={ showHiddenText ? "text" : "password" }
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
        />

        { info && (
            <div className="absolute right-0">
              <a id={`tooltip-${id.replace(".","")}`} className="right-2">
                <FaCircleInfo className="absolute cursor-pointer text-xl text-green-900 top-1/2 transform -translate-y-1/2 right-2 opacity-70" />  
              </a>
              <Tooltip anchorSelect={`#tooltip-${id.replace(".","")}`} place="top-end" className="z-50">
                { info }
              </Tooltip>
            </div>
          )
        }
        
        {
          hideable && (
            showHiddenText
              ? (
                <MdOutlineVisibilityOff 
                  className="absolute text-xl text-black right-1 bottom-1 text-green-900/70"
                  onClick={() => { setHiddenText(false) }}
                />
              )
              : (
                <MdOutlineVisibility 
                  className="absolute text-xl text-black right-1 bottom-1 text-green-900/70"
                  onClick={() => { setHiddenText(true) }}
                />
              )
          )
        }

      </div>

      { getIn(errors, id) && getIn(touched, id) && <div className={errorMessageClasses}> { getIn(errors, id) as ReactNode } </div> }
    </div>
  );
}
 
export default TextField;