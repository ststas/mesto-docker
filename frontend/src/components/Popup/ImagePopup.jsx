import Popup from './Popup'

function ImagePopup ({ name, card, isOpen, onClose }) {

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <figure className="popup__figure">
        <img src={card?.link ? card.link : "#"} className="popup__image" alt={card?.name ? card.name : ""}/>
        <figcaption className="popup__image-caption">{card?.name}</figcaption>
      </figure>
    </Popup>
  )
}

export default ImagePopup