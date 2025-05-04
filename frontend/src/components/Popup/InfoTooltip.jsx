import unionTrue from '../../images/union-true.svg'
import unionFalse from '../../images/union-false.svg'
import Popup from './Popup'

function InfoTooltip ({ name, isOpen, onClose, isLogSuccessful }) {

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
        <img 
          src={isLogSuccessful ? unionTrue : unionFalse} 
          className="popup__image popup__image_type_info"
          alt={isLogSuccessful ? 'picture with success sign' : 'picture with unsuccess sign'}
        />
        <h2 className="popup__title popup__title_type_info">
          {isLogSuccessful ? 'You have successfully \n signed up!' : 'Something went wrong! \n Please, try again.'}
        </h2>
    </Popup>
  )
  
}

export default InfoTooltip

