import React from 'react';
import s from './RoomSection.module.scss';
import Button from '../UI/Button/Button';
import Title from '../UI/Title/Title';
import colors from '../../styles/vars.module.scss';

const RoomSection = () => {
  return (
    <section className={s.room}>
      <div className={s.room__wrapper}>
        <Title color={colors.wheat}>Room</Title>
        <div className={s.room__buttons}>
          <Button height={'200px'} width={'200px'}>
            Create
          </Button>
          <Button height={'200px'} width={'200px'}>
            Enter
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoomSection;
