import React, { FC, useState } from 'react';
import style from './Header.module.scss';
import sprite from '../../assets/sprite.svg';
import { Link } from 'react-router-dom';
import Modal from '../UI/Modal/Modal';
import FormInput from '../../pages/inputs/FormInput/FormInput';
import Button from '../UI/Button/Button';
import { UseTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';

const Header: FC = () => {
  const { user, error } = UseTypeSelector((state) => state.user);
  const { createUser, loginUser } = useActions();
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const closeBurger = (e: React.MouseEvent<HTMLElement>) => {
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
      <Modal
        setVisibility={setIsVisible}
        visibility={isVisible}
        title={'Log In'}
      >
        <div className={style.form}>
          <FormInput
            value={userName}
            onChange={setUserName}
            label={'User Name'}
          />
          {isRegistration ? (
            <FormInput
              value={userEmail}
              onChange={setUserEmail}
              label={'E-mail'}
              type={'email'}
            />
          ) : (
            <span onClick={() => setIsRegistration(true)}>Register</span>
          )}
          <FormInput
            value={userPassword}
            onChange={setUserPassword}
            label={'Password'}
            type={'password'}
          />

          <div className={style.form__button}>
            <Button
              onClick={() => {
                if (isRegistration) {
                  createUser({
                    username: userName,
                    email: userEmail,
                    password: userPassword,
                  });
                } else {
                  loginUser({
                    login: userName,
                    password: userPassword,
                  });
                }
                setIsVisible(false);
              }}
            >
              {isRegistration ? 'Register' : 'Login'}
            </Button>
          </div>
        </div>
      </Modal>
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
        </nav>
      </div>
    </div>
  );
};

export default Header;
