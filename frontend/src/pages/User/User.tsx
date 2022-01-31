import React, { FC, useEffect, useState } from 'react';
import Title from '../../components/UI/Title/Title';
import colors from '../../styles/index.scss';
import style from './User.module.scss';
import FeedbackShortcut from '../../components/FeedbackShortcut/FeedbackShortcut';
import InfoItem from '../../components/UI/InfoItem/InfoItem';
import { UseTypeSelector } from '../../hooks/useTypeSelector';
import Button from '../../components/UI/Button/Button';
import { useActions } from '../../hooks/useActions';
import { Link } from 'react-router-dom';

const User: FC = () => {
  const {
    user: { username, password, bio, email },
  } = UseTypeSelector((state) => state.user);
  const { logoutUser, deleteUser, changeUserName, changeUserEmail } =
    useActions();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputUsername, setInputUsername] = useState<string>('');
  useEffect(() => {
    if (email) setInputEmail(email);
    if (username) setInputUsername(username);
  }, [email, username]);
  return (
    <div className={style.user}>
      <Title color={colors.white}>
        {isEdit ? (
          <input
            type="text"
            value={inputUsername}
            onChange={(e) => {
              setInputUsername(e.target.value);
            }}
          />
        ) : (
          inputUsername
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
          <div className={style.user__mail_wrapper}>
            <div className={style.user__mail_title}>E-mail</div>
            {isEdit ? (
              <input
                type="text"
                value={inputEmail}
                onChange={(e) => {
                  setInputEmail(e.target.value);
                }}
              />
            ) : (
              <a className={style.user__mail} href={`mailto:${inputEmail}`}>
                {inputEmail}
              </a>
            )}
          </div>
          <div className={style.user__info_item}>
            <InfoItem referral={''} name={'sex.svg'} />
          </div>
          <div className={style.user__info_media}>
            <InfoItem
              referral={'https://github.com/VaniaToper'}
              name={'gitHub.svg'}
            />
            <InfoItem referral={''} name={'linkedIn.svg'} />
            <InfoItem referral={''} name={'facebook.svg'} />
          </div>
        </div>
      </div>
      {bio ? (
        <div className={style.user__description}>
          <div className={style.user__title}>About me</div>
          <div className={style.user__description_text}>{bio}</div>
        </div>
      ) : (
        ''
      )}
      <div className={style.user__feedbacks}>
        <div className={style.user__title}>Feedbacks</div>
        <FeedbackShortcut />
      </div>
      <Button onClick={() => setIsEdit(!isEdit)}>Edit</Button>
      <Button
        onClick={() => {
          changeUserEmail(inputEmail);
          changeUserName(inputUsername);
          setIsEdit(false);
        }}
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
    </div>
  );
};

export default User;
