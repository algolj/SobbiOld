import React, { FC } from 'react';
import style from './RoomTest.module.scss';

interface IProps {
  difficulty: string;
}

const RoomTest: FC<IProps> = ({ difficulty }) => {
  return (
    <div className={style.test}>
      <button className={style.test__rectangle}>
        <div className={style.test__header}>
          <div className={style.test__title}>
            Child input displays value but does not change it
          </div>
          <div className={style.test__difficulty}>#{difficulty}</div>
        </div>
        <div className={style.test__text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, aliquam
          varius id quisque mi. Libero, morbi commodo sed lacus magna rhoncus,
          tellus non vestibulum.
        </div>
      </button>
    </div>
  );
};

export default RoomTest;
