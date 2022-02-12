import React, { FC, SetStateAction } from 'react';
import style from './Popup.module.scss';
import { Link } from 'react-router-dom';
import { IPopupValues } from '../../../types/types';

interface IProps {
  isHide: boolean;
  options: IPopupValues[];
  setIsHide: React.Dispatch<SetStateAction<boolean>>;
}

const Popup: FC<IProps> = React.memo(({ isHide, setIsHide, options }) => {
  window.addEventListener('click', () => {
    setIsHide(true);
  });
  return (
    <div
      className={`${style.popup__wrapper} ${isHide ? style.popup_hide : null}`}
      onClick={() => setIsHide(true)}
    >
      <div className={style.popup}>
        {options.map((option) => (
          <Link
            key={option.label}
            onClick={option.onClick}
            className={style.popup__link}
            to={`/${option.link}`}
          >
            {option.label}
          </Link>
        ))}
      </div>
    </div>
  );
});

export default Popup;
