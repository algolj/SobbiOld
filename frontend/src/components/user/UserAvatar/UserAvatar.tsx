import React, { FC, useRef } from 'react';
import style from './UserAvatar.module.scss';
import { useTypeSelector } from '../../../hooks/useTypeSelector';

interface IProps {
  formField: string;
  setFormImage: (field: string, value: FormData) => void;
}

const UserAvatar: FC<IProps> = React.memo(({ formField, setFormImage }) => {
  const {
    isEditUser,
    user: { image },
  } = useTypeSelector((state) => state.user);
  const fileInput = useRef() as any;
  const formData = new FormData();
  const imageReader = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      formData.append('file', e.currentTarget.files[0]);
    }
  };
  setFormImage(formField, formData);
  return (
    <div className={style.avatar}>
      <img className={style.avatar__photo} src={image} alt="Avatar" />
      <div
        onClick={() => fileInput.current.click()}
        className={isEditUser ? style.avatar_edit : null}
      />
      <input
        ref={fileInput}
        className={style.avatar__file}
        type="file"
        onChange={imageReader}
      />
    </div>
  );
});

export default UserAvatar;
