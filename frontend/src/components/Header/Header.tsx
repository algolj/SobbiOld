import React, { FC, useState } from 'react';
import s from './Header.module.scss';
import sprite from '../../assets/sprite.svg';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={s.header}>
      <Link to={''}>
        <svg className={s.header__logo}>
          <use href={`${sprite}#logo`} />
        </svg>
      </Link>
      <div className={s.burger}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={
            isOpen
              ? `${s.burger__rectangle} ${s.burger__rectangle_active}`
              : s.burger__rectangle
          }
        >
          <span className={s.burger__line} />
        </button>
      </div>
      <div
        className={
          isOpen
            ? `${s.header__wrapper} ${s.header__wrapper_active}`
            : s.header__wrapper
        }
      >
        <nav className={s.header__nav}>
          <Link className={s.header__link} to={''}>
            Tasks
          </Link>
          <Link className={s.header__link} to={''}>
            People
          </Link>
          <Link className={s.header__link} to={''}>
            Rating
          </Link>
          <Link to={'/user'}>
            <svg className={s.header__login}>
              <use href={`${sprite}#logIn`} />
            </svg>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
