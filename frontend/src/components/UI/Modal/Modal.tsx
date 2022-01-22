import React, { FC, useState } from 'react';
import style from './Modal.module.scss';

interface IProps {
  children: React.ReactChild;
  visibility: boolean;
}

const Modal: FC<IProps> = ({ children, visibility }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  if (visibility) setIsVisible(true);
  return (
    <div
      onClick={() => setIsVisible(false)}
      className={
        isVisible
          ? `${style.modal__bg}${style.modal__bg_active}`
          : style.modal__bg
      }
    >
      <div className={style.modal}>{children}</div>
    </div>
  );
};

export default Modal;
