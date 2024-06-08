import React, { ReactNode, useState } from "react";
import Modal from "../common/Modal.tsx";
import { FaChevronRight } from "react-icons/fa";
import { useAddActMutation, useTypedSelector } from "../../store/index.ts";
import { ActAddress, ActeType, AddAct, BirthInfo, DeathInfo, MarriageInfo } from "../../data/interfaces.ts";
import { useSnackbar } from 'react-simple-snackbar'
import Checkout from "../paiement/Checkout.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PaiementMethodProps {
  onClose: () => void;
}

const PaiementMethod: React.FC<PaiementMethodProps> = ({ onClose }) => {

  const [addAct] = useAddActMutation();
  const [openSnackbar] = useSnackbar()
  const [showPaypal, setShowPaypal] = useState<boolean>(false)

  const initialOptions = {
    clientId: "AZ0fEfRHaATtpmX-o2EZtQiS82Cb4boTafPvBBTOakFCL8Ezt4x9aLHxQ_3CSD6LXBERbYcsMAw_7Xuo",
    currency: "EUR",
    intent: "capture",
  };

  const successSnackBarContent: ReactNode = (
    <div className="underline decoration-green-600">
      Demande enregistrée avec succès
    </div>
  )

  const failureSnackBarContent: ReactNode = (
    <div className="underline decoration-red-700">
      une erreur s'est produite
    </div>
  )

  const { marriageInfo, birthInfo, deathInfo, actAddressInfo, actType } = useTypedSelector(
    (state) => ({ 
      marriageInfo: state.marriageAct, 
      birthInfo: state.birthAct, 
      deathInfo: state.deathAct, 
      actAddressInfo: state.actAddress, 
      actType: state.auth.actType 
    })
  )

  const handleAddAct = async () => {
    if (actType && actAddressInfo) {
      let requestBody: AddAct = { actType, actAddressInfo: actAddressInfo as Required<ActAddress> }
      if (actType === ActeType.BIRTH) requestBody.birthInfo = birthInfo as Required<BirthInfo>
      else if (actType === ActeType.DEATH) requestBody.deathInfo = deathInfo as Required<DeathInfo>
      else if (actType === ActeType.MARRIAGE) requestBody.marriageInfo = marriageInfo as Required<MarriageInfo>
      onClose()
      try {
        await addAct(requestBody).unwrap()
        openSnackbar(successSnackBarContent, 2500)
      } catch (error) {
        openSnackbar(failureSnackBarContent, 2500)
      }
      
    }
  }

  const modalContent: ReactNode = (
    <div className="bg-white p-8 rounded flex flex-col gap-2 w-5/6 md:w-3/5 lg:w-2/5">
      <div className="font-semibold text-lg"> Choisir votre moyen de paiement :</div>
      <div 
        className="flex bg-gray-300 rounded p-2 items-center justify-between cursor-pointer"
        onClick={handleAddAct}
      >
        <div className="flex gap-2 items-center">
          <img
            src="/images/mastercard.png"
            className="w-20 h-8 rounded"
          />
          <div className="font-semibold"> Master card </div>
        </div>
        <FaChevronRight />
      </div>
      <div 
        className="flex bg-gray-300 rounded p-2 items-center justify-between cursor-pointer"
        onClick={() => { setShowPaypal(true) }}
      >
        <div className="flex gap-2 items-center">
          <img
            src="/images/paypal.png"
            className="w-20 h-8 bg-white rounded"
          />
          <div className="font-semibold"> Paypal </div>
        </div>
        <FaChevronRight />
      </div>
      { showPaypal && (
        <PayPalScriptProvider options={initialOptions}>
          <Checkout/>
        </PayPalScriptProvider>
      ) }
    </div>
  )

  return (  
    <Modal
      onClose={onClose}
    >
      { modalContent }
    </Modal>
  );
}
 
export default PaiementMethod;