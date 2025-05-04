import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Card from './Card'
import Spinner from './Spinner/Spinner'

function Main ({ onEditProfile, onEditAvatar, onAddCard, onDeleteCard, onClickCard, onLikeCard, cards, isFetching }) {
  
  const userData = useContext(CurrentUserContext)

  return (
    isFetching ? <Spinner/> : 

    <main className="content">
      <section className="profile">
        <div className="profile__avatar-block" onClick={onEditAvatar}>
          <img src={userData?.avatar} className="profile__avatar" alt="аватар пользователя"/>
        </div>
        <div className="profile__info"> 
          <div className="profile__name-and-edit">
            <h1 className="profile__name">{userData?.name}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__occupation">{userData?.about}</p>        
        </div>
        <button type="button" className="profile__add-button" onClick={onAddCard}></button>
      </section>
      <section className="elements">
        {cards.map(cardData => (
            <Card 
              key={cardData._id}
              card={cardData}
              onClickCard={onClickCard}
              onLikeCard={onLikeCard}
              onDeleteCard={onDeleteCard}
            />
          ))
        }
      </section>
    </main>
  )
}

export default Main