import React, { FC } from 'react';
import style from './Notifications.module.scss';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import Notification from './Notification';

const Notifications: FC = React.memo(() => {
  const { notifications } = useTypeSelector((state) => state.notification);
  return (
    <div className={style.notification__wrapper}>
      {notifications.map((message) => (
        <Notification message={message} />
      ))}
    </div>
  );
});

export default Notifications;
