import React, { useState } from 'react';
import style from './RoomUserList.module.scss';
import { useActions } from '../../hooks/useActions';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import UserForm from '../UserForm/UserForm';
import { InputLabels, IRoomObject, IRoomUser } from '../../types/roomTypes';
import Button from '../UI/Button/Button';
import AddUserRoom from '../AddUserRoom/AddUserRoom';

const RoomUserList = () => {
  const {
    room: { name, creator, interviewee, interviewer, watcher },
  }: IRoomObject = useTypeSelector((state) => state.room);
  const { getRoomInfo, deleteUserRoom } = useActions();
  const roleLabels = InputLabels;
  const roleArray: IRoomUser[][] = [interviewer, interviewee, watcher];
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
            // group.map((user) => (
            //   <UserForm
            //     key={uniqid()}
            //     name={Object.values(roleLabels)[index]}
            //     value={user.email}
            //     ableToChange={false}
            //     ableToDelete={true}
            //     onDelete={() =>
            //       deleteUserRoom({
            //         role: Object.values(roleLabels)[index].toLowerCase(),
            //         user: user.email,
            //       })
            //     }
            //     label={Object.values(roleLabels)[index]}
            //   />
            // ));
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
