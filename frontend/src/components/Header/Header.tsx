import React, { FC, useEffect, useState } from 'react';
import style from './Header.module.scss';
import sprite from '../../assets/sprite.svg';
import { Link } from 'react-router-dom';
import { UseTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import RegistrationModal from '../RegistrationModal/RegistrationModal';

const Header: FC = () => {
  const { isAuth } = UseTypeSelector((state) => state.user);
  const { createUser, loginUser, checkAuth } = useActions();
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const closeBurger = (e: React.MouseEvent<HTMLElement>) => {
    //Formik
    const role = e.target.constructor.name;
    if (
      role === 'HTMLAnchorElement' ||
      role === 'SVGSVGElement' ||
      role === 'SVGUseElement'
    ) {
      setIsOpen(false);
    }
  };

  return (
    <div className={style.header}>
      <RegistrationModal isVisible={isVisible} setIsVisible={setIsVisible} />
      <Link to={''}>
        <svg className={style.header__logo}>
          <use href={`${sprite}#logo`} />
        </svg>
      </Link>
      <div className={style.burger}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={
            isOpen
              ? `${style.burger__rectangle} ${style.burger__rectangle_active}`
              : style.burger__rectangle
          }
        >
          <span className={style.burger__line} />
        </button>
      </div>
      <div
        className={
          isOpen
            ? `${style.header__wrapper} ${style.header__wrapper_active}`
            : style.header__wrapper
        }
      >
        <nav onClick={(e) => closeBurger(e)} className={style.header__nav}>
          <Link className={style.header__link} to={'/room'}>
            Tasks
          </Link>
          <Link className={style.header__link} to={''}>
            People
          </Link>
          <Link className={style.header__link} to={''}>
            Rating
          </Link>
          {isAuth ? (
            <Link
              style={{ background: 'red', width: '30px', height: '30px' }}
              to={'/user'}
            />
          ) : (
            <button
              onClick={() => setIsVisible(true)}
              className={style.header__login_wrapper}
            >
              <svg className={style.header__login}>
                <use href={`${sprite}#logIn`} />
              </svg>
              <img
                className={style.header__login_hover}
                src={'./assets/icon/loginText.svg'}
                alt="login text"
              />
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
