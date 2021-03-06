import React, { FC } from 'react';
import style from './Chat.module.scss';
import SearchInput from '../UI/inputs/SearchInput/SearchInput';
import Message from '../Message/Message';

interface IProps {
  isHide: boolean;
}

const Chat: FC<IProps> = React.memo(({ isHide }) => {
  return (
    <div className={isHide ? style.chat : `${style.chat_hide} ${style.chat}`}>
      <div className={style.chat__messages}>
        <Message isReceiving={false} />
        <Message isReceiving={false} />
        <Message isReceiving={false} />
        <Message isReceiving={false} />
        <Message isReceiving={false} />
        <Message isReceiving={true} />
        <Message isReceiving={true} />
        <Message isReceiving={true} />
        <Message isReceiving={true} />
        <Message isReceiving={true} />
        <Message isReceiving={true} />
      </div>
      <SearchInput />
    </div>
  );
});
export default Chat;
