import React, { FC } from 'react';
import Title from '../../components/UI/Title/Title';
import colors from '../../styles/index.scss';
import s from './User.module.scss';
import FeedBackShortcut from '../../components/FeedBackShortcut/FeedBackShortcut';
import InfoItem from '../../components/UI/InfoItem/InfoItem';

const User: FC = () => {
  return (
    <div className={s.user}>
      <Title color={colors.white}>REBECCA SMITCH, 27</Title>
      <div className={s.user__avatar}>
        <img className={s.user__photo} src={'./assets/icon/logIn.svg'} alt="" />
      </div>

      <div className={s.user__info}>
        <div className={s.user__mail_wrapper}>
          <div className={s.user__mail_title}>E-mail</div>
          <div className={s.user__mail}>beccasmith@gmail.com</div>
        </div>
        <div className={s.user__info_item}>
          <InfoItem referral={''} name={'sex.svg'} />
        </div>
        <div className={s.user__info_media}>
          <InfoItem
            referral={'https://github.com/VaniaToper'}
            name={'gitHub.svg'}
          />
          <InfoItem referral={''} name={'linkedIn.svg'} />
          <InfoItem referral={''} name={'facebook.svg'} />
        </div>
      </div>
      <div className={s.user__feedbacks}>
        <FeedBackShortcut />
      </div>
    </div>
  );
};

export default User;
