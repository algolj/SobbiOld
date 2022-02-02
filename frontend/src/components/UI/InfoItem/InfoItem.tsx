import React, { FC, useState } from 'react';
import style from './InfoItem.module.scss';

interface IProps {
  name: string;
  referral?: string;
  onClick?: () => void;
  isEdit: boolean;
  isAdd?: boolean;
  isSelect?: boolean;
}

const InfoItem: FC<IProps> = ({
  onClick,
  name,
  referral,
  isEdit,
  isAdd,
  isSelect = false,
}) => {
  return (
    <div onClick={onClick} className={style.info__wrapper}>
      {isAdd ? (
        <button className={style.info__item}>
          {isAdd || isEdit ? <div className={style.info__item_add} /> : null}
          <img
            draggable={false}
            className={style.info__image}
            src={'./assets/icon/github.svg'}
            alt={name}
          />
        </button>
      ) : (
        <a
          target={'_blank'}
          href={referral}
          className={
            referral
              ? style.info__item
              : `${style.info__item} ${style.info__item_disable}`
          }
        >
          {referral && isEdit ? (
            <div className={style.info__item_remove} />
          ) : null}
          <img
            draggable={false}
            className={style.info__image}
            src={`./assets/icon/${name}`}
            alt={name}
          />
        </a>
      )}
    </div>
  );
};

export default InfoItem;
