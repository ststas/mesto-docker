import axios from 'axios';
export const baseURL = 'https://ststas.dev/mesto/api';

const axiosBase = axios.create({
  baseURL,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
})

class Api {
// функция обработки ошибок  
  _processError(error) {
    if (error.response) {
      return Promise.reject(new Error(`Status: ${error.response.status}. Data ${error.response.data}`))
    } else if (error.request) {
      return Promise.reject(new Error(error.request))
    } else {
      console.log('Error', error.message);
      return Promise.reject(new Error(error.message))
    }
  }

// функция получения информации пользователя
  getUserInfo() {
    return axiosBase.get('users/me')
      .then(res => res.data)
      .catch(error => this._processError(error));
  }

// функция установки новой информации пользователя  
  setUserInfo(userData) {
    return axiosBase.patch(`users/me`, userData)
      .then(res => res.data)
      .catch(error => this._processError(error));
  }

// функция установки нового аватара пользователя
  setUserAvatar(userData) {
    return axiosBase.patch(`users/me/avatar`, userData)
      .then(res => res.data)
      .catch(error => this._processError(error));
  }

// функция получения информации о карточках
  getInitialCards() {
    return axiosBase.get(`cards`)
      .then(res => res.data)
      .catch(error => this._processError(error));
  }
// функция добавления новой карточки
  addCard(cardData) {
    return axiosBase.post(`cards`, cardData)
      .then(res => res.data)
      .catch(error => this._processError(error));
  }

// функция удаления карточки
  removeCard(idCard) {
    return axiosBase.delete(`cards/${idCard}`)
      .then(res => res.data)
      .catch(error => this._processError(error));
  }

// функция добавления/удаления лайка карточки
  changeLikeCardStatus(idCard, isLiked) {
    if(isLiked) {
      return axiosBase.delete(`cards/${idCard}/likes`)
        .then(res => res.data)
        .catch(error => this._processError(error));
    } else {
      return axiosBase.put(`cards/${idCard}/likes`)
        .then(res => res.data)
        .catch(error => this._processError(error));
    }
  }
  
}

const api = new Api ()


export default api
