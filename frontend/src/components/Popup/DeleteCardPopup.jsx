import PopupWithForm from './PopupWithForm'

function DeleteCardPopup ({ isOpen, onClose, onDeleteCard, cardToDelete, isLoading }) {

  function handleSubmit() {
    onDeleteCard(cardToDelete)
  }

  return (  
    <PopupWithForm 
      name='newplace-delete'
      title='Are you sure?'
      buttonText={isLoading ? 'Deleting...' : 'Delete'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      cardToDelete={cardToDelete}
      isValid='true'
    />
  )
}

export default DeleteCardPopup