import React, { FC, SetStateAction, useState } from 'react';
import style from './EnterRoom.module.scss';
import Modal from '../UI/Modal/Modal';
import FormInput from '../UI/inputs/FormInput/FormInput';
import Button from '../UI/Button/Button';
import { useActions } from '../../hooks/useActions';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { Link } from 'react-router-dom';

interface IProps {
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
}

const EnterRoom: FC<IProps> = React.memo(({ setIsVisible, isVisible }) => {
  const { enterRoom } = useActions();
  const { isAuthRoom } = useTypeSelector((state) => state.room);
  const [roomName, setRoomName] = useState<string>('');
  const [roomPassword, setRoomPassword] = useState<string>('');
  const onSubmit = async () => {
    await enterRoom({
      room: roomName,
      password: roomPassword,
    });
  };
  return (
    <Modal
      setVisibility={setIsVisible}
      visibility={isVisible}
      title={'Enter room'}
    >
      <div className={style.enter__wrapper}>
        <FormInput
          label={'Room name'}
          value={roomName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRoomName(e.target.value)
          }
        />{' '}
        <FormInput
          label={'Room password'}
          value={roomPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRoomPassword(e.target.value)
          }
        />
        {/*hqhv4q*/}
        <div className={style.enter__button}>
          {isAuthRoom ? (
            <Link to={`/room/${roomName}`}>
              <Button onClick={() => onSubmit()}>Enter</Button>
            </Link>
          ) : (
            <Button onClick={() => onSubmit()}>Enter</Button>
          )}
        </div>
      </div>
    </Modal>
  );
});

export default EnterRoom;
