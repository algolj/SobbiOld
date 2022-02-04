import React, { FC } from 'react';
import style from './Button.module.scss';

interface IProps {
  children?: React.ReactChild;
  onClick?: () => void;
  active?: boolean;
  props?: any;

  [key: string]: any;
}

const Button: FC<IProps> = ({ children, onClick, active, ...props }) => {
  return (
    <button
      {...props}
      className={
        active ? `${style.button} ${style.button_active}` : style.button
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
