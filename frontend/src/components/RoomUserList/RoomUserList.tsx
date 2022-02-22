import React, { useEffect, useState } from 'react';
import style from './RoomUserList.module.scss';
import { useActions } from '../../hooks/useActions';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import UserForm from '../UserForm/UserForm';
import { InputLabels, IRoomObject, IRoomRoles } from '../../types/roomTypes';
import uniqid from 'uniqid';
import Button from '../UI/Button/Button';
import AddUserRoom from '../AddUserRoom/AddUserRoom';

const RoomUserList = () => {
  const {
    room: { name, creator, interviewee, interviewer, watcher },
  }: IRoomObject = useTypeSelector((state) => state.room);
  const { getRoomInfo, deleteUserRoom } = useActions();
  useEffect(() => {
    getRoomInfo();
  }, []);
  const roleLabels = InputLabels;
  const roleArray: IRoomRoles[] = [interviewer, interviewee, watcher];
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div className={style.list}>
      <div className={style.list__wrapper}>
        <div className={style.list__title}>User list</div>
        <div className={style.list__users}>
          <UserForm
            name={'creator'}
            value={creator.email}
            ableToChange={false}
            label={'Creator'}
          />
          {roleArray.map((group, index) => {
            console.log(Array.isArray(group), group);
            return Array.isArray(group) ? (
              group.map((user) => {
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
              })
            ) : group.email ? (
              <UserForm
                onDelete={() =>
                  deleteUserRoom({
                    role: Object.values(roleLabels)[index].toLowerCase(),
                    user: group.email,
                  })
                }
                ableToDelete={true}
                name={Object.values(roleLabels)[index]}
                value={group.email}
                ableToChange={false}
                label={Object.values(roleLabels)[index]}
              />
            ) : null;
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
