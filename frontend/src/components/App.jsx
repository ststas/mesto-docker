import api from '../utils/api'
// import * as auth from '../utils/auth'
import auth from '../utils/auth'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './Popup/EditProfilePopup'
import EditAvatarPopup from './Popup/EditAvatarPopup'
import AddPlacePopup from './Popup/AddPlacePopup'
import DeleteCardPopup from './Popup/DeleteCardPopup'
import ImagePopup from './Popup/ImagePopup'
import Login from "./Login"
import Register from "./Register"
import InfoTooltip from "./Popup/InfoTooltip"
import ProtectedRoute from "./ProtectedRoute"
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useState, useEffect, useCallback } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'

function App() {
//устанавливаем стейты и определяем константы
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardToDelete, setCardToDelete] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogSuccessful, setIsLogSuccessful] = useState(null)
  const [userEmail, setUserEmail] = useState('')
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const navigate = useNavigate()

//ФУНКЦИИ ОТКРЫТИЯ ПОПАПОВ
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleAddNewPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleDeleteNewPlaceClick(card) {
    setCardToDelete(card)
    setIsDeleteCardPopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }
  function openInfoToolTip() {
    setIsInfoPopupOpen(true)
  }
  
  function userSignOut() {
    setIsLoggedIn(false)
    setUserEmail('')
    navigate('/signin', {replace: true})
    setIsBurgerOpen(false)
  };

  function userSignIn(data) {
    setUserEmail(data)
    setIsLoggedIn(true)
    navigate('/', {replace: true})
  };

//ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ
//обработчик стейтов попапов
  const setAllPopupsStates = useCallback(()=> {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsInfoPopupOpen(false)
    setSelectedCard(null)
    setCardToDelete(null)
}, [])
//функция вызова обработчика стейтов попапов
  const closeAllPopups = useCallback(() => { 
    setAllPopupsStates() 
  },[setAllPopupsStates])

// функция лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((updatedCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? updatedCard : currentCard))
      })
      .catch(err => console.error(`Ошибка добавления/удаления лайка карточки: ${err}`)) 
  }

  // универсальная функция сабмита
  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }  
// функция удаления карточки
  function handleDeleteCard(card) {
    function makeRequest() {
      return api.removeCard(card._id).then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id))})
    }
    handleSubmit(makeRequest)
  }
// функция обновления данных профиля
  function handleUpdateUser(userData) {
    function makeRequest() {
      return api.setUserInfo(userData).then((updatedUserData) => {setCurrentUser(updatedUserData)})
    }
    handleSubmit(makeRequest)
  }  
// функция обновления аватара
  function handleUpdateAvatar(userData) {
    function makeRequest() {
      return api.setUserAvatar(userData).then((updatedUserData) => {setCurrentUser(updatedUserData)})
    }
    handleSubmit(makeRequest)
  }
// функция создания новой карточки
  function handleAddPlaceSubmit (cardData) {
    function makeRequest() {
      return api.addCard(cardData).then((newCard) => {setCards([newCard, ...cards])})
    }
    handleSubmit(makeRequest)
  }

// функция обработки клика по "бургеру"
  function handleBurgerClick() {
    isBurgerOpen ? setIsBurgerOpen(false) : setIsBurgerOpen(true)
  }  
// загрузка данных с сервера
  useEffect(() => { 
    if (isLoggedIn) {
      setIsFetching(true)
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData)
        setIsFetching(false)
      })
      .catch(err => console.error(`Ошибка загрузки данных с сервера: ${err}`))
  }},[isLoggedIn])
// функция регистрации нового пользователя
  function handleRegister(email, password, resetForm) {
    setIsLoading(true)
    auth.register(email, password)
    .then(() => {
      setIsLogSuccessful(true)
      navigate('/signin', {replace: true})
      resetForm()
    })
    .catch(err => {console.error(`Ошибка регистрации пользователя: ${err}`)})
    .finally(() => {
      openInfoToolTip()
      setIsLoading(false)
    })
  }
// функция авторизации
  function handleLogin (email, password, resetForm) {
    setIsLoading(true)
    auth.authorize(email, password)
    .then((res) => {
      userSignIn(email)
      resetForm()
    })
    .catch(err => {
      setIsLogSuccessful(false)
      openInfoToolTip()
      console.error(`Ошибка авторизации пользователя: ${err}`)
    })
    .finally(() => {setIsLoading(false)})
  }
// функция выхода из профиля
  function handleSignOut () {
    auth.logout()
    .catch(err => {console.error(`Ошибка выхода: ${err}`)})
    .finally(()=> {
      userSignOut()})
  }
// функции проверки наличия токена  
  function  handleTokenCheck() {
    auth.checkToken()
    .then((res) => userSignIn(res.email))
    .catch(err => {
      userSignOut()
      console.error(`Ошибка авторизации пользователя: ${err}`)
    })
  };
  useEffect(() => {
    handleTokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
// возвращаем разметку
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`page ${isBurgerOpen ? 'page_clicked': '' }`}>

        <Header 
          isLoggedIn={isLoggedIn} 
          onSignOut={handleSignOut} 
          userEmail={userEmail}
          isBurgerOpen={isBurgerOpen}
          onBurgerClick={handleBurgerClick}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute 
                element={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddCard={handleAddNewPlaceClick}
                onDeleteCard={handleDeleteNewPlaceClick}
                onClickCard={handleCardClick}
                onLikeCard={handleCardLike}
                cards={cards}
                isFetching={isFetching}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route 
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                isLoading={isLoading}
              />
            }
          />
          <Route 
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />
            }
          />
        </Routes>

        {isLoggedIn && <Footer/>}
        
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
  
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          cardToDelete={cardToDelete}
          isLoading={isLoading}
        />
        
        <ImagePopup
          name='picture'
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name='info-tooltip'
          isOpen={isInfoPopupOpen}
          onClose={closeAllPopups}
          isLogSuccessful={isLogSuccessful}
        />

      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
