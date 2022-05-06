import React, { FC, SetStateAction, useEffect, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import style from './CreateRoom.module.scss';
import FormInput from '../UI/inputs/FormInput/FormInput';
import Button from '../UI/Button/Button';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';
import { IRoom, RoomInputLabels } from '../../types/roomTypes';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import { notificationSlice } from '../../store/reducers/basicReducer/reducer';
import { useDispatch } from 'react-redux';
import { ValidationMessages } from '../../assets/text';
import cn from 'classnames';

interface IProps {
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
}

const CreateRoom: FC<IProps> = React.memo(({ setIsVisible, isVisible }) => {
  const { isAuth } = useTypeSelector((state) => state.user);
  const { createRoom } = useActions();
  const { addNewNotification } = notificationSlice.actions;
  const dispatch = useDispatch();
  const {
    creatorLabel,
    IntervieweeLabel,
    InterviewerLabel,
    roomNameLabel,
    SpectatorsLabel,
    DateLabel,
    TimeLabel,
  } = RoomInputLabels;
  const [inputLabels, setInputLabels] = useState<RoomInputLabels[]>([
    roomNameLabel,
    creatorLabel,
    InterviewerLabel,
    IntervieweeLabel,
    SpectatorsLabel,
  ]);
  const checkingIsAuth = async () => {
    if (isAuth) {
      const x = inputLabels.filter((label: string) => label === creatorLabel);
    }
  };
  useEffect(() => {
    checkingIsAuth();
  }, []);
  const initialValues: IRoom = {
    name: '',
    creator: {
      name: '',
      email: '',
    },
    interviewer: [],
    interviewee: [],
    watcher: [],
    date: '',
    time: '',
  };
  const createRoomValidation = Yup.object().shape({
    name: Yup.string().required(ValidationMessages.required),
    interviewer: Yup.string().required(ValidationMessages.required),
    interviewee: Yup.string().required(ValidationMessages.required),
    date: Yup.date().required(ValidationMessages.required),
    time: Yup.date().required(ValidationMessages.required),
  });
  // let currentTime: Date = new Date();
  // const currentTimeZone = currentTime.getTimezoneOffset() / 60;
  const formSubmit = async (values: IRoom) => {
    console.log(
      '🚀 ~ file: CreateRoom.tsx ~ line 72 ~ formSubmit ~ values',
      values,
    );
    await createRoom(values);
    setIsVisible(false);
    dispatch(addNewNotification('Successfully created'));
  };
  return (
    <>
      <Modal
        setVisibility={setIsVisible}
        visibility={isVisible}
        title={'Create Room'}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={createRoomValidation}
          onSubmit={formSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            values: { time, date },
            errors,
            touched,
          }) => (
            <form className={style.create__form} onSubmit={handleSubmit}>
              <div className={style.create__time}>
                <div className={style.create__date}>
                  <FormInput
                    onChange={handleChange}
                    value={date}
                    name={'date'}
                    type={'date'}
                    label={'Date'}
                    errorMessage={cn(touched.date && errors.date)}
                  />
                </div>
                <div className={style.create__hours}>
                  <FormInput
                    onChange={handleChange}
                    value={time}
                    name={'time'}
                    type={'time'}
                    label={'Time'}
                  />
                </div>
              </div>
              {inputLabels.map((label, index) => (
                <FormInput
                  key={index}
                  onChange={handleChange}
                  value={Object.values(values)[index]}
                  name={`${Object.keys(values)[index]}`}
                  label={label}
                  isAbleToAddSubInput={true}
                />
              ))}
              <div className={style.create__button}>
                <Button type="submit">Create</Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
});

export default CreateRoom;
