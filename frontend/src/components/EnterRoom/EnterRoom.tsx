import React, { FC, SetStateAction, useState } from 'react';
import style from './EnterRoom.module.scss';
import Modal from '../UI/Modal/Modal';
import FormInput from '../UI/inputs/FormInput/FormInput';
import Button from '../UI/Button/Button';
import { useActions } from '../../hooks/useActions';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { Link } from 'react-router-dom';
import { IAuthRoom } from '../../types/roomTypes';
import { Formik } from 'formik';

interface IProps {
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
}

const EnterRoom: FC<IProps> = React.memo(({ setIsVisible, isVisible }) => {
  const { enterRoom } = useActions();
  const { isAuthRoom } = useTypeSelector((state) => state.room);
  const onSubmit = async (values: IAuthRoom) => {
    await enterRoom(values);
  };
  const initialValues: IAuthRoom = {
    room: '',
    password: '',
  };

  return (
    <Modal
      setVisibility={setIsVisible}
      title={'Enter Room'}
      visibility={isVisible}
    >
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values: { room, password }, handleChange, handleSubmit }) => (
          <form className={style.enter__wrapper} onSubmit={handleSubmit}>
            <FormInput
              name={'room'}
              label={'Room name'}
              value={room}
              onChange={handleChange}
            />
            <FormInput
              name={'password'}
              label={'Room password'}
              value={password}
              onChange={handleChange}
            />
            <div className={style.enter__button}>
              <Link to={'/preroom'}>
                <Button type="submit">Enter</Button>
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
});

export default EnterRoom;
