import React, { FC, useEffect, useState } from 'react';
import style from './Chat.module.scss';
import SearchInput from '../UI/inputs/SearchInput/SearchInput';
import { connectSocket } from '../../socket';
import Message from '../Message/Message';
import uniqid from 'uniqid';

interface IProps {
  isHide: boolean;
}

const Chat: FC<IProps> = React.memo(({ isHide }) => {
  const [message, setMessage] = useState<string>('');
  const [messageArray, setMessageArray] = useState<string[]>([]);

  const onSubmit = () => {
    setMessageArray([...messageArray, message]);
    connectSocket.emit('message-all', {
      message: message,
    });
  };
  console.log(connectSocket);
  useEffect(() => {
    connectSocket.emit('joinRooms');
    connectSocket.connect();
  }, []);

  return (
    <div
      onClick={() => {}}
      className={isHide ? style.chat : `${style.chat_hide} ${style.chat}`}
    >
      <div className={style.chat__messages}>
        {messageArray.map((userMessage) => (
          <Message key={uniqid()} message={message} isReceiving={false} />
        ))}
      </div>
      <SearchInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={onSubmit}
      />
    </div>
  );
});
export default Chat;
