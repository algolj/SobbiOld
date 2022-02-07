import React, { FC, SetStateAction } from 'react';
import style from '../../pages/User/User.module.scss';
import UserForm from '../UserForm/UserForm';
import InfoItem from '../UI/InfoItem/InfoItem';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GenderEnum } from '../../types/userTypes';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';

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
  formImage: Buffer;
}

interface IProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<SetStateAction<boolean>>;
}

const UserBasicInfo: FC<IProps> = React.memo(({ isEdit, setIsEdit }) => {
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

  const { Male, Female, Other } = GenderEnum;
  const genderArray = [Male, Female, Other];
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

  return (
    <div className={style.user__info_wrapper}>
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
          {socialMedia
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
  );
});

export default UserBasicInfo;
