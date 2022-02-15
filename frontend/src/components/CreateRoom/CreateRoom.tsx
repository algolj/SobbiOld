import React, { FC, SetStateAction, useEffect, useState } from 'react';
import Modal from '../UI/Modal/Modal';
import style from './CreateRoom.module.scss';
import FormInput from '../UI/inputs/FormInput/FormInput';
import Button from '../UI/Button/Button';
import { useFormik } from 'formik';
import { IRoom, RoomInputLabels } from '../../types/roomTypes';
import userForm from '../UserForm/UserForm';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';

interface IProps {
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  isVisible: boolean;
}

const CreateRoom: FC<IProps> = React.memo(({ setIsVisible, isVisible }) => {
  const { room } = useTypeSelector((state) => state.room);
  const { isAuth } = useTypeSelector((state) => state.user);
  const { createRoom } = useActions();

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
      console.log(x);
    }
    console.log(isAuth);
  };
  useEffect(() => {
    checkingIsAuth();
  }, []);
  const roomForm = useFormik({
    initialValues: {
      name: '',
      creator: '',
      interviewer: '',
      interviewee: '',
      watcher: '',
      date: '',
      time: '',
    },
    onSubmit: (values: IRoom) => {
      console.log('s');
    },
  });

  const { creator, name, interviewer, interviewee, watcher, date, time } =
    roomForm.values;

  // let currentTime: Date = new Date();
  // const currentTimeZone = currentTime.getTimezoneOffset() / 60;

  const newRoom: IRoom = {
    name: name,
    creator: creator,
    date: `${date} ${time}:00+01`,
    watcher: watcher,
    interviewee: interviewee,
    interviewer: interviewer,
  };
  const formSubmit = () => {
    setIsVisible(false);
    createRoom(newRoom);
  };
  return (
    <Modal
      setVisibility={setIsVisible}
      title={'Create Room'}
      visibility={isVisible}
    >
      <div className={style.create__form}>
        <div className={style.create__time}>
          <div className={style.create__date}>
            <FormInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                roomForm.handleChange(e)
              }
              value={date}
              name={'date'}
              type={'date'}
              label={'Date'}
            />
          </div>
          <div className={style.create__hours}>
            <FormInput
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                roomForm.handleChange(e)
              }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              roomForm.handleChange(e)
            }
            value={Object.values(roomForm.values)[index]}
            name={`${Object.keys(roomForm.values)[index]}`}
            label={label}
            isAdd={true}
          />
        ))}
        <div className={style.create__button}>
          <Button onClick={() => formSubmit()}>Create</Button>
        </div>
      </div>
    </Modal>
  );
});

export default CreateRoom;
