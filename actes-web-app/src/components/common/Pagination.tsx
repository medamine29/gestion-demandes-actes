
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import PaginationDropdown from "./PaginationDropdown.tsx";
import { Option, PaginationInfo } from "../../data/interfaces.ts";

interface PaginationProps {
  paginationInfo: PaginationInfo;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ paginationInfo, setPage, setPerPage }) => {

  // declarations
  const rowOptions: Option[] = [
    {
      value: '5',
      text: '5'
    },
    {
      value: '10',
      text: '10'
    },
    {
      value: '20',
      text: '20'
    }
  ]

  const perPageOption = rowOptions.find(option => +option.value === paginationInfo.perPage)

  const numberOfPages = Math.ceil(paginationInfo.count / paginationInfo.perPage)

  // classes
  const iconsClasses = "text-xs cursor-pointer"
  const leftArrowClasses = twMerge(
    classNames(iconsClasses, {
      'opacity-50 cursor-not-allowed': paginationInfo.page <= 1
    })
  )
  const rightArrowClasses = twMerge(
    classNames(iconsClasses, {
      'opacity-50 cursor-not-allowed': paginationInfo.page >= numberOfPages
    })
  )

  // event handlers
  const handlePerPageChange = (selectedPerPageOption: Option) => {
    setPerPage(+selectedPerPageOption.value)
  }

  const handleLeftPage = () => {
    if (paginationInfo.page > 1) setPage(paginationInfo.page - 1)
  }

  const handleRightPage = () => {
    if (paginationInfo.page < numberOfPages) setPage(paginationInfo.page + 1)
  }

  // renders
  return (  
    <div className="w-full flex justify-end items-center gap-2 p-2 text-md font-thin">
      <div> par page </div>
      <PaginationDropdown
        value={perPageOption}
        options={rowOptions}
        onChange={handlePerPageChange}
        className={'border border-gray-700'}
      />
      <div> page </div>
      <FaChevronLeft 
        className={leftArrowClasses} 
        onClick={handleLeftPage}
      />
      <div> { `${paginationInfo.page} / ${numberOfPages}` } </div>
      <FaChevronRight 
        className={rightArrowClasses}
        onClick={handleRightPage}
      />
    </div>
  );
}
 
export default Pagination;