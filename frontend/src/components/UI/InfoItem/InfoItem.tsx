import React, { FC } from 'react';
import style from './InfoItem.module.scss';

interface IProps {
  name: string;
  referral: string;
}

const InfoItem: FC<IProps> = ({ name, referral }) => {
  return (
    <div className={style.info__wrapper}>
      <a
        target={'_blank'}
        href={referral}
        className={
          referral ? style.info__item : `${style.info__item} ${style.info__item_disable}`
        }
      >
        <img
          draggable={false}
          className={style.info__image}
          src={`./assets/icon/${name}`}
          alt={name}
        />
      </a>
    </div>
  );
};

export default InfoItem;
