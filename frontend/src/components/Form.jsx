function Form ({name, formClassName, onSubmit, buttonText, submitButtonClassName, children}) {

  function handleSubmit (event) {
    event.preventDefault()
    onSubmit()
  }
  
  return (
    <form name={name} className={formClassName} noValidate="" onSubmit={handleSubmit}>
      {children}
      <button type="submit" className={submitButtonClassName}>
        {buttonText}
      </button> 
    </form>
  )
}

export default Form