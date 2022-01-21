import React from 'react';
import s from './FeedBackShortcut.module.scss';

const FeedBackShortcut = () => {
  return (
    <button className={s.feedback}>
      <div className={s.feedback__wrapper}>
        <div className={s.feedback__title}>Google Junior Front-End</div>
        <div className={s.feedback__text}>
          Date <span className={s.feedback__text_strong}>15.01.2022</span>
        </div>
        <div className={s.feedback__text}>
          Interviewer{' '}
          <span className={s.feedback__text_strong}>drotov@gmail.com</span>
        </div>
        <div className={`${s.feedback__text} ${s.feedback__mark}`}>
          Mark
          <img src={'./assets/icon/markOK.svg'} alt="" />
        </div>
      </div>
    </button>
  );
};

export default FeedBackShortcut;
