import React, { FC, SetStateAction, useEffect, useState } from 'react';
import style from '../Header/Header.module.scss';
import FormInput from '../UI/inputs/FormInput/FormInput';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ILoginUser, IUser } from '../../types/userTypes';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';

interface IProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
}

const RegistrationModal: FC<IProps> = React.memo(
  ({ isVisible, setIsVisible }) => {
    const { isAuth } = useTypeSelector((state) => state.user);
    const { createUser, loginUser, checkAuth } = useActions();
    const registerForm = useFormik({
      initialValues: {
        username: '',
        email: '',
        password: '',
      },
      validationSchema: Yup.object({
        // username: Yup.string().max(15, 'Too long').required('user'),
        // email: Yup.string().email('Invalid email').required('email'),
        // password: Yup.string().max(15, 'Too long').required('pass'),
      }),
      onSubmit: async (values: IUser) => {
        await createUser(values);
        setIsVisible(false);
      },
    });

    const loginForm = useFormik({
      initialValues: {
        login: '',
        password: '',
      },
      validationSchema: Yup.object({
        // login: Yup.string().required('Required'),
      }),
      onSubmit: async (values: ILoginUser) => {
        await loginUser(values);
        setIsVisible(false);
      },
    });
    useEffect(() => {
      if (localStorage.getItem('token')) checkAuth();
    }, []);

    const [isRegistration, setIsRegistration] = useState<boolean>(false);
    const formTitle = isRegistration ? 'Register' : 'Log In';
    const formik = isRegistration ? registerForm : loginForm;
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
                  name={Object.keys(formik.values)[index]}
                  value={Object.values(formik.values)[index]}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  label={Object.keys(formik.values)[index]}
                />
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
  },
);

export default RegistrationModal;
