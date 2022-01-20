import React, { FC } from 'react';
import s from './Home.module.scss';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import RoomSection from '../../components/RoomSection/RoomSection';

const Home: FC = () => {
  return (
    <div className={s.home}>
      <WelcomeSection />
      <RoomSection />
    </div>
  );
};

export default Home;
