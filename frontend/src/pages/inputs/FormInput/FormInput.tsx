import React, { FC, SetStateAction } from 'react';
import style from './FormInput.module.scss';

interface IProps {
  label: string;
  value: string;
  onChange: any;
  onBlur?: any;
  type?: string;
}

const FormInput: FC<IProps> = ({
  label,
  type = 'text',
  onChange,
  onBlur,
  value,
}) => {
  return (
    <label className={style.input__wrapper} htmlFor="formInput">
      <input
        name={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={style.input}
        id={'formInput'}
        type={type}
      />
      <span className={style.input__label}>{label}</span>
    </label>
  );
};

export default FormInput;
