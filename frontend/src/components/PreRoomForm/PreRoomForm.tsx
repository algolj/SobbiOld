import React, { FC, SetStateAction, useEffect, useState } from 'react';
import style from '../../pages/PreRoom/PreRoom.module.scss';
import UserForm from '../UserForm/UserForm';
import FormInput from '../UI/inputs/FormInput/FormInput';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IRoomForm } from '../../types/roomTypes';
import AddUserRoom from '../AddUserRoom/AddUserRoom';

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
      <AddUserRoom />
    </div>
  );
});

export default PreRoomForm;
