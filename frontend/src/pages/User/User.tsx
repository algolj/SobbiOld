import React, { FC, useRef, useState } from 'react';
import Title from '../../components/UI/Title/Title';
import colors from '../../styles/index.scss';
import style from './User.module.scss';
import styleTitle from '../../components/UI/Title/Title.module.scss';
import FeedbackShortcut from '../../components/FeedbackShortcut/FeedbackShortcut';
import InfoItem from '../../components/UI/InfoItem/InfoItem';
import Button from '../../components/UI/Button/Button';
import UserForm from '../../components/UserForm/UserForm';
import Modal from '../../components/UI/Modal/Modal';
import FormInput from '../../components/UI/inputs/FormInput/FormInput';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import { GenderEnum, SocialMediaEnum } from '../../types/userTypes';
import UserBasicInfo from '../../components/UserBasicInfo/UserBasicInfo';

const User: FC = () => {
  const {
    logoutUser,
    deleteUser,
    changeUserName,
    changeUserEmail,
    changeUserInfo,
  } = useActions();

  const { github, linkedIn, facebook } = SocialMediaEnum;
  const socialMediaArray = [github, linkedIn, facebook];

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditBio, setIsEditBio] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // const userUpdate: any = {
  //   socialMedia: {},
  //   gender: formGender,
  //   firstName: formFirstName,
  //   lastName: formLastName,
  //   dateOfBirth: formDateOfBirth,
  //   bio: formBio,
  //   image: formImage,
  // };

  const changeUserInfoHandler = async (
    remove?: boolean,
    userInfo: any = userUpdate,
  ) => {
    userInfo.socialMedia![
      formPicked
    ] = `https://${formPicked}.com/${formSocialMedia}`;

    if (remove) {
      delete userInfo.socialMedia![formPicked];
    }
    await changeUserInfo(userInfo);
  };

  const userEdit = async () => {
    if (!isEdit) return setIsEdit(!isEdit);
    else {
      await changeUserInfoHandler();
      await changeUserName(userForm.values.formUsername);
      await changeUserEmail(userForm.values.formEmail);
      setIsEdit(false);
      setIsEditBio(false);
    }
  };

  const imageReader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = (progress) => {
      userForm.setFieldValue('formImage', progress.target!.result);
    };
    if (e.currentTarget.files?.length) {
      reader.readAsDataURL(e.currentTarget.files[0]);
    }
  };
  const fileInput = useRef() as any;
  return (
    <form onSubmit={(e) => e.preventDefault()} className={style.user}>
      <Modal
        title={'Add new'}
        visibility={visibility}
        setVisibility={setVisibility}
      >
        <div className="">
          <FormInput
            name={'formSocialMedia'}
            label={'Name'}
            value={formSocialMedia}
            onChange={userForm.handleChange}
          />
          {socialMediaArray.map((media) => (
            <label htmlFor={media} key={media}>
              <InfoItem
                isEdit={isEdit}
                name={media}
                isButton={true}
                checked={formPicked}
              />
              <input
                className={style.modal__radio}
                id={media}
                type={'radio'}
                name={'formPicked'}
                value={media}
                // onChange={userForm.handleChange}
              />
            </label>
          ))}
          <Button onClick={() => changeUserInfoHandler()}>Add</Button>
        </div>
      </Modal>
      <Title color={colors.white}>
        {isEdit ? (
          <input
            className={styleTitle.title}
            name={'formUsername'}
            value={formUsername}
            onChange={userForm.handleChange}
          />
        ) : (
          formUsername
        )}
      </Title>
      <UserBasicInfo />
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
          <Button onClick={userEdit}>{isEdit ? 'Save' : 'Edit'}</Button>
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
    </form>
  );
};

export default User;
