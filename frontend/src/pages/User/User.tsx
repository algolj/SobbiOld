import React, { FC, useState } from 'react';
import style from './User.module.scss';
import FeedbackShortcut from '../../components/FeedbackShortcut/FeedbackShortcut';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import UserBasicInfo from '../../components/UserBasicInfo/UserBasicInfo';
import { Link } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import { IUserInfo, IUserLogin } from '../../types/userTypes';

const User: FC = () => {
  const {
    isEditUser,
    user: { username, email },
  } = useTypeSelector((state) => state.user);
  const {
    deleteUser,
    changeUserName,
    changeUserEmail,
    changeUserInfo,
    setIsEdit,
    setIsEditBio,
    changeUserAvatar,
  } = useActions();

  const [updateUserInfo, setUpdateUserInfo] = useState<IUserInfo>({});
  const [updateUserLogin, setUpdateUserLogin] = useState<IUserLogin>({
    username: username,
    email: email,
  });
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const userEdit = async () => {
    if (!isEditUser) return setIsEdit(true);
    else {
      await changeUserInfo(updateUserInfo);
      await changeUserName(updateUserLogin.username);
      await changeUserEmail(updateUserLogin.email);
      await changeUserAvatar(updateUserInfo.image!);
      setIsEdit(false);
      setIsEditBio(false);
    }
  };
  // console.log(updateUserInfo.socialMedia);
  return (
    <div onSubmit={(e) => e.preventDefault()} className={style.user}>
      <UserBasicInfo
        setUpdateUserInfo={setUpdateUserInfo}
        setUpdateUserLogin={setUpdateUserLogin}
      />
      <div className={style.user__feedbacks}>
        <div className={style.user__title}>Feedbacks</div>
        <FeedbackShortcut />
      </div>
      <Modal
        visibility={showDeleteModal}
        title={'Are you sure?'}
        setVisibility={setShowDeleteModal}
      >
        <div className={style.user__delete_wrapper}>
          <Link className={style.user__delete_modal} to={'/'}>
            <Button isRed={true} onClick={() => deleteUser()}>
              Delete
            </Button>
          </Link>
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
        </div>
      </Modal>
      <div className={style.user__settings}>
        <div className={style.user__buttons}>
          <Button onClick={userEdit}>{isEditUser ? 'Save' : 'Edit'}</Button>
          <Button
            isRed={true}
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default User;
