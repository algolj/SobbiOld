import React, { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import UserForm from '../UserForm/UserForm';
import { InputLabels, IRoomObject, IRoomRoles } from '../../types/roomTypes';
import uniqid from 'uniqid';

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
  console.log(interviewer);
  return (
    <div>
      <UserForm
        onDelete={() => deleteUserRoom({ room: name, user: creator.email })}
        name={'creator'}
        value={creator.email}
        ableToChange={false}
        ableToDelete={true}
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
                  deleteUserRoom({ room: name, user: user.email })
                }
                label={Object.values(roleLabels)[index]}
              />
            ) : null;
          })
        ) : group.email ? (
          <UserForm
            onDelete={() => deleteUserRoom({ room: name, user: group.email })}
            ableToDelete={true}
            name={Object.values(roleLabels)[index]}
            value={group.email}
            ableToChange={false}
            label={Object.values(roleLabels)[index]}
          />
        ) : null;
      })}
    </div>
  );
};

export default RoomUserList;
