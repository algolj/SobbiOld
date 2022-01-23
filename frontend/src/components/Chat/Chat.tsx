import React, { FC } from 'react';
import style from './Chat.module.scss';
import SearchInput from '../../pages/inputs/SearchInput/SearchInput';
import sprite from '../../assets/sprite.svg';
import Message from '../Message/Message';
interface IProps {
  isHide: boolean;
}
const Chat: FC<IProps> = ({ isHide }) => {
  return (
    <div className={isHide ? style.chat : style.chat_hide}>
      <div className={style.chat__messages}>
        <Message isReceiving={false} />
        <Message isReceiving={true} />
      </div>
      <SearchInput />
    </div>
  );
};
export default Chat;
