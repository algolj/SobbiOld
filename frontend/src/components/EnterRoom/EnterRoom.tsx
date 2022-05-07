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
import * as Yup from 'yup';
import { ValidationMessages } from 'assets/text';
import cn from 'classnames';

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
  const createRoomValidation = Yup.object().shape({
    room: Yup.string().required(ValidationMessages.required),
    password: Yup.string().required(ValidationMessages.required),
  });
  return (
    <Modal
      setVisibility={setIsVisible}
      title={'Enter Room'}
      visibility={isVisible}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={createRoomValidation}
      >
        {({
          values: { room, password },
          handleChange,
          handleSubmit,
          handleBlur,
          touched,
          errors,
        }) => (
          <form className={style.enter__wrapper} onSubmit={handleSubmit}>
            <FormInput
              data-testid={'enter-room__name'}
              name={'room'}
              label={'Room name'}
              value={room}
              onBlur={handleBlur}
              onChange={handleChange}
              errorMessage={cn(touched.room && errors.room)}
            />
            <FormInput
              data-testid={'enter-room__password'}
              name={'password'}
              label={'Room password'}
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={cn(touched.password && errors.password)}
            />
            <div data-testid={'enter-room__button'} className={style.enter__button}>
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
