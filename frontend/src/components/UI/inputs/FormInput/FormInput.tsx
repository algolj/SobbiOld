import React, { FC, SetStateAction, useId, useState } from 'react';
import style from './FormInput.module.scss';
import cn from 'classnames';
import uniqid from 'uniqid';

interface IProps {
  label: string;
  value?: string;
  name?: string;
  onChange: any;
  onBlur?: any;
  type?: string;
  isAbleToAddSubInput?: boolean;
  errorMessage?: string;
}

const FormInput: FC<IProps> = React.memo(
  ({
    label,
    type = 'text',
    onChange,
    onBlur,
    value,
    name,
    isAbleToAddSubInput,
    errorMessage,
    ...props
  }) => {
    const [subInputs, setSubInputs] = useState<Array<string>>([]);
    // const [subInputs, setSubInputs] = useState<Array<string>>();
    const addSubInput = () => {
      if (value) {
        setSubInputs([...subInputs, value]);
      }
    };
    const removeSubInput = (subInputText: string) => {
      const newSubInputs = subInputs.filter(
        (subInput) => subInput !== subInputText,
      );
      setSubInputs(newSubInputs);
    };
    return (
      <div className={style.form_input__wrapper}>
        <label className={style.input__wrapper} htmlFor="formInput">
          <input
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={style.input}
            id={'formInput'}
            type={type}
            {...props}
          />
          <span className={style.input__label}>{label}</span>
          {isAbleToAddSubInput && (
            <div onClick={addSubInput} className={style.input__button}>
              +
            </div>
          )}
          {errorMessage && (
            <div className={style.input__error}>{errorMessage}</div>
          )}
        </label>
        {isAbleToAddSubInput &&
          subInputs.map((subInputValue) => (
            <div key={uniqid()} className={style.input_sub}>
              <span className={style.input_sub__text}>{subInputValue}</span>
              <button
                onClick={() => removeSubInput(subInputValue)}
                className={cn(style.input__button, style.input__remove_button)}
              >
                +
              </button>
            </div>
          ))}
      </div>
    );
  },
);

export default FormInput;
