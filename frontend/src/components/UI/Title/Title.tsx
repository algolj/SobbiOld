import React, { FC } from 'react';
import style from './Title.module.scss';
interface IProps {
  color?: string;
  children?: React.ReactChild;
}

const Title: FC<IProps> = React.memo(({ color, children }) => {
  return (
    <span className={style.title} style={{ color: color }}>
      {children}
    </span>
  );
});

export default Title;
