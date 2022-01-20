import React, { FC } from 'react';
import s from './Title.module.scss';
interface IProps {
  color: string;
  children: React.ReactChild;
}

const Title: FC<IProps> = ({ color, children }) => {
  return (
    <span className={s.title} style={{ color: color }}>
      {children}
    </span>
  );
};

export default Title;
