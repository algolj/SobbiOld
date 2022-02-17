import React, { FC, useEffect, useState } from 'react';
import style from './PreRoom.module.scss';
import Title from '../../components/UI/Title/Title';
import Button from '../../components/UI/Button/Button';
import { useFormik } from 'formik';
import UserForm from '../../components/UserForm/UserForm';
import * as Yup from 'yup';
import { IRoomForm } from '../../types/roomTypes';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';

const PreRoom: FC = () => {
  const {
    isEditRoom,
    room: { date, name, role },
  } = useTypeSelector((state) => state.room);
  const { setIsEditRoom, getRoomInfo } = useActions();
  useEffect(() => {
    getRoomInfo();
    console.log(date, name, role);
  }, []);
  const [userName, setUserName] = useState<string>('');
  const roomForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      formDate: date,
      formRoomName: name,
      formRole: role,
    },
    validationSchema: Yup.object({
      // login: Yup.string().required('Required'),
    }),
    onSubmit: async (values: IRoomForm) => {
      return;
    },
  });
  const { formRole, formRoomName, formDate } = roomForm.values;

  const changeIsEdit = () => {
    if (isEditRoom) {
      setIsEditRoom(false);
    } else {
      console.log(true);
      setIsEditRoom(true);
    }
  };
  return (
    <div className={style.preroom__wrapper}>
      <Title>OKAY, ARE YOU READY?</Title>
      <div className={style.preroom__name}>
        <span className={style.preroom__name_text}>YOUR NAME:</span>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder={'WRITE YOUR NAME'}
          className={style.preroom__name_input}
        />
      </div>
      <UserForm
        value={formRole ? formRole : ''}
        name={'formRole'}
        onChange={roomForm.handleChange}
        label={'Role'}
      />
      <UserForm
        value={formRoomName}
        name={'formRoomName'}
        onChange={roomForm.handleChange}
        label={'Room name'}
      />
      <UserForm
        value={formDate}
        name={'formDate'}
        onChange={roomForm.handleChange}
        label={'Date'}
        type={'date'}
      />
      <img src="" alt="" />
      <div className={style.preroom__button}>
        <Button onClick={() => changeIsEdit()}>
          {isEditRoom ? 'Save' : 'Edit'}
        </Button>
      </div>
      <div className={style.preroom__button}>
        <Button>Enter</Button>
      </div>
    </div>
  );
};

export default PreRoom;
