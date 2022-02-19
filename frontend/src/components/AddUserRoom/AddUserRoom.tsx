import React, { FC, useState } from 'react';
import style from './AddUserRoom.module.scss';
import FormInput from '../UI/inputs/FormInput/FormInput';
import InfoSelect from '../UI/selects/InfoSelect/InfoSelect';
import { IOptions } from '../../types/types';
import uniqid from 'uniqid';
import Button from '../UI/Button/Button';
import { useActions } from '../../hooks/useActions';
import { INewUser } from '../../types/roomTypes';

const AddUserRoom: FC = React.memo(() => {
  const { addUser } = useActions();

  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const user: INewUser = {
    user: userName,
    role: userRole,
  };
  console.log(user);
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
    <div>
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
    </div>
  );
});

export default AddUserRoom;
