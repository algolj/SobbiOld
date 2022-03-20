import React, { FC, SetStateAction } from 'react';
import style from './FormInput.module.scss';

interface IProps {
  label: string;
  value?: string;
  name?: string;
  onChange: any;
  onBlur?: any;
  type?: string;
  isAdd?: boolean;
  addArray?: string[];
  setAddArray?: React.Dispatch<SetStateAction<string[]>>;
}

const FormInput: FC<IProps> = React.memo(
  ({
    label,
    type = 'text',
    onChange,
    onBlur,
    value,
    name,
    isAdd,
    addArray,
    setAddArray,
  }) => {
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
        {addArray?.length && isAdd
          ? addArray.map(() => {
              let translate = 0;
              translate += 30;
              return (
                <div
                  style={{ transform: `translateY(-${translate})` }}
                  className={style.input_sub}
                >
                  <span className={style.input_sub__text}>
                    vanjaqwe59@sd,/cs
                  </span>
                  <button
                    className={`${style.input_sub__button} ${style.input__button}`}
                  >
                    +
                  </button>
                </div>
              );
            })
          : null}
        {/*{isAdd ? (*/}
        {/*  <div*/}
        {/*    onClick={() => {*/}
        {/*      if (addArray && setAddArray) setAddArray([...addArray, value]);*/}
        {/*    }}*/}
        {/*    className={style.input__button}*/}
        {/*  >*/}
        {/*    +*/}
        {/*  </div>*/}
        {/*) : null}*/}
        {/*{Object.values(formik.errors)[index] &&*/}
        {/*Object.values(formik.touched)[index] ? (*/}
        {/*  <p>{Object.values(formik.errors)[index]}</p>*/}
        {/*) : null}*/}
      </label>
    );
  },
);

export default FormInput;
