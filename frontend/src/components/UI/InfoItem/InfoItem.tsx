import React, { FC } from 'react';
import style from './InfoItem.module.scss';

interface IProps {
  name: string;
  referral?: string;
  onClick?: () => void;
  isReferral?: boolean;
  isEdit: boolean;
  isAdd?: boolean;
  isButton?: boolean;
  isChecked?: string;
}

const InfoItem: FC<IProps> = React.memo(
  ({
    onClick,
    name,
    referral,
    isEdit,
    isAdd,
    isButton,
    isChecked,
    isReferral = false,
  }) => {
    // console.log(name, isChecked);
    return (
      <div onClick={onClick} className={style.info__wrapper}>
        {isButton ? (
          <button
            className={`${style.info__item} ${
              isChecked === name ? style.info__item_checked : null
            }`}
          >
            {isAdd ? <div className={style.info__item_add} /> : null}
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
              src={`./assets/icon/${name}.svg`}
              alt={name}
            />
          </a>
        )}
      </div>
    );
  },
);

export default InfoItem;
