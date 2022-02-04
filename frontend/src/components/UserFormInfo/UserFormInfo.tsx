import React, { FC } from 'react';
import style from './UserFormInfo.module.scss';

interface IProps {
  isEdit: boolean;
  value: string;
  onChange: any;
  label: string;
  name: string;
  type?: string;
}

const UserFormInfo: FC<IProps> = React.memo(
  ({ isEdit, value, onChange, label, name, type }) => {
    return (
      <div className={style.user__info_wrapper}>
        <div className={style.user__info_title}>{label}</div>
        {isEdit ? (
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

export default UserFormInfo;
