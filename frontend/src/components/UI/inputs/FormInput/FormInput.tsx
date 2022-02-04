import React, { FC } from 'react';
import style from './FormInput.module.scss';

interface IProps {
  label: string;
  value: string;
  name?: string;
  onChange: any;
  onBlur?: any;
  type?: string;
}

const FormInput: FC<IProps> = React.memo(
  ({ label, type = 'text', onChange, onBlur, value, name }) => {
    return (
      <label className={style.input__wrapper} htmlFor="formInput">
        <input
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={style.input}
          id={'formInput'}
          type={type}
        />
        <span className={style.input__label}>{label}</span>
        {/*{Object.values(formik.errors)[index] &&*/}
        {/*Object.values(formik.touched)[index] ? (*/}
        {/*  <p>{Object.values(formik.errors)[index]}</p>*/}
        {/*) : null}*/}
      </label>
    );
  },
);

export default FormInput;
