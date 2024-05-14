import React, { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go"
import classNames from "classnames";
import { Option } from "../../data/interfaces.ts";

interface PaginationDropdownProps {
  placeholder?: string;
  options: Option[];
  value?: Option;
  onChange: (selectedOption: Option) => void;
  className?: string;
  disabled?: boolean;
}

const PaginationDropdown: React.FC<PaginationDropdownProps> = ({ placeholder, options, value, onChange, className, disabled }) => {

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

  // classes
  const dropdownClasses = classNames(className, 'relative cursor-pointer', {
    'opacity-50 cursor-default': disabled
  })

  // event handlers
  const handleClick = () => {
    if (!disabled) setIsOpen((currentIsOpen) => !currentIsOpen)
  }

  const handleOptionClick = (selectedOption: Option) => {
    setIsOpen(false)
    onChange(selectedOption)
  }

  // renders
  const renderedOptions = options.map((optionElem) => {
    return (
      <div
        key={optionElem.value}
        className="hover:bg-gray-200 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(optionElem)}
      >
        {optionElem.text}
      </div>
    )
  })

  return (
    <div ref={divEl} 
      className={dropdownClasses}
    >
      <div 
        className="flex justify-between items-center gap-2 m-2"
        onClick={handleClick}
      >
        { value?.text || placeholder || 'Select...' }
        <GoChevronDown className="text-lg"/>
      </div>
      {isOpen && <div className="absolute top-full w-full border bg-white z-30 p-1 my-1"> { renderedOptions } </div>}
    </div>
  )
}

export default PaginationDropdown