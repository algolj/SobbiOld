import React, { FC, useState } from 'react';
import Title from '../../components/UI/Title/Title';
import colors from '../../styles/index.scss';
import style from './User.module.scss';
import FeedbackShortcut from '../../components/FeedbackShortcut/FeedbackShortcut';
import InfoItem from '../../components/UI/InfoItem/InfoItem';
import { UseTypeSelector } from '../../hooks/useTypeSelector';
import Button from '../../components/UI/Button/Button';
import { useActions } from '../../hooks/useActions';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserFormInfo from '../../components/UserFormInfo/UserFormInfo';
import Modal from '../../components/UI/Modal/Modal';
import FormInput from '../../components/UI/inputs/FormInput/FormInput';

interface IUserForm {
  formUsername: string;
  formEmail: string;
  formFirstName: string;
  formLastName: string;
  formBio: string;
  formSocialMedia: string;
}

const User: FC = () => {
  const {
    user: { username, password, bio, email, lastName, firstName, socialMedia },
  } = UseTypeSelector((state) => state.user);
  const { logoutUser, deleteUser, changeUserName, changeUserEmail } =
    useActions();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<boolean>(false);
  const socialMediaModal = ['github', 'linkedIn', 'facebook'];
  const userForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      formUsername: username,
      formEmail: email,
      formFirstName: firstName,
      formLastName: lastName,
      formSocialMedia: '',
      formBio: bio,
    },
    validationSchema: Yup.object({
      // login: Yup.string().required('Required'),
    }),
    onSubmit: (values: IUserForm) => {
      changeUserName(userForm.values.formUsername);
      changeUserEmail(userForm.values.formEmail);
      setIsEdit(false);
    },
  });
  const {
    formEmail,
    formUsername,
    formFirstName,
    formLastName,
    formBio,
    formSocialMedia,
  } = userForm.values;
  return (
    <form onSubmit={(e) => e.preventDefault()} className={style.user}>
      <Modal
        title={'Add new'}
        visibility={visibility}
        setVisibility={setVisibility}
      >
        <div className="">
          <FormInput
            label={'Name'}
            value={formSocialMedia}
            onChange={userForm.handleChange}
          />
          {socialMediaModal.map((media) => (
            <input type="radio"><InfoItem isEdit={isEdit} name={`${media}.svg`} />
          ))}
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
                <InfoItem isEdit={isEdit} referral={''} name={'female.svg'} />
                <InfoItem isEdit={isEdit} referral={''} name={'male.svg'} />
                <InfoItem isEdit={isEdit} referral={''} name={'another.svg'} />
              </div>
            ) : (
              <InfoItem isEdit={isEdit} referral={''} name={'female.svg'} />
            )}
          </div>
          <div className={style.user__info_media}>
            {socialMedia
              ? Object.keys(socialMedia).map(() => (
                  <InfoItem
                    isEdit={isEdit}
                    referral={'https://github.com/VaniaToper'}
                    name={'gitHub.svg'}
                  />
                ))
              : null}
            {isEdit ? (
              <InfoItem
                onClick={() => setVisibility(true)}
                isAdd={true}
                isEdit={isEdit}
                referral={''}
                name={'gitHub.svg'}
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
