import React, { FC } from 'react';
import style from './FormInput.module.scss';

interface IProps {
  label: string;
  type?: string;
}

const FormInput: FC<IProps> = ({ label, type = 'text' }) => {
  return (
    <label className={style.input__wrapper} htmlFor="fromInput">
      <input className={style.input} id={'fromInput'} type={type} />
      <span className={style.input__label}>{label}</span>
    </label>
  );
};

export default FormInput;
