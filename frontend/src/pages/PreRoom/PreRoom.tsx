import React, { FC, useEffect, useState } from 'react';
import style from './PreRoom.module.scss';
import Title from '../../components/UI/Title/Title';
import Button from '../../components/UI/Button/Button';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import PreRoomForm from '../../components/PreRoomForm/PreRoomForm';
import { IRoomForm } from '../../types/roomTypes';

const PreRoom: FC = () => {
  const {
    isEditRoom,
    room: { date, name, role },
  } = useTypeSelector((state) => state.room);
  const { setIsEditRoom, getRoomInfo, changeRoomDate, changeRoomUsername } =
    useActions();
  useEffect(() => {
    getRoomInfo();
  }, []);
  const [roomInfo, setRoomInfo] = useState<IRoomForm>({
    formDate: '',
    formUserName: '',
  });
  const changeIsEdit = () => {
    setIsEditRoom(!isEditRoom);
    if (isEditRoom) {
      changeRoomDate(roomInfo.formDate, name);
      changeRoomUsername(roomInfo.formUserName);
    }
  };
  return (
    <div className={style.preroom__wrapper}>
      <Title>OKAY, ARE YOU READY?</Title>
      <PreRoomForm setRoomInfo={setRoomInfo} />
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
