import useFormValidation from '../hooks/useFormValidation'
import Form from './Form'
import Input from './Input'
import { Link } from "react-router-dom";

function Register ({ onRegister, isLoading }){

  const { values, errors, isValid, handleChange, resetForm }  = useFormValidation()
  const { email, password } = values
  
  function handleSubmit() {
    onRegister(email, password, resetForm)
  }
  
  return (
    <div className="auth">
      <h2 className="auth__title">Sign up</h2>
      <Form 
        name={'login'} 
        formClassName={'auth__form'}
        onSubmit={handleSubmit}
        submitButtonClassName={`auth__submit-button ${!isValid && 'auth__submit-button_disabled'}`}
        buttonText={`${isLoading ? 'Signing up...' : 'Sign up'}`} 
      >
        <Input 
          type={'email'}
          name={'email'}
          placeHolder={'Email'}
          inputClassName={'auth__field'}
          required={true}
          minLength={''}
          maxLength={''}
          value={email}
          onChange={handleChange}
        />
        <span className={`auth__error ${errors.email && `auth__error_visible`}`}>{errors.email}</span>
        <Input 
          type={'password'}
          name={'password'}
          placeHolder={'Password'}
          inputClassName={'auth__field'}
          required={true}
          minLength={8}
          maxLength={''}
          value={password}
          onChange={handleChange}
        />
        <span className={`auth__error ${errors.password && `auth__error_visible`}`}>{errors.password}</span>
        <Link to="/signin" className="auth__link">Already signed up? Sign in here</Link>
      </Form>  
    </div>
  )
}
export default Register