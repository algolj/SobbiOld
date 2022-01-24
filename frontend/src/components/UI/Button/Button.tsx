import React, { FC } from 'react';
import style from './Button.module.scss';

interface IProps {
  children?: React.ReactChild;
  onClick?: () => void;
  props?: any;

  [key: string]: any;
}

const Button: FC<IProps> = ({ children, onClick, ...props }) => {
  return (
    <button {...props} className={style.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
