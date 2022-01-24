import React, { FC } from 'react';
import style from './Message.module.scss';
import sprite from '../../assets/sprite.svg';

interface IProps {
  isReceiving: boolean;
}

const Message: FC<IProps> = ({ isReceiving }) => {
  return (
    <div
      className={
        isReceiving
          ? `${style.message} ${style.message_received}`
          : style.message
      }
    >
      <div className={style.message__container}>
        <div
          style={{ backgroundImage: 'url("./assets/icon/logIn.svg")' }}
          className={style.message__avatar}
        />
        <div
          // style={{ backgroundImage: 'url("./assets/icon/messageArrow.svg")' }}
          className={style.message__wrapper}
        >
          <svg className={style.message__arrow}>
            <use href={`${sprite}#messageArrow`} />
          </svg>
          <span className={style.message__text}>
            Hello, my naa my name is my name is Violanaa my name is my name is
            Violanaa my name
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
