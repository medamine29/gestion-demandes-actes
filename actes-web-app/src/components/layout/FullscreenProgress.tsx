import ReactDOM from "react-dom";
import React, { useEffect } from "react";

const FullscreenProgress: React.FC<{}>  = () => {

  // hooks
  useEffect(() => {
    document.body.classList.add('overflow-hidden')

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  })

  // renders
  const modalContainer = document.querySelector('.modal-container');
  if (!modalContainer) return null

  return ReactDOM.createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-300 opacity-80" />
      <div className="fixed inset-40">
        <div className="flex flex-col justify-between h-full">
          <img 
            src="/images/logo.png"
            alt="logo"
            className="mx-auto my-auto animate-zoom-in-out" 
          />
        </div>
      </div>
    </div>,
    modalContainer
  )
}
 
export default FullscreenProgress;