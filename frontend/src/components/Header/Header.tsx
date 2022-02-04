import React, { FC, useState } from 'react';
import style from './Header.module.scss';
import sprite from '../../assets/sprite.svg';
import { Link } from 'react-router-dom';

interface IProps {
  navigation?: string[];
}

const Header: FC<IProps> = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeBurger = (e: React.MouseEvent<HTMLElement>) => {
    if (
      e.target.constructor.name === 'HTMLAnchorElement' ||
      e.target.constructor.name === 'SVGSVGElement' ||
      e.target.constructor.name === 'SVGUseElement'
    ) {
      setIsOpen(false);
    }
  };
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
