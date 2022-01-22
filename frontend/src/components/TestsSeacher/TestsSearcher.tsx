import React from 'react';
import style from './TestsSearcher.module.scss';
import Button from '../UI/Button/Button';
import SearchInput from '../../pages/inputs/SearchInput/SearchInput';

const TestsSearcher = () => {
  return (
    <div className={style.searcher}>
      <div className={style.searcher__title}>Loss of this</div>
      <div className={style.searcher__difficulty}>
        <Button>hard</Button>
        <Button>medium</Button>
        <Button>easy</Button>
      </div>
      <SearchInput />
    </div>
  );
};

export default TestsSearcher;
