import React, { FC } from 'react';
import style from './SearchInput.module.scss';

const SearchInput: FC = React.memo(() => {
  return (
    <input className={style.input} placeholder={'Search...'} type="text" />
  );
});

export default SearchInput;
