import React, { FC, useEffect, useRef, useState } from 'react';
import style from './UserBasicInfo.module.scss';
import colors from '../../../styles/index.scss';
import styleTitle from '../../UI/Title/Title.module.scss';
import UserForm from '../UserForm/UserForm';
import UserBio from '../UserBio/UserBio';
import SocialMedia from '../../SocialMedia/SocialMedia';
import Title from '../../UI/Title/Title';
import * as Yup from 'yup';
import {
  ISocialMedia,
  IUserForm,
  IUserInfo,
  IUserLogin,
} from '../../../types/userTypes';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { useFormik } from 'formik';
import { IOptions } from '../../../types/types';
import uniqid from 'uniqid';
import InfoSelect from '../../UI/selects/InfoSelect/InfoSelect';
import { useActions } from '../../../hooks/useActions';
import UserGender from '../UserGender/UserGender';
import UserAvatar from '../UserAvatar/UserAvatar';

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
        country,
        imagePath,
        image,
      },
      isEditUser,
    } = useTypeSelector((state) => state.user);
    const { getUserAvatar } = useActions();
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
        formCountry: country,
        formImage: image,
      },
      validationSchema: Yup.object({
        // login: Yup.string().required('Required'),
      }),
      onSubmit: async (values: IUserForm) => {
        return;
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
      formCountry,
      formImage,
    }: IUserForm = userForm.values;

    const userInfoUpdate: IUserInfo = {
      socialMedia: socialMediaObject,
      gender: formGender,
      firstName: formFirstName,
      lastName: formLastName,
      dateOfBirth: formDateOfBirth,
      bio: formBio,
      country: formCountry,
      imageFile: formImage,
    };
    const userLoginUpdate: IUserLogin = {
      email: formEmail,
      username: formUsername,
    };
    setUpdateUserInfo(userInfoUpdate);
    setUpdateUserLogin(userLoginUpdate);
    const countryOptions: IOptions[] = [
      {
        title: 'Czech',
        value: 'Czech',
        id: uniqid(),
      },
      {
        title: 'Ukraine',
        value: 'Ukraine',
        id: uniqid(),
      },
    ];
    useEffect(() => {
      // getUserAvatar(imagePath);
    }, []);

    return (
      <form className={style.user}>
        <Title color={colors.white}>
          {isEditUser ? (
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
          <UserAvatar
            formField={'fromImage'}
            setFormImage={userForm.setFieldValue}
          />
          <div className={style.user__info}>
            <div className={style.user__info_name}>
              <UserForm
                value={formFirstName}
                onChange={userForm.handleChange}
                label={'First name'}
                name={'formFirstName'}
              />
              <UserForm
                value={formLastName}
                onChange={userForm.handleChange}
                label={'Last name'}
                name={'formLastName'}
              />
            </div>
            <UserForm
              value={formEmail}
              onChange={userForm.handleChange}
              label={'E-mail'}
              name={'formEmail'}
            />
            <UserForm
              value={formDateOfBirth}
              onChange={userForm.handleChange}
              label={'Birth'}
              name={'formDateOfBirth'}
              type={'date'}
            />
            {isEditUser ? (
              <InfoSelect
                value={formCountry}
                title={'Country'}
                options={countryOptions}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  userForm.setFieldValue('formCountry', e.target.value)
                }
                name={'formCountry'}
              />
            ) : (
              <UserForm
                label={'Country'}
                ableToChange={false}
                value={formCountry}
              />
            )}
            <UserGender gender={formGender} setGender={userForm.handleChange} />
            <SocialMedia
              onChange={userForm.handleChange}
              value={formSocialMedia}
              currentChecked={formPicked}
              socialMedia={socialMediaObject}
              setSocialMedia={setSocialMediaObject}
            />
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
