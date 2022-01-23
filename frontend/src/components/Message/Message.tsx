import React, { FC } from 'react';
import style from './Message.module.scss';

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
          style={
            isReceiving
              ? { backgroundImage: 'url("./assets/icon/messageReceived.svg")' }
              : { backgroundImage: 'url("./assets/icon/message.svg")' }
          }
          className={style.message__wrapper}
        >
          <span className={style.message__text}>Hello, my Viola</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
