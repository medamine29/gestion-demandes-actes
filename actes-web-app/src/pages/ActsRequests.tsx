import React, { ReactNode, useState } from "react";
import { useDeleteActMutation, useFetchActsQuery } from "../store/index.ts";
import classNames from "classnames";
import { ActeType } from "../data/interfaces.ts";
import { BiSolidMessageRoundedDetail, BiSolidTrash } from "react-icons/bi";
import Pagination from "../components/common/Pagination.tsx";
import Button from "../components/common/Button.tsx";
import { Link } from "react-router-dom";
import { useSnackbar } from 'react-simple-snackbar'

const getColorByActType = (actType: ActeType) => {
  if (actType === ActeType.BIRTH) return "bg-green-300/70"
  else if (actType === ActeType.DEATH) return "bg-black/70"
  else if (actType === ActeType.MARRIAGE) return "bg-pink-400/80"
}

const ActsRequests = () => {

  const [openSnackbar] = useSnackbar()

  const successSnackBarContent: ReactNode = (
    <div className="underline decoration-green-600">
      Demande archivée avec succès
    </div>
  )

  const failureSnackBarContent: ReactNode = (
    <div className="underline decoration-red-700">
      une erreur s'est produite
    </div>
  )

  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(20)
  const [showArchived, setShowArchived] = useState<boolean>(false)
  const [actType, setActType] = useState<ActeType | undefined>()

  const [deleteAct] = useDeleteActMutation();

  const { 
    data: actsInfo
  } = useFetchActsQuery({ page, perPage, showArchived, actType })

  const handleArchiveAct = async (id: string) => {
    try {
      await deleteAct(id).unwrap()
      openSnackbar(successSnackBarContent, 2500)
    } catch (error) {
      openSnackbar(failureSnackBarContent, 2500)
    }
  }

  // classes
  const thClasses = classNames("w-1/4 border bg-white p-2")
  const tdClasses = classNames("border bg-white p-2")

  return (  
    <div className="w-full flex flex-col">
      <div className="flex p-2 items-center gap-2">
        <label className="p-2 border-r border-green-900">
          <input
            id="checkbox"
            type="checkbox"
            name="checkbox"
            checked={showArchived}
            onChange={(e) => { setShowArchived(!showArchived) }}
          />
          <span className="slider"> afficher les demandes archivées </span>
        </label>
        <div className="flex">
          <Button
            className={ `p-2 bg-white ${!actType && 'border border-black'}` }
            onClick={() => { setActType(undefined) }}
          > 
            Tous 
          </Button>
          <Button
            className={ `p-2 bg-green-200/50 ${ actType === ActeType.BIRTH && 'border border-black' }` }
            onClick={() => { setActType(ActeType.BIRTH) }}
          > 
            Actes de naissance 
          </Button>
          <Button
            className={ `p-2 bg-black/50 ${ actType === ActeType.DEATH && 'border border-black' }` }
            onClick={() => { setActType(ActeType.DEATH) }}
          > 
            Actes de décès 
          </Button>
          <Button
            className={ `p-2 bg-pink-300/50 ${ actType === ActeType.MARRIAGE && 'border border-black' }` }
            onClick={() => { setActType(ActeType.MARRIAGE) }}
          > 
            Actes de mariage 
          </Button>
        </div>
      </div>
      <table className="table-fixed w-full rounded-xl"
        style={{ borderRadius: '50px' }}
      >
        <colgroup>
          <col className="w-2/12" />
          <col className="w-2/12" />
          <col className="w-3/12" />
          <col className="w-3/12" />
          <col className="w-1/12" />
          <col className="w-1/12" />
        </colgroup>
        <thead>
          <tr>
            <th key={0} className={thClasses}> Type d'acte </th>
            <th key={1} className={thClasses}> demandeur </th>
            <th key={2} className={thClasses}> adresse </th>
            <th key={4} className={thClasses}> date </th>
            <th key={5} className={thClasses}> détails </th>
            <th key={6} className={thClasses}> supprimer </th>
          </tr>
        </thead>
        <tbody>
          {
            actsInfo?.acts?.map((row, index) => {
              return (
                <tr key={row._id} className={ row.isArchived ? 'opacity-50' : 'bg-white' }>
                  <td className={tdClasses}> <div className="w-full flex items-center gap-2"> <div className={`h-2 w-2 rounded-xl ${getColorByActType(row.actType)}`} /> <div> { row.formattedActType } </div> </div> </td>
                  <td className={tdClasses}> { row.user } </td>
                  <td className={tdClasses}> { row.address } </td>
                  <td className={tdClasses}> { row.createdAt } </td>
                  <td className={tdClasses}> <div className="w-full flex justify-center">  <Link to={`/actes/${row._id}`} > <BiSolidMessageRoundedDetail className="text-gray-800 text-xl cursor-pointer" /> </Link> </div> </td>
                  <td className={tdClasses}> <div className="w-full flex justify-center"> { !row.isArchived && <BiSolidTrash onClick={() => { handleArchiveAct(row._id) }} className="text-gray-800 text-xl cursor-pointer" /> } </div> </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Pagination 
        paginationInfo={{ page, perPage, count: actsInfo?.actsCount || 1 }}
        setPage={setPage}
        setPerPage={setPerPage}
      />
    </div>
  );
}
 
export default ActsRequests;