import React, { FC } from 'react';
import s from './Button.module.scss';

interface IProps {
  children?: React.ReactChild;
  onClick?: () => void;
  width: string;
  height: string;
}

const Button: FC<IProps> = ({ width, height, children, onClick }) => {
  return (
    <button
      style={{ width: width, height: height }}
      className={s.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
