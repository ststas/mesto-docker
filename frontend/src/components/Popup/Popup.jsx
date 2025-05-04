import { usePopupClose } from '../../hooks/usePopupClose'

function Popup ({ isOpen, name, onClose, children }) {
  usePopupClose(isOpen, onClose)
  
  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button className='popup__close-button' type='button' onClick={onClose}/>
        {children}
      </div>
    </section>
  )
}

export default Popup