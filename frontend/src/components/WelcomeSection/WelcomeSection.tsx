import React from 'react';
import s from './WelcomeSection.module.scss';
import sprite from '../../assets/sprite.svg';

const WelcomeSection = () => {
  return (
    <section className={s.welcome}>
      <div className={s.welcome__title_wrapper}>
        <div className={s.welcome__title}>Sobbi</div>
        <div className={s.welcome__subtitle}>
          Look at the interview differently with
        </div>
      </div>
      <div className={s.welcome__text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </div>
      <svg className={s.welcome__arrow}>
        <use href={`${sprite}#arrow`} />
      </svg>
    </section>
  );
};

export default WelcomeSection;
