import React, { FC } from 'react';
import style from './Button.module.scss';

interface IProps {
  children?: React.ReactChild;
  onClick?: () => void;
  active?: boolean;
  props?: any;
  isRed?: boolean;

  [key: string]: any;
}

const Button: FC<IProps> = React.memo(
  ({ children, onClick, active, isRed, ...props }) => {
    return (
      <button
        {...props}
        className={`${style.button} ${active ? style.button_active : null} ${
          isRed ? style.button_red : null
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  },
);

export default Button;
