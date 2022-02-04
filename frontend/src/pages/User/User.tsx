import React, { FC, useState } from 'react';
import Title from '../../components/UI/Title/Title';
import colors from '../../styles/index.scss';
import style from './User.module.scss';
import FeedbackShortcut from '../../components/FeedbackShortcut/FeedbackShortcut';
import InfoItem from '../../components/UI/InfoItem/InfoItem';
import Button from '../../components/UI/Button/Button';
import UserFormInfo from '../../components/UserFormInfo/UserFormInfo';
import Modal from '../../components/UI/Modal/Modal';
import FormInput from '../../components/UI/inputs/FormInput/FormInput';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import { IUserInfo, SocialMediaEnum } from '../../types/userTypes';

interface IUserForm {
  formUsername: string;
  formEmail: string;
  formFirstName: string;
  formLastName: string;
  formBio: string;
  formSocialMedia: string;
  formPicked: string;
}

const User: FC = () => {
  const {
    user: { username, password, bio, email, lastName, firstName, socialMedia },
  } = useTypeSelector((state) => state.user);
  const {
    logoutUser,
    deleteUser,
    changeUserName,
    changeUserEmail,
    changeUserInfo,
  } = useActions();
  const { github, linkedIn, facebook } = SocialMediaEnum;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<boolean>(false);
  const socialMediaModal = [github, linkedIn, facebook];
  const userForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      formUsername: username,
      formEmail: email,
      formFirstName: firstName,
      formLastName: lastName,
      formSocialMedia: '',
      formBio: bio,
      formPicked: '',
    },
    validationSchema: Yup.object({
      // login: Yup.string().required('Required'),
    }),
    onSubmit: async (values: IUserForm) => {
      await changeUserName(userForm.values.formUsername);
      await changeUserEmail(userForm.values.formEmail);
      await setIsEdit(false);
    },
  });

  const {
    formEmail,
    formUsername,
    formFirstName,
    formLastName,
    formBio,
    formSocialMedia,
    formPicked,
  } = userForm.values;
  const changeUserInfoHandler = async () => {
    const userObject: any = { socialMedia: {} };
    userObject.socialMedia![
      formPicked
    ] = `https://${formPicked}.com/${formSocialMedia}`;
    await changeUserInfo(userObject);
  };

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
          {socialMediaModal.map((media) => (
            <label>
              <InfoItem
                key={media}
                isEdit={isEdit}
                name={media}
                isButton={true}
                isChecked={formPicked}
              />
              <input
                className={style.modal__radio}
                id={'formPicked'}
                type={'radio'}
                name={'formPicked'}
                value={media}
                onChange={userForm.handleChange}
              />
            </label>
          ))}
          <Button onClick={() => changeUserInfoHandler()}>Add</Button>
        </div>
      </Modal>
      <Title color={colors.white}>
        {isEdit ? (
          <input
            name={'formUsername'}
            value={formUsername}
            onChange={userForm.handleChange}
          />
        ) : (
          formUsername
        )}
      </Title>
      <div className={style.user__info_wrapper}>
        <div className={style.user__avatar}>
          <img
            className={style.user__photo}
            src={'./assets/icon/logIn.svg'}
            alt="avatar"
          />
        </div>
        <div className={style.user__info}>
          <UserFormInfo
            isEdit={isEdit}
            value={formUsername}
            onChange={userForm.handleChange}
          />
          <div className={style.user__gender}>
            {isEdit ? (
              <div className={style.user__gender_wrapper}>
                <InfoItem isEdit={isEdit} name={'female'} />
                <InfoItem isEdit={isEdit} name={'male'} />
                <InfoItem isEdit={isEdit} name={'another'} />
              </div>
            ) : (
              <InfoItem isEdit={isEdit} name={'female'} />
            )}
          </div>
          <div className={style.user__info_media}>
            {socialMedia
              ? Object.keys(socialMedia).map((media) => (
                  <InfoItem
                    key={media}
                    isEdit={isEdit}
                    referral={'https://github.com/VaniaToper'}
                    name={'gitHub'}
                  />
                ))
              : null}
            {isEdit ? (
              <InfoItem
                onClick={() => setVisibility(true)}
                isAdd={true}
                isButton={true}
                isEdit={isEdit}
                name={'gitHub'}
              />
            ) : null}
          </div>
        </div>
      </div>
      {bio ? (
        <div className={style.user__description}>
          <div className={style.user__title}>About me</div>
          <div className={style.user__description_text}>{bio}</div>
        </div>
      ) : (
        <textarea
          name={'formBio'}
          onChange={userForm.handleChange}
          cols={30}
          rows={10}
        />
      )}
      <div className={style.user__feedbacks}>
        <div className={style.user__title}>Feedbacks</div>
        <FeedbackShortcut />
      </div>
      <Button
        onClick={() => {
          setIsEdit(!isEdit);
        }}
      >
        Edit
      </Button>
      <Button onSubmit={userForm.handleSubmit}>Save</Button>
      <Link to={'/'}>
        <Button
          onClick={() => {
            logoutUser();
          }}
        >
          Logout
        </Button>
      </Link>
      <Link to={'/'}>
        <Button
          onClick={() => {
            deleteUser();
          }}
        >
          Delete
        </Button>
      </Link>
    </form>
  );
};

export default User;
