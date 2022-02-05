import React, { FC } from 'react';
import style from './SearchInput.module.scss';

interface IProps {
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<IProps> = React.memo(
  ({ name, onChange, value, placeholder }) => {
    return (
      <input
        className={style.input}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type="text"
      />
    );
  },
);

export default SearchInput;
