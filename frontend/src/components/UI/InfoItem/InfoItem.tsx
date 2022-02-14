import React, { FC } from 'react';
import style from './InfoItem.module.scss';
import { useTypeSelector } from '../../../hooks/useTypeSelector';

interface IProps {
  name: string;
  referral?: string;
  onClick?: () => void;
  onRemove?: (event?: React.MouseEvent<HTMLElement>) => void;
  isReferral?: boolean;
  isAdd?: boolean;
  isButton?: boolean;
  checked?: string;
  isClickable?: boolean;
}

const InfoItem: FC<IProps> = React.memo(
  ({
    onClick,
    name,
    referral,
    isAdd,
    isButton,
    checked,
    isReferral = false,
    onRemove,
    isClickable = true,
  }) => {
    const { isEdit } = useTypeSelector((state) => state.user);
    return (
      <div onClick={onClick} className={style.info__wrapper}>
        {isButton ? (
          <div
            className={`${style.info__item} ${
              checked === name ? style.info__item_checked : null
            }`}
          >
            {isAdd ? <div className={style.info__item_add} /> : null}
            <img
              draggable={false}
              className={style.info__image}
              src={`./assets/icon/${name}.svg`}
              alt={name}
            />
          </div>
        ) : (
          <div
            className={`${style.info__item} ${
              isClickable ? null : style.info__item_disable
            }`}
          >
            {referral && isEdit ? (
              <div onClick={onRemove} className={style.info__item_remove} />
            ) : null}
            <a
              target={'_blank'}
              href={referral}
              className={`${style.info__item_ref} ${
                referral && !isEdit ? null : style.info__item_disable
              }`}
            >
              <img
                draggable={false}
                className={style.info__image}
                src={`./assets/icon/${name}.svg`}
                alt={name}
              />
            </a>
          </div>
        )}
      </div>
    );
  },
);

export default InfoItem;
