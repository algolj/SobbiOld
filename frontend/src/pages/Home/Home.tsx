import React, { FC } from 'react';
import s from './Home.module.scss';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';

const Home: FC = () => {
  return (
    <div className={s.home}>
      <WelcomeSection />
      {/*<Button padding={'30px'} children={'Create'} />*/}
    </div>
  );
};

export default Home;
