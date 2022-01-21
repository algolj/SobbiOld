import React, { FC, useState } from 'react';
import style from './Header.module.scss';
import sprite from '../../assets/sprite.svg';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={style.header}>
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
        <nav className={style.header__nav}>
          <Link className={style.header__link} to={''}>
            Tasks
          </Link>
          <Link className={style.header__link} to={''}>
            People
          </Link>
          <Link className={style.header__link} to={''}>
            Rating
          </Link>
          <Link to={'/user'}>
            <svg className={style.header__login}>
              <use href={`${sprite}#logIn`} />
            </svg>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
