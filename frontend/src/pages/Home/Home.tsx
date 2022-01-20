import React, { FC } from 'react';
import s from './Home.module.scss';
import Button from '../../components/UI/Button/Button';

const Home: FC = () => {
  return (
    <div>
      <Button padding={'30px'} children={'Create'} />
    </div>
  );
};

export default Home;
