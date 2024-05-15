import React, { ReactNode, useState } from "react";
import { useDeleteMessageMutation, useFetchMessagesQuery } from "../store/index.ts";
import classNames from "classnames";
import { BiSolidTrash } from "react-icons/bi";
import Pagination from "../components/common/Pagination.tsx";
import { useSnackbar } from 'react-simple-snackbar'

const Messages = () => {

  const [openSnackbar] = useSnackbar()

  const successSnackBarContent: ReactNode = (
    <div className="underline decoration-green-600">
      Message archivée avec succès
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

  const [deleteMessage] = useDeleteMessageMutation();

  const { 
    data: messagesInfo
  } = useFetchMessagesQuery({ page, perPage, showArchived })

  const handleArchiveMessage = async (id: string) => {
    try {
      await deleteMessage(id).unwrap()
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
        <label className="p-2">
          <input
            id="checkbox"
            type="checkbox"
            name="checkbox"
            checked={showArchived}
            onChange={(e) => { setShowArchived(!showArchived) }}
          />
          <span className="slider"> afficher les messages archivées </span>
        </label>
      </div>
      <table className="table-fixed w-full rounded-xl"
        style={{ borderRadius: '50px' }}
      >
        <colgroup>
          <col className="w-2/12" />
          <col className="w-2/12" />
          <col className="w-2/12" />
          <col className="w-2/12" />
          <col className="w-3/12" />
          <col className="w-1/12" />
        </colgroup>
        <thead>
          <tr>
            <th key={0} className={thClasses}> Nom </th>
            <th key={1} className={thClasses}> e-mail </th>
            <th key={2} className={thClasses}> numéro </th>
            <th key={4} className={thClasses}> date </th>
            <th key={5} className={thClasses}> contenu </th>
            <th key={6} className={thClasses}> supprimer </th>
          </tr>
        </thead>
        <tbody>
          {
            messagesInfo?.messages?.map((row, index) => {
              return (
                <tr key={row._id} className={ row.isArchived ? 'opacity-50' : 'bg-white' }>
                  <td className={tdClasses}> { row.user } </td>
                  <td className={tdClasses}> { row.email } </td>
                  <td className={tdClasses}> { row.phone } </td>
                  <td className={tdClasses}> { row.createdAt } </td>
                  <td className={tdClasses}> { row.content } </td>
                  <td className={tdClasses}> <div className="w-full flex justify-center"> { !row.isArchived && <BiSolidTrash onClick={() => { handleArchiveMessage(row._id) }} className="text-gray-800 text-xl cursor-pointer" /> } </div> </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Pagination 
        paginationInfo={{ page, perPage, count: messagesInfo?.messagesCount || 1 }}
        setPage={setPage}
        setPerPage={setPerPage}
      />
    </div>
  );
}
 
export default Messages