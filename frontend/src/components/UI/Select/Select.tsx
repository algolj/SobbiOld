import React, { FC, SetStateAction, useState } from 'react';
import style from './Select.module.scss';
import { IOptions } from '../../../types/types';
import { useTypeSelector } from '../../../hooks/useTypeSelector';

interface IProps {
  title: string;
  options: IOptions[];
  onChange?: React.Dispatch<SetStateAction<string>>;
  name: string;
  value: string;
}

const Select: FC<IProps> = React.memo(
  ({ title, options, onChange, name, value }) => {
    const { isEdit } = useTypeSelector((state) => state.user);
    const [currentChecked, setCurrentChecked] = useState<string>('');
    return (
      <form className={isEdit ? null : style.select_disable}>
        <ul className={`${style.tickets_type__entrance} ${style.select}`}>
          <li>
            <input
              type="radio"
              className={style.select__close}
              name={name}
              id={`${title}close`}
            />
            <label
              htmlFor={`${title}open`}
              className={`${style.select__label} ${style.select__label_placeholder}`}
            >
              {title}
            </label>
          </li>
          <li className={style.select__items}>
            <input
              type="radio"
              className={style.select__expand}
              name={name}
              id={`${title}open`}
            />
            <label
              className={style.select__close_label}
              htmlFor={`${title}close`}
            />
            <ul className={style.select__options}>
              {options.map((option) => (
                <li key={option.id} className={style.select__option}>
                  <input
                    name={name}
                    onChange={() => {
                      if (onChange) onChange(option.value);
                    }}
                    value={option.value}
                    className={style.select__input}
                    type="radio"
                    id={option.id}
                    checked={value === option.value}
                  />
                  <label className={style.select__label} htmlFor={option.id}>
                    {option.title}
                  </label>
                </li>
              ))}
            </ul>
            <label
              className={style.select__expand_label}
              htmlFor={`${title}open`}
            />
          </li>
        </ul>
      </form>
    );
  },
);

export default Select;
