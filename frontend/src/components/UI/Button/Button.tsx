import React, { FC } from 'react';
import s from './Button.module.scss';

interface IProps {
  children?: React.ReactChild;
  onClick?: () => void;
}

const Button: FC<IProps> = ({ children, onClick }) => {
  return (
    <button className={s.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
