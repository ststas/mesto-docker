import { useState, useCallback } from 'react'

function useFormValidation () {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  
  function handleChange(event) {
    const {name, value} = event.target
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(event.target.form.checkValidity());}

  const resetForm = useCallback (
    () => {
      setValues({});
      setErrors({});
      setIsValid(false);
    }, [setValues, setErrors, setIsValid]);

  return { values, setValues, errors, isValid, handleChange, resetForm }
}

export default useFormValidation