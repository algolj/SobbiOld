import React, { FC } from 'react';
import Title from '../../components/UI/Title/Title';
import colors from '../../styles/index.scss';
import style from './User.module.scss';
import FeedBackShortcut from '../../components/FeedBackShortcut/FeedBackShortcut';
import InfoItem from '../../components/UI/InfoItem/InfoItem';

const User: FC = () => {
  return (
    <div className={style.user}>
      <Title color={colors.white}>REBECCA SMITCH, 27</Title>
      <div className={style.user__avatar}>
        <img
          className={style.user__photo}
          src={'./assets/icon/logIn.svg'}
          alt=""
        />
      </div>

      <div className={style.user__info}>
        <div className={style.user__mail_wrapper}>
          <div className={style.user__mail_title}>E-mail</div>
          <div className={style.user__mail}>beccasmith@gmail.com</div>
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
      <div className={style.user__feedbacks}>
        <FeedBackShortcut />
      </div>
    </div>
  );
};

export default User;
