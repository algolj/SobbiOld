import React, { FC, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import classNames from 'classnames';
import style from './Notifications.module.scss';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { notificationSlice } from '../../store/reducers/basicReducer/reducer';
import { useDispatch } from 'react-redux';

interface IProps {
  message: string;
}

const NotificationItem: FC<IProps> = React.memo(({ message }) => {
  const { notifications } = useTypeSelector((state) => state.notification);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { removeNotification } = notificationSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  }, [notifications.length]);

  return (
    <div
      key={uniqid()}
      className={classNames(
        style.notification,
        isVisible && style.notification_visible,
      )}
    >
      {/*<img src="" alt="bell" />*/}
      <div className={style.notification__message}>{message}</div>
    </div>
  );
});

export default NotificationItem;
