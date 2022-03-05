import React, { FC, SetStateAction, useEffect, useState } from 'react';
import style from './PreRoomForm.module.scss';
import UserForm from '../user/UserForm/UserForm';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { IRoomForm } from '../../types/roomTypes';
import RoomUserList from '../RoomUserList/RoomUserList';

interface IProps {
  setRoomInfo: React.Dispatch<SetStateAction<IRoomForm>>;
}

const PreRoomForm: FC<IProps> = React.memo(({ setRoomInfo }) => {
  const {
    room: { date, name, role },
  } = useTypeSelector((state) => state.room);
  const [roomDate, setRoomDate] = useState<string>(date);
  const [roomUserName, setRoomUserName] = useState<string>('');
  setRoomInfo({
    formDate: roomDate,
    formUserName: roomUserName,
  });
  useEffect(() => {
    if (date) setRoomDate(date);
  });
  return (
    <div className={style.preroom}>
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
      <div className={style.preroom__wrapper}>
        <div className={style.preroom__form}>
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
        </div>
        <RoomUserList />
      </div>
    </div>
  );
});

export default PreRoomForm;
