import React, { FC, useState } from 'react';
import style from './Header.module.scss';
import sprite from '../../assets/sprite.svg';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import { IconTarget, IPopupValues } from '../../types/types';
import { Link } from 'react-router-dom';
import LoginAvatar from '../LoginAvatar/LoginAvatar';
import Popup from '../UI/Popup/Popup';
import { useActions } from '../../hooks/useActions';

const Header: FC = React.memo(() => {
  const { logoutUser } = useActions();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const popupOptions: IPopupValues[] = [
    {
      label: 'Profile',
      link: 'user',
    },
    {
      label: 'Logout',
      link: '',
      onClick: logoutUser,
    },
  ];
  const closeBurger = (e: React.MouseEvent<HTMLElement>) => {
    const role = e.target.constructor.name;
    if (
      role === IconTarget.Anchor ||
      role === IconTarget.Svg ||
      role === IconTarget.SvgUse
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
          <div
            style={{ position: 'relative' }}
            className={style.header__avatar}
          >
            <LoginAvatar
              setIsVisible={setIsVisible}
              onClick={() => setIsPopup(!isPopup)}
            />
            <Popup
              options={popupOptions}
              isHide={isPopup}
              setIsHide={setIsPopup}
            />
          </div>
        </nav>
      </div>
    </div>
  );
});

export default Header;
