import React, { FC } from 'react';
import style from './UserFormInfo.module.scss';

interface IProps {
  isEdit: boolean;
  value: string;
  onChange: any;
}

const UserFormInfo: FC<IProps> = React.memo(({ isEdit, value, onChange }) => {
  return (
    <div className={style.user__info_wrapper}>
      <div className={style.user__info_title}>E-mail</div>
      {isEdit ? (
        <input name={value} value={value} onChange={onChange} />
      ) : (
        <span className={style.user__info}>{value}</span>
      )}
    </div>
  );
});

export default UserFormInfo;
