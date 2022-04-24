import * as Yup from 'yup';

export const useValidationSchema = () => {
  const createEmailValidation = () => {
    return Yup.string()
      .trim()
      .email('Wrong email')
      .required('The field is required');
  };
};
