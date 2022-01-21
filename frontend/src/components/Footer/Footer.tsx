import React, { FC } from 'react';
import style from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <div className={style.footer}>
      <a
        className={style.footer__course}
        href="https://rstyle.school/js/"
        target={'_blank'}
      >
        <img src={'./assets/icon/rsSchoolLogo.svg'} alt="Rs School" />
      </a>
      <div className={style.footer__text}>2022</div>
      <div className={style.github}>
        <img
          className={style.github__icon}
          src={'./assets/icon/gitHub.svg'}
          alt="GitHub"
        />
        <div className={style.github__text}>github</div>
      </div>
      <div className={style.footer__text_wrapper}>
        <a
          className={`${style.footer__developers} ${style.footer__text}`}
          target={'_blank'}
          href="https://github.com/algolj/Sobbi"
        >
          algolj
        </a>
        ·
        <a
          className={`${style.footer__developers} ${style.footer__text}`}
          target={'_blank'}
          href="https://github.com/VaniaToper"
        >
          vaniatoper
        </a>
      </div>
    </div>
  );
};

export default Footer;
