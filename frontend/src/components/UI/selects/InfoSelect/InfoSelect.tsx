import React, { FC, SetStateAction, useState } from 'react';
import style from './InfoSelect.module.scss';
import { IOptions } from '../../../../types/types';
import { useTypeSelector } from '../../../../hooks/useTypeSelector';

interface IProps {
  title: string;
  options: IOptions[];
  onChange?: any;
  name: string;
  value: string;
  isBasic?: boolean;
  defaultDisable?: boolean;
}

const InfoSelect: FC<IProps> = React.memo(
  ({
    title,
    options,
    onChange,
    name,
    value,
    isBasic = true,
    defaultDisable = false,
  }) => {
    const { isEditUser } = useTypeSelector((state) => state.user);
    const [currentChecked, setCurrentChecked] = useState<string>('');
    return (
      <form
        className={`${
          isEditUser || defaultDisable ? null : style.select_disable
        }`}
      >
        <ul
          className={`${style.tickets_type__entrance} ${style.select} ${
            isBasic ? null : style.select_basic
          }`}
        >
          <li>
            <input
              type="radio"
              className={style.select__close}
              name={name}
              id={`${title}close`}
            />
            <label
              htmlFor={`${title}open`}
              className={`${style.select__label} ${style.select__label_placeholder} `}
            >
              <div
                className={
                  isBasic ? null : style.select__label_placeholder_basic
                }
              >
                {title}
              </div>
            </label>
          </li>
          <li
            className={`${style.select__items} ${
              isBasic ? null : style.select__items_basic
            }`}
          >
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
                <li
                  key={option.id}
                  className={isBasic ? null : style.select__option}
                >
                  <input
                    name={name}
                    onChange={onChange}
                    checked={value === option.value}
                    value={option.value}
                    className={style.select__input}
                    type="radio"
                    id={option.id}
                  />
                  <label
                    className={`${style.select__label} ${
                      isBasic ? null : style.select__label_basic
                    }`}
                    htmlFor={option.id}
                  >
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

export default InfoSelect;
