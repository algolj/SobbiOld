import React from 'react';
import style from './Chat.module.scss';
import SearchInput from '../../pages/inputs/SearchInput/SearchInput';
import sprite from '../../assets/sprite.svg';
import Message from '../Message/Message';

const Chat = () => {
  return (
    <div className={style.chat}>
      <div className={style.chat__messages}>
        <Message isReceiving={false} />
        <Message isReceiving={true} />
      </div>
      <SearchInput />
    </div>
  );
};
export default Chat;
