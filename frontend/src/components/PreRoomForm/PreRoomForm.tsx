import React, { FC, SetStateAction, useState } from 'react';
import style from '../../pages/PreRoom/PreRoom.module.scss';
import UserForm from '../UserForm/UserForm';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { IRoomForm } from '../../types/roomTypes';
import AddUserRoom from '../AddUserRoom/AddUserRoom';
import RoomUserList from '../RoomUserList/RoomUserList';

interface IProps {
  setRoomInfo: React.Dispatch<SetStateAction<IRoomForm>>;
}

const PreRoomForm: FC<IProps> = React.memo(({ setRoomInfo }) => {
  const {
    room: { date, name, role },
  } = useTypeSelector((state) => state.room);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [roomDate, setRoomDate] = useState<string>(date);
  const [roomUserName, setRoomUserName] = useState<string>('');
  setRoomInfo({
    formDate: roomDate,
    formUserName: roomUserName,
  });
  return (
    <div>
      <div className={style.preroom__name}>
        <span className={style.preroom__name_text}>YOUR NAME:</span>
        <input
          value={roomUserName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRoomUserName(e.target.value)
          }
          type="text"
          placeholder={'WRITE YOUR NAME'}
          className={style.preroom__name_input}
        />
      </div>
      <div className={style.preroom__role}>
        <UserForm value={role} label={'Role'} ableToChange={false} />
      </div>
      <UserForm value={name} label={'Room name'} ableToChange={false} />
      <UserForm
        value={roomDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRoomDate(e.target.value)
        }
        label={'Date'}
        type={'date'}
      />
      <RoomUserList />
      <AddUserRoom isVisible={isVisible} setIsVisible={setIsVisible} />
    </div>
  );
});

export default PreRoomForm;
