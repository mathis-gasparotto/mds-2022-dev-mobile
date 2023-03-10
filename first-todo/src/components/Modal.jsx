export default function Modal({onClose, open, children}) {
  return (
    <>
      {open && 
        <div className="modal">
          <div className="modal-bg" onClick={() => onClose()}></div>
          <div className="modal-content">
            {children}
          </div>
        </div>
      }
    </>
  )
}