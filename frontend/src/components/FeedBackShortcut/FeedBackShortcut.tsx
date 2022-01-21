import React from 'react';
import style from './FeedBackShortcut.module.scss';

const FeedBackShortcut = () => {
  return (
    <button className={style.feedback}>
      <div className={style.feedback__wrapper}>
        <div className={style.feedback__title}>Google Junior Front-End</div>
        <div className={style.feedback__text}>
          Date <span className={style.feedback__text_strong}>15.01.2022</span>
        </div>
        <div className={style.feedback__text}>
          Interviewer{' '}
          <span className={style.feedback__text_strong}>drotov@gmail.com</span>
        </div>
        <div className={`${style.feedback__text} ${style.feedback__mark}`}>
          Mark
          <img src={'./assets/icon/markOK.svg'} alt="" />
        </div>
      </div>
    </button>
  );
};

export default FeedBackShortcut;
