// React Related Imports
import ReactDOM from "react-dom";
import React, { ReactNode, useEffect } from "react";
interface ModalProps {
  children: ReactNode;
  actionBar?: ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, actionBar }) => {

  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')  
    }
  })

  const modalContainer = document.querySelector('.modal-container');
  if (!modalContainer) return null;

  return ReactDOM.createPortal(
    <div>
      <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div>
      <div onClick={onClose} className="fixed inset-5 inset-y-20 p-10 bg-transparent rounded">
        <div className="flex flex-col justify-between h-full flex items-center justify-center">
          {children}
          <div className="flex justify-end">
            {actionBar}
          </div>
        </div>
      </div>
    </div>,
    modalContainer
  )
}

export default Modal;
