import React, { FC } from 'react';
import s from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <div className={s.footer}>
      <a
        className={s.footer__course}
        href="https://rs.school/js/"
        target={'_blank'}
      >
        <img src={'./assets/icon/rsSchoolLogo.svg'} alt="Rs School" />
      </a>
      <div className={s.footer__text}>2022</div>
      <div className={s.github}>
        <img
          className={s.github__icon}
          src={'./assets/icon/gitHub.svg'}
          alt="GitHub"
        />
        <div className={s.github__text}>github</div>
      </div>
      <div className={s.footer__text_wrapper}>
        <a
          className={`${s.footer__developers} ${s.footer__text}`}
          target={'_blank'}
          href="https://github.com/algolj/Sobbi"
        >
          algolj
        </a>
        ·
        <a
          className={`${s.footer__developers} ${s.footer__text}`}
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
