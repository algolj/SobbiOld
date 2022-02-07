import React from 'react';
import style from '../../pages/User/User.module.scss';
import Button from '../UI/Button/Button';

const UserBio = () => {
  return (
    <div>
      {bio || isEditBio ? (
        <div className={style.user__description}>
          <div className={style.user__title}>About me</div>
          {isEdit ? (
            <textarea
              className={style.user__description_textarea}
              name={'formBio'}
              value={formBio}
              onChange={userForm.handleChange}
              cols={70}
              rows={10}
            />
          ) : (
            <div className={style.user__description_text}>{bio}</div>
          )}
        </div>
      ) : isEdit ? (
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
};

export default UserBio;
