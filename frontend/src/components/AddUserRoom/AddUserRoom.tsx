import React, { FC, SetStateAction, useState } from 'react';
import style from './AddUserRoom.module.scss';
import FormInput from '../UI/inputs/FormInput/FormInput';
import InfoSelect from '../UI/selects/InfoSelect/InfoSelect';
import { IOptions } from '../../types/types';
import uniqid from 'uniqid';
import Button from '../UI/Button/Button';
import { useActions } from '../../hooks/useActions';
import { INewUser } from '../../types/roomTypes';
import Modal from '../UI/Modal/Modal';

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const AddUserRoom: FC<IProps> = React.memo(({ isVisible, setIsVisible }) => {
  const { addUser } = useActions();

  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const user: INewUser = {
    user: userName,
    role: userRole,
  };
  const selectOptions: IOptions[] = [
    {
      title: 'Interview',
      value: 'interview',
      id: uniqid(),
    },
    {
      title: 'Interviewer',
      value: 'interviewer',
      id: uniqid(),
    },
    {
      title: 'Spectator',
      value: 'watcher',
      id: uniqid(),
    },
  ];
  return (
    <Modal
      visibility={isVisible}
      setVisibility={setIsVisible}
      title={'Add new user'}
    >
      <div className={style.form__wrapper}>
        <div className={style.form__title}>Add user</div>
        <div className={style.form__inputs}>
          <InfoSelect
            title={'Role'}
            options={selectOptions}
            value={userRole}
            onChange={setUserRole}
            isBasic={false}
            defaultDisable={true}
            name={'Role'}
          />
          <FormInput
            label={'New user'}
            value={userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
        </div>
        <div className={style.form__button}>
          <Button onClick={() => addUser(user)}>Add</Button>
        </div>
      </div>
    </Modal>
  );
});

export default AddUserRoom;
