import React, { useState } from 'react';
import style from './TestsSearcher.module.scss';
import Button from '../UI/Button/Button';
import SearchInput from '../../pages/inputs/SearchInput/SearchInput';
import RoomTest from '../RoomTest/RoomTest';

const TestsSearcher = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={
        isOpen ? `${style.searcher} ${style.searcher_open}` : style.searcher
      }
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={style.searcher__header}
      >
        <div className={style.searcher__title}>Loss of this</div>
        <img
          className={style.searcher__header_arrow}
          src={'./assets/icon/triangle.svg'}
          alt="arrow"
        />
      </div>
      <div className={style.searcher__content}>
        <div className={style.searcher__filters}>
          <div className={style.searcher__difficulty}>
            <Button>hard</Button>
            <Button>medium</Button>
            <Button>easy</Button>
          </div>
          <SearchInput />
        </div>
        <div className={style.searcher__tests}>
          <RoomTest difficulty={'easy'} />
          <RoomTest difficulty={'easy'} />
          <RoomTest difficulty={'easy'} />
          <RoomTest difficulty={'easy'} />
        </div>
      </div>
    </div>
  );
};

export default TestsSearcher;
