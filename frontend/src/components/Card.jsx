import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card ({ card, onClickCard, onLikeCard, onDeleteCard }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = (`element__heart-button ${isLiked && 'element__heart-button_active'}`);

  function handleClick() {
    onClickCard(card);
  }

  function handleLike() {
    onLikeCard(card)
  }

  function handleDelete() {
    onDeleteCard(card)    
  }

  return (
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <div className="element__caption">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__heart-likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLike}></button>
          <p className="element__likes-counter">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button type="button" className="element__delete-button" onClick={handleDelete}></button>}
    </article>
  )
}

export default Card


