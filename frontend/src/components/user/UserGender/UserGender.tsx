import React, { FC, SetStateAction } from 'react';
import style from './UserGender.module.scss';
import InfoItem from '../../UI/InfoItem/InfoItem';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { GenderEnum } from '../../../types/userTypes';

interface IProps {
  gender: string;
  setGender: (e: React.ChangeEvent) => void;
}

const UserGender: FC<IProps> = ({ gender, setGender }) => {
  const { isEditUser } = useTypeSelector((state) => state.user);
  const { Male, Female, Other } = GenderEnum;
  const genderArray: Array<GenderEnum> = [Male, Female, Other];
  return (
    <div className={style.gender}>
      {isEditUser ? (
        <div className={style.gender__wrapper}>
          {genderArray.map((genderItem) => (
            <label key={genderItem}>
              <InfoItem isButton={true} checked={gender} name={genderItem} />
              <input
                className={style.gender__radio}
                id={'formGender'}
                type={'radio'}
                name={'formGender'}
                value={genderItem}
                onChange={setGender}
              />
            </label>
          ))}
        </div>
      ) : (
        <InfoItem isClickable={false} name={gender} />
      )}
    </div>
  );
};

export default UserGender;
