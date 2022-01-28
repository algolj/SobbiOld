import React, { FC, SetStateAction } from 'react';
import style from './FormInput.module.scss';

interface IProps {
  label: string;
  value: string;
  onChange: React.Dispatch<SetStateAction<string>>;
  type?: string;
}

const FormInput: FC<IProps> = ({ label, type = 'text', onChange, value }) => {
  return (
    <label className={style.input__wrapper} htmlFor="fromInput">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={style.input}
        id={'fromInput'}
        type={type}
      />
      <span className={style.input__label}>{label}</span>
    </label>
  );
};

export default FormInput;
