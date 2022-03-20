import React, { FC, useEffect, useState } from 'react';
import style from './Chat.module.scss';
import SearchInput from '../UI/inputs/SearchInput/SearchInput';
import { connectSocket } from '../../socket';
import Message from '../Message/Message';
import uniqid from 'uniqid';
import { IMessage } from '../../types/roomTypes';
import { useTypeSelector } from '../../hooks/useTypeSelector';

interface IProps {
  isHide: boolean;
}

const Chat: FC<IProps> = React.memo(({ isHide }) => {
  const {
    user: { username },
  } = useTypeSelector((state) => state.user);

  const [message, setMessage] = useState<string>('');
  const [messageArray, setMessageArray] = useState<IMessage[]>([]);

  const onSubmit = () => {
    connectSocket.emit('message-all', {
      message: message,
    });
  };

  connectSocket.on('message-all', (messageObject: any) => {
    const isReceived = messageObject.name === username;
    console.log(messageObject);
    console.log(messageArray);
    messageArray.push({
      isReceived: isReceived,
      message: messageObject.message,
    });
  });

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
          <Message
            key={uniqid()}
            message={userMessage.message}
            isReceiving={userMessage.isReceived}
          />
        ))}
      </div>
      <SearchInput
        placeholder={'Write a message...'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={onSubmit}
      />
    </div>
  );
});
export default Chat;
