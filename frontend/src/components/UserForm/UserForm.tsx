import React, { FC, useState } from 'react';
import style from './UserForm.module.scss';
import { useTypeSelector } from '../../hooks/useTypeSelector';

interface IProps {
  value: string;
  onChange?: any;
  label: string;
  name?: string;
  type?: string;
  ableToChange?: boolean;
  ableToDelete?: boolean;
  onDelete?: () => void;
}

const UserForm: FC<IProps> = React.memo(
  ({
    value,
    onChange,
    label,
    name,
    type,
    onDelete,
    ableToChange = true,
    ableToDelete = false,
  }) => {
    const { isEditUser } = useTypeSelector((state) => state.user);
    const { isEditRoom } = useTypeSelector((state) => state.room);
    const isEdit = isEditUser || isEditRoom;
    const [isVisible, setIsVisible] = useState<boolean>(true);
    return (
      <div
        className={
          isVisible ? style.user__info_wrapper : style.user__info_wrapper_hide
        }
      >
        {ableToDelete ? (
          <div
            onClick={() => {
              if (onDelete) onDelete();
              setIsVisible(false);
            }}
            className={style.user__info_button}
          >
            +
          </div>
        ) : null}
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
