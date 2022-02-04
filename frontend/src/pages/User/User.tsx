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
import { GenderEnum, IUserInfo, SocialMediaEnum } from '../../types/userTypes';

interface IUserForm {
  formUsername: string;
  formEmail: string;
  formFirstName: string;
  formLastName: string;
  formBio: string;
  formSocialMedia: string;
  formPicked: string;
  formGender: string;
  formDateOfBirth: string;
  formImage: string;
}

const User: FC = () => {
  const {
    user: {
      username,
      password,
      bio,
      email,
      lastName,
      firstName,
      socialMedia,
      gender,
      dateOfBirth,
      image,
    },
  } = useTypeSelector((state) => state.user);
  const {
    logoutUser,
    deleteUser,
    changeUserName,
    changeUserEmail,
    changeUserInfo,
  } = useActions();

  const { github, linkedIn, facebook } = SocialMediaEnum;
  const socialMediaArray = [github, linkedIn, facebook];
  const { Male, Female, Other } = GenderEnum;
  const genderArray = [Male, Female, Other];
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [visibility, setVisibility] = useState<boolean>(false);
  const [formImage1, setFormImage1] = useState('');
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
      formGender: gender,
      formDateOfBirth: dateOfBirth,
      formImage: image,
    },
    validationSchema: Yup.object({
      // login: Yup.string().required('Required'),
    }),
    onSubmit: async (values: IUserForm) => {
      console.log('adssd');
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
    formGender,
    formDateOfBirth,
    formImage,
  } = userForm.values;

  const changeUserInfoHandler = async (remove?: boolean) => {
    const userObject: any = {
      socialMedia: {},
      gender: formGender,
      firstName: formFirstName,
      lastName: formLastName,
      dateOfBirth: formDateOfBirth,
      bio: formBio,
      image: formImage1,
    };
    if (!remove) {
      userObject.socialMedia![
        formPicked
      ] = `https://${formPicked}.com/${formSocialMedia}`;
    }
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
          {socialMediaArray.map((media) => (
            <label key={media}>
              <InfoItem
                isEdit={isEdit}
                name={media}
                isButton={true}
                checked={formPicked}
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
          <img className={style.user__photo} src={image} alt="avatar" />
          <input
            type="file"
            onChange={(e) => setFormImage1(e.target.files![0].name)}
            name=""
            id=""
          />
        </div>
        <div className={style.user__info}>
          <UserFormInfo
            isEdit={isEdit}
            value={formEmail}
            onChange={userForm.handleChange}
            label={'E-mail'}
            name={'formEmail'}
          />
          <UserFormInfo
            isEdit={isEdit}
            value={formFirstName}
            onChange={userForm.handleChange}
            label={'First name'}
            name={'formFirstName'}
          />
          <UserFormInfo
            isEdit={isEdit}
            value={formLastName}
            onChange={userForm.handleChange}
            label={'Last name'}
            name={'formLastName'}
          />
          <UserFormInfo
            isEdit={isEdit}
            value={formDateOfBirth}
            onChange={userForm.handleChange}
            label={'Birth'}
            name={'formDateOfBirth'}
            type={'date'}
          />
          <div className={style.user__gender}>
            {isEdit ? (
              <div className={style.user__gender_wrapper}>
                {genderArray.map((genderItem) => (
                  <label key={genderItem}>
                    <InfoItem
                      isButton={true}
                      isEdit={isEdit}
                      checked={formGender}
                      name={genderItem}
                    />
                    <input
                      className={style.modal__radio}
                      id={'formGender'}
                      type={'radio'}
                      name={'formGender'}
                      value={genderItem}
                      onChange={userForm.handleChange}
                    />
                  </label>
                ))}
                {/*<InfoItem isEdit={isEdit} name={'male'} />*/}
                {/*<InfoItem isEdit={isEdit} name={'another'} />*/}
              </div>
            ) : (
              <InfoItem isEdit={isEdit} isClickable={false} name={gender} />
            )}
          </div>
          <div className={style.user__info_media}>
            {gender
              ? Object.keys(socialMedia).map((media, index) => (
                  <InfoItem
                    key={media}
                    isEdit={isEdit}
                    onRemove={() => changeUserInfoHandler(true)}
                    referral={`https://${media}/${
                      Object.values(socialMedia)[index]
                    }`}
                    name={media}
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
        <input
          name={'formBio'}
          onChange={userForm.handleChange}
          value={formBio}
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
      <Button
        onClick={async () => {
          await changeUserInfoHandler();
          await changeUserName(userForm.values.formUsername);
          await changeUserEmail(userForm.values.formEmail);
          await setIsEdit(false);
        }}
        onSubmit={userForm.handleSubmit}
      >
        Save
      </Button>
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
