import { Link, useLocation } from "react-router-dom";

function Header ({ isLoggedIn, onSignOut, userEmail, isBurgerOpen, onBurgerClick }) {
  const location = useLocation();

  const linkPath = (location.pathname === '/signin') ? '/signup' : '/signin';
  const linkText = (location.pathname === '/signin') ? 'Sign up' : 'Sign in';

  return (
    <header className="header">  
        <div className="header__logo"></div>
        {isLoggedIn 
        ? (
          <>
            <div className="header__nav-button-container" onClick={onBurgerClick}>
              <div className={`header__nav-button ${isBurgerOpen ? 'header__nav-button_clicked': '' }`} ></div>
            </div>
            <div className="header__nav">
              <p className="header__nav-email">{userEmail}</p>
              <button className="header__button-logout" onClick={onSignOut}>Sign out</button> 
            </div>
          </>
          ) 
          : (
            <Link to={linkPath} className="header__link">{linkText}</Link> 
          )
        }


    </header>
  )
}

export default Header


