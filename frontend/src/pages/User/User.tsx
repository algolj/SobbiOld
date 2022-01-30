import React, { FC } from 'react';
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
  const { user, isAuth } = UseTypeSelector((state) => state.user);
  const { logoutUser, deleteUser } = useActions();
  const { username, email, password, bio } = user;
  return (
    <div className={style.user}>
      <Title color={colors.white}>{username}</Title>
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
            <a className={style.user__mail} href={`mailto:${email}`}>
              {email}
            </a>
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
