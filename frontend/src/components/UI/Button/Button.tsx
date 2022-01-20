import React, { FC } from 'react';
import s from './Button.module.scss';

interface IProps {
  children?: React.ReactChild;
  onClick?: () => void;
  padding: string;
}

const Button: FC<IProps> = ({ padding, children, onClick }) => {
  return (
    // <div style={{ padding: padding }} className={s.button__wrapper}>
    //   <button className={s.button} onClick={onClick} />
    //   <span className={s.button__text}>{children}</span>
    //   <div className={s.button__rectangle} />
    // </div>
    <button style={{ padding: padding }} className={s.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
