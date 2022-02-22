import React, { FC, SetStateAction } from 'react';
import style from './SearchInput.module.scss';

interface IProps {
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e?: any) => void;
}

const SearchInput: FC<IProps> = React.memo(
  ({ name, onChange, value, placeholder, onKeyUp }) => {
    return (
      <input
        onKeyUp={(e) => {
          if (e.keyCode === 13 && onKeyUp) onKeyUp();
        }}
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
