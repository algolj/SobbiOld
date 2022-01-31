import React, { FC, SetStateAction, useEffect, useState } from 'react';
import style from '../Header/Header.module.scss';
import FormInput from '../../pages/inputs/FormInput/FormInput';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import { UseTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ILoginUser } from '../../types/userTypes';

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

interface IUser {
  username: string;
  email: string;
  password: string;
}

const RegistrationModal: FC<IProps> = ({ isVisible, setIsVisible }) => {
  const { isAuth } = UseTypeSelector((state) => state.user);
  const { createUser, loginUser, checkAuth } = useActions();
  const registerFormik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().max(15, 'Too long').required('user'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().max(15, 'Too long').required('pass'),
    }),
    onSubmit: (values: IUser) => {
      createUser(values);
      setIsVisible(false);
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: Yup.object({
      login: Yup.string().required('Required'),
    }),
    onSubmit: (values: ILoginUser) => {
      loginUser(values);
      setIsVisible(false);
    },
  });
  useEffect(() => {
    if (localStorage.getItem('token')) checkAuth();
  }, []);

  const [isRegistration, setIsRegistration] = useState<boolean>(true);
  const formTitle = isRegistration ? 'Register' : 'Log In';
  const formik = isRegistration ? registerFormik : loginFormik;
  return (
    <Modal
      setVisibility={setIsVisible}
      visibility={isVisible}
      title={formTitle}
    >
      <form onSubmit={formik.handleSubmit} className={style.form}>
        {Object.keys(formik.values).map((value, index) => {
          return (
            <div key={value}>
              <FormInput
                value={Object.values(formik.values)[index]}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label={Object.keys(formik.values)[index]}
              />
              {Object.values(formik.errors)[index] &&
              Object.values(formik.touched)[index] ? (
                <p>{Object.values(formik.errors)[index]}</p>
              ) : null}
            </div>
          );
        })}
        <span onClick={() => setIsRegistration(!isRegistration)}>
          {isRegistration ? 'Log In' : 'Register'}
        </span>
        <div className={style.form__button}>
          <Button>{formTitle}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default RegistrationModal;
