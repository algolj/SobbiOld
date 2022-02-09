import React, { FC, useRef, useState } from 'react';
import style from './UserBasicInfo.module.scss';
import colors from '../../styles/index.scss';
import styleTitle from '../UI/Title/Title.module.scss';
import UserForm from '../UserForm/UserForm';
import InfoItem from '../UI/InfoItem/InfoItem';
import UserBio from '../UserBio/UserBio';
import SocialMediaModal from '../SocialMediaModal/SocialMediaModal';
import Title from '../UI/Title/Title';
import * as Yup from 'yup';
import {
  GenderEnum,
  ISocialMedia,
  IUserForm,
  IUserInfo,
  IUserLogin,
} from '../../types/userTypes';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useFormik } from 'formik';

interface IProps {
  setUpdateUserInfo: any;
  setUpdateUserLogin: any;
}

const UserBasicInfo: FC<IProps> = React.memo(
  ({ setUpdateUserInfo, setUpdateUserLogin }) => {
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
      isEdit,
    } = useTypeSelector((state) => state.user);
    const fileInput = useRef() as any;
    const { Male, Female, Other } = GenderEnum;
    const genderArray = [Male, Female, Other];
    const [socialMediaObject, setSocialMediaObject] = useState<ISocialMedia>(
      {},
    );
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
        console.log('');
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
    }: IUserForm = userForm.values;

    const imageReader = (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.onload = (progress) => {
        userForm.setFieldValue('formImage', progress.target!.result);
      };
      if (e.currentTarget.files?.length) {
        reader.readAsDataURL(e.currentTarget.files[0]);
      }
    };
    const userInfoUpdate: IUserInfo = {
      socialMedia: {},
      gender: formGender,
      firstName: formFirstName,
      lastName: formLastName,
      dateOfBirth: formDateOfBirth,
      bio: formBio,
      image: formImage,
    };
    const userLoginUpdate: IUserLogin = {
      email: formEmail,
      username: formUsername,
    };
    setUpdateUserInfo(userInfoUpdate);
    setUpdateUserLogin(userLoginUpdate);

    return (
      <form className={style.user}>
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
        <div className={style.user__info_wrapper}>
          <SocialMediaModal
            onChange={userForm.handleChange}
            value={formSocialMedia}
            currentChecked={formPicked}
            socialMedia={socialMediaObject}
            setSocialMedia={setSocialMediaObject}
          />
          <div className={style.user__avatar}>
            <img className={style.user__photo} src={''} alt="avatar" />
            <div
              onClick={() => fileInput.current.click()}
              className={isEdit ? style.user__avatar_edit : null}
            />
            <input
              ref={fileInput}
              className={style.user__file}
              type="file"
              onChange={imageReader}
              name=""
              id=""
            />
          </div>
          <div className={style.user__info}>
            <div className={style.user__info_name}>
              <UserForm
                isEdit={isEdit}
                value={formFirstName}
                onChange={userForm.handleChange}
                label={'First name'}
                name={'formFirstName'}
              />
              <UserForm
                isEdit={isEdit}
                value={formLastName}
                onChange={userForm.handleChange}
                label={'Last name'}
                name={'formLastName'}
              />
            </div>
            <UserForm
              isEdit={isEdit}
              value={formEmail}
              onChange={userForm.handleChange}
              label={'E-mail'}
              name={'formEmail'}
            />
            <UserForm
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
                </div>
              ) : (
                <InfoItem isClickable={false} name={formGender} />
              )}
            </div>
            {/*<div className={style.user__info_media}>*/}
            {/*  {socialMedia*/}
            {/*    ? Object.keys(socialMedia).map((media, index) => (*/}
            {/*        <InfoItem*/}
            {/*          key={media}*/}
            {/*          onRemove={() => changeUserInfoHandler(true)}*/}
            {/*          referral={`https://${media}/${*/}
            {/*            Object.values(socialMedia)[index]*/}
            {/*          }`}*/}
            {/*          name={media}*/}
            {/*        />*/}
            {/*      ))*/}
            {/*    : null}*/}
            {/*  {isEdit ? (*/}
            {/*    <InfoItem*/}
            {/*      onClick={() => setVisibility(true)}*/}
            {/*      isAdd={true}*/}
            {/*      isButton={true}*/}
            {/*      name={'gitHub'}*/}
            {/*    />*/}
            {/*  ) : null}*/}
            {/*</div>*/}
          </div>
        </div>
        <UserBio
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            userForm.handleChange(e);
          }}
          value={formBio}
        />
      </form>
    );
  },
);

export default UserBasicInfo;
