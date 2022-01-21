import React, { FC } from 'react';
import s from './InfoItem.module.scss';

interface IProps {
  name: string;
  referral: string;
}

const InfoItem: FC<IProps> = ({ name, referral }) => {
  return (
    <div className={s.info__wrapper}>
      <a
        target={'_blank'}
        href={referral}
        className={
          referral ? s.info__item : `${s.info__item} ${s.info__item_disable}`
        }
      >
        <img
          draggable={false}
          className={s.info__image}
          src={`./assets/icon/${name}`}
          alt={name}
        />
      </a>
    </div>
  );
};

export default InfoItem;
