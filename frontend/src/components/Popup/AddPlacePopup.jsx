import PopupWithForm from './PopupWithForm'
import { useEffect } from 'react'
import useFormValidation from '../../hooks/useFormValidation'
import Input from '../Input'

function AddPlacePopup ({ isOpen, onClose, onAddPlace, isLoading }) {

  const {values, errors, isValid, handleChange, resetForm }  = useFormValidation()
  const {name, link} = values

  useEffect(() => {
    resetForm()
  }, [resetForm, isOpen]); 

  function handleSubmit() {
    onAddPlace({ name, link });
  }

  return (  
    <PopupWithForm 
      name='newplace'   
      title='New place adding'
      buttonText={isLoading ? 'Adding...' : 'Add'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <Input
        type={'text'}
        name={'name'}
        placeHolder={'New place name'}
        inputClassName={`popup__field ${errors.name && 'popup__field_type_error'}`}
        required={true}
        minLength={'2'}
        maxLength={'30'}
        value={name}
        onChange={handleChange}
        spanClassName={'popup__error'}
      />
      <span className={`popup__error ${errors.name && `popup__error_visible`}`}>{errors.name}</span>
      <Input
        type={'url'}
        name={'link'}
        placeHolder={'Image link'}
        inputClassName={`popup__field ${errors.link && 'popup__field_type_error'}`}
        required={true}
        minLength={''}
        maxLength={''}
        value={link}
        onChange={handleChange}
        spanClassName={'popup__error'}
      />
      <span className={`popup__error ${errors.link && `popup__error_visible`}`}>{errors.link}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup