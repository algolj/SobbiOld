import React from 'react';
import style from './Room.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import TestsSearcher from '../../components/TestsSeacher/TestsSearcher';

const Room = () => {
  return (
    <div className={style.room}>
      <div className={style.room__menu}>
        <div className={style.room__navigation}>
          <NavBar
            navBars={[
              ['text', 'tasks', 'live coding'],
              ['core', 'frameworks', 'algorithms'],
            ]}
          />
        </div>
        <div className={style.room__searcher}>
          <TestsSearcher />
        </div>
      </div>
    </div>
  );
};

export default Room;
