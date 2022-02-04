import React, { FC, useState } from 'react';
import style from './Modal.module.scss';

interface IProps {
  children?: React.ReactChild;
  visibility: boolean;
  title: string;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<IProps> = React.memo(
  ({ children, visibility, setVisibility, title }) => {
    return (
      <div
        id={'bg'}
        onMouseDown={() => setVisibility(false)}
        className={
          visibility
            ? `${style.modal__bg} ${style.modal__bg_active}`
            : style.modal__bg
        }
      >
        <div className={style.modal} onMouseDown={(e) => e.stopPropagation()}>
          <div className={style.modal__title}>{title}</div>
          {children}
        </div>
      </div>
    );
  },
);

export default Modal;
