import React, { FC } from 'react';
import style from './NavBar.module.scss';
import uniqid from 'uniqid';

interface IProps {
  navBars: string[][];
  icon?: string;
}

const NavBar: FC<IProps> = React.memo(({ navBars, icon }) => {
  return (
    <div className={style.nav__wrapper}>
      {navBars.map((options) => (
        <div key={uniqid()} className={style.nav}>
          {options.map((option, index) => (
            <span className={style.nav__text} key={index}>
              {option}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
});

export default NavBar;
