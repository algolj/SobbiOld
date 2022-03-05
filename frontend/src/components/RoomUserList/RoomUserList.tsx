import React, { useEffect, useState } from 'react';
import style from './RoomUserList.module.scss';
import { useActions } from '../../hooks/useActions';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import UserForm from '../user/UserForm/UserForm';
import { InputLabels, IRoomObject, IRoomUser } from '../../types/roomTypes';
import Button from '../UI/Button/Button';
import AddUserRoom from '../AddUserRoom/AddUserRoom';
import uniqid from 'uniqid';

const RoomUserList = () => {
  const {
    room: { name, creator, interviewee, interviewer, watcher },
  }: IRoomObject = useTypeSelector((state) => state.room);
  const { getRoomInfo, deleteUserRoom } = useActions();
  const roleLabels = InputLabels;
  const [roleArray, setRoleArray] = useState<IRoomUser[][]>([
    interviewer,
    interviewee,
    watcher,
  ]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    console.log(interviewer);
    // setRoleArray([interviewer, interviewee, watcher]);
  }, [interviewee.length, interviewee.length, watcher.length]);
  return (
    <div
      onClick={() => {
        console.log(interviewer.length);

        setRoleArray([interviewer, interviewee, watcher]);
      }}
      className={style.list}
    >
      <div className={style.list__wrapper}>
        <div className={style.list__title}>User list</div>
        <div className={style.list__users}>
          <UserForm
            name={'creator'}
            value={''}
            ableToChange={false}
            label={'Creator'}
          />
          {roleArray.map((group, index) => {
            return group.map((user) => {
              return user.email ? (
                <UserForm
                  key={uniqid()}
                  name={Object.values(roleLabels)[index]}
                  value={user.email}
                  ableToChange={false}
                  ableToDelete={true}
                  onDelete={() =>
                    deleteUserRoom({
                      role: Object.values(roleLabels)[index].toLowerCase(),
                      user: user.email,
                    })
                  }
                  label={Object.values(roleLabels)[index]}
                />
              ) : null;
            });
          })}
        </div>
      </div>
      <div className={style.list__button}>
        <Button onClick={() => setIsVisible(true)}>Add user</Button>
      </div>
      <AddUserRoom isVisible={isVisible} setIsVisible={setIsVisible} />
    </div>
  );
};

export default RoomUserList;
