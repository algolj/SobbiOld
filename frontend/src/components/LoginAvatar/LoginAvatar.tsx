import React, { FC, SetStateAction } from 'react';
import style from './LoginAvatar.module.scss';
import { Link } from 'react-router-dom';
import sprite from '../../assets/sprite.svg';
import { useTypeSelector } from '../../hooks/useTypeSelector';

interface IProps {
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  onClick?: () => void;
}

const LoginAvatar: FC<IProps> = React.memo(({ setIsVisible, onClick }) => {
  const { isAuth } = useTypeSelector((state) => state.user);
  return (
    <>
      {isAuth ? (
        <div
          onClick={onClick}
          style={{ background: 'red', width: '30px', height: '30px' }}
        />
      ) : (
        <button
          onClick={() => setIsVisible(true)}
          className={style.login__wrapper}
        >
          <svg className={style.login}>
            <use href={`${sprite}#logIn`} />
          </svg>
          <img
            className={style.login__hover}
            src={'./assets/icon/loginText.svg'}
            alt="login text"
          />
        </button>
      )}
    </>
  );
});

export default LoginAvatar;
