import PopupWithForm from './PopupWithForm'
import Input from '../Input'
import { useEffect, useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import useFormValidation from '../../hooks/useFormValidation'

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, isLoading }) {
  
  const { values, setValues, errors, isValid, handleChange, resetForm } = useFormValidation()
  const {name, about} = values
  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    resetForm()
    setValues({name: currentUser.name, about: currentUser.about })
  }, [currentUser, setValues, resetForm, isOpen]); 

  function handleSubmit() {
    onUpdateUser({ name, about });
  } 
  
  return (  
    <PopupWithForm 
      name='profile'
      title='Profile edit'
      buttonText={isLoading ? 'Saving...' : 'Save'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <Input
        type={'text'}
        name={'name'}
        placeHolder={'Your name'}
        inputClassName={`popup__field ${errors.name && 'popup__field_type_error'}`}
        required={true}
        minLength={'2'}
        maxLength={'40'}
        value={name}
        onChange={handleChange}
      />
      <span className={`popup__error ${errors.name && `popup__error_visible`}`}>{errors.name}</span>
      <Input
        type={'text'}
        name={'about'}
        placeHolder={'About you'}
        inputClassName={`popup__field ${errors.about && 'popup__field_type_error'}`}
        required={true}
        minLength={'2'}
        maxLength={'200'}
        value={about}
        onChange={handleChange}
      />
      <span className={`popup__error ${errors.about && `popup__error_visible`}`}>{errors.about}</span>
    </PopupWithForm>
  )
} 

export default EditProfilePopup