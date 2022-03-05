import React, { FC } from 'react';
import style from './UserBio.module.scss';
import Button from '../../UI/Button/Button';
import { useActions } from '../../../hooks/useActions';
import { useTypeSelector } from '../../../hooks/useTypeSelector';

interface IProps {
  value: string;
  onChange: any;
}

const UserBio: FC<IProps> = React.memo(({ value, onChange }) => {
  const {
    isEditBio,
    isEditUser,
    user: { bio },
  } = useTypeSelector((state) => state.user);
  const { setIsEditBio } = useActions();
  return (
    <div>
      {value || isEditBio ? (
        <div className={style.user__description}>
          <div className={style.user__title}>About me</div>
          {isEditUser ? (
            <textarea
              className={style.user__description_textarea}
              name={'formBio'}
              value={value}
              onChange={onChange}
              cols={70}
              rows={10}
            />
          ) : (
            <div className={style.user__description_text}>{value}</div>
          )}
        </div>
      ) : isEditUser ? (
        isEditBio ? null : (
          <div className={style.user__description_button}>
            <Button onClick={() => setIsEditBio(true)}>
              Create description
            </Button>
          </div>
        )
      ) : null}
    </div>
  );
});

export default UserBio;
