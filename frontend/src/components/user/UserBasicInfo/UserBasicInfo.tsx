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
import { Formik } from 'formik';
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
    useEffect(() => {
      // getUserAvatar(imagePath);
    }, []);

    const [socialMediaObject, setSocialMediaObject] = useState<ISocialMedia>(
      {},
    );
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
    // const userForm = useFormik({
    //   enableReinitialize: true,
    //   initialValues: {
    //     formUsername: username,
    //     formEmail: email,
    //     formFirstName: firstName,
    //     formLastName: lastName,
    //     formSocialMedia: '',
    //     formBio: bio,
    //     formPicked: '',
    //     formGender: gender,
    //     formDateOfBirth: dateOfBirth,
    //     formCountry: country,
    //     formImage: image,
    //   },
    //   validationSchema: Yup.object({
    //     // login: Yup.string().required('Required'),
    //   }),
    //   onSubmit: async (values: IUserForm) => {
    //     return;
    //   },
    // });
    //
    // const {
    //   formEmail,
    //   formUsername,
    //   formFirstName,
    //   formLastName,
    //   formBio,
    //   formSocialMedia,
    //   formPicked,
    //   formGender,
    //   formDateOfBirth,
    //   formCountry,
    //   formImage,
    // }: IUserForm = userForm.values;
    //
    // const userInfoUpdate: IUserInfo = {
    //   socialMedia: socialMediaObject,
    //   gender: formGender,
    //   firstName: formFirstName,
    //   lastName: formLastName,
    //   dateOfBirth: formDateOfBirth,
    //   bio: formBio,
    //   country: formCountry,
    //   imageFile: formImage,
    // };
    // const userLoginUpdate: IUserLogin = {
    //   email: formEmail,
    //   username: formUsername,
    // };
    const initialValues: IUserForm = {
      formUsername: username,
      formEmail: email,
      formFirstName: firstName,
      formLastName: lastName,
      formBio: bio,
      formSocialMedia: socialMedia,
      formGender: gender,
      formDateOfBirth: dateOfBirth,
      formCountry: country,
      formImage: image,
      socialMediaPicked: '',
    };

    const onSubmit = (values: IUserForm) => {
      // const userLoginUpdate: IUserLogin = {
      //   email: values.formEmail,
      //   username: values.formUsername,
      // };
      const userInfoUpdate: IUserInfo = {
        socialMedia: socialMediaObject,
        gender,
        firstName,
        lastName,
        dateOfBirth,
        bio,
        country,
        image,
      };
      setUpdateUserInfo(userInfoUpdate);
      // setUpdateUserLogin(userLoginUpdate);
    };

    return (
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form className={style.user} onSubmit={handleSubmit}>
            <Title color={colors.white}>
              {isEditUser ? (
                <input
                  className={styleTitle.title}
                  name={'formUsername'}
                  value={values.formUsername}
                  onChange={handleChange}
                />
              ) : (
                username
              )}
            </Title>
            <div className={style.user__info_wrapper}>
              <UserAvatar
                formField={'fromImage'}
                setFormImage={setFieldValue}
              />
              <div className={style.user__info}>
                <div className={style.user__info_name}>
                  <UserForm
                    value={values.formFirstName}
                    onChange={handleChange}
                    label={'First name'}
                    name={'formFirstName'}
                  />
                  <UserForm
                    value={values.formLastName}
                    onChange={handleChange}
                    label={'Last name'}
                    name={'formLastName'}
                  />
                </div>
                <UserForm
                  value={values.formEmail}
                  onChange={handleChange}
                  label={'E-mail'}
                  name={'formEmail'}
                />
                <UserForm
                  value={values.formDateOfBirth}
                  onChange={handleChange}
                  label={'Birth'}
                  name={'formDateOfBirth'}
                  type={'date'}
                />
                {isEditUser ? (
                  <InfoSelect
                    value={values.formCountry}
                    title={'Country'}
                    options={countryOptions}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue('formCountry', e.target.value)
                    }
                    name={'formCountry'}
                  />
                ) : (
                  <UserForm
                    label={'Country'}
                    ableToChange={false}
                    value={values.formCountry}
                  />
                )}
                <UserGender gender={gender} setGender={handleChange} />
                <SocialMedia
                  onChange={handleChange}
                  value={values.formSocialMedia}
                  currentChecked={values.socialMediaPicked}
                  socialMedia={socialMediaObject}
                  setSocialMedia={setSocialMediaObject}
                />
              </div>
            </div>
            <UserBio onChange={handleChange} value={values.formBio} />
          </form>
        )}
      </Formik>
    );
  },
);

export default UserBasicInfo;
