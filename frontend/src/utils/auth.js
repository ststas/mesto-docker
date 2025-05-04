import axios from 'axios';
const baseURL = 'http://localhost:4000/'

const axiosBase = axios.create({
  baseURL,
  withCredentials: true,
  headers: {'Content-Type': 'application/json'}
})

class Auth {
  // функция обработки ошибок  
  _processError(error) {
    if (error.response) {
      return Promise.reject(new Error(`Статус: ${error.response.status}. Данные ${error.response.data}`))
    }
    if (error.request) {
      return Promise.reject(new Error(error.request))
    } 
    return Promise.reject(new Error(error.message))
    
  }

// функция отправки данных для регистрации пользователя
  register (email, password) {
    return axiosBase.post(`signup`, {email, password})
      .then(res => res.data)
      .catch(error => this._processError(error));
  }

// функция отправки данных для авторизации пользователя
  authorize (email, password) {
    return axiosBase.post(`signin`, {email, password})
      .then(res => res.data)
      .catch(error => this._processError(error));
  }
// функция выхода из аккаунта 
  logout () {
    return axiosBase.delete(`signout`)
      .then(res => res.data)
      .catch(error => this._processError(error));
  }
// функция отправки данных для проверки валидности токена  
  checkToken() {
    return axiosBase.get(`users/me`)
      .then(res => res.data)
      .catch(error => this._processError(error));
  }

}  

const auth = new Auth()

export default auth
