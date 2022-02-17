import React, { FC } from 'react';
import style from './UserForm.module.scss';
import { useTypeSelector } from '../../hooks/useTypeSelector';

interface IProps {
  value: string;
  onChange?: any;
  label: string;
  name?: string;
  type?: string;
  ableToChange?: boolean;
}

const UserForm: FC<IProps> = React.memo(
  ({ value, onChange, label, name, type, ableToChange = true }) => {
    const { isEditUser } = useTypeSelector((state) => state.user);
    const { isEditRoom } = useTypeSelector((state) => state.room);
    const isEdit = isEditUser || isEditRoom;
    return (
      <div className={style.user__info_wrapper}>
        <div className={style.user__info_title}>{label}</div>
        {isEdit && ableToChange ? (
          <input
            name={name}
            value={value}
            onChange={onChange}
            className={style.user__info}
            id={'formInput'}
            type={type}
          />
        ) : (
          <span className={style.user__info}>{value}</span>
        )}
      </div>
    );
  },
);

export default UserForm;
