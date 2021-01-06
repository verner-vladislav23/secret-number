import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { isCorrectLogin, isCorrectName, isCorrectPassword } from '../helpers/validators';

type LoginSchema = {
  login: string,
  password: string
}

type RegistrationSchema = LoginSchema & {
  name: string
}

const loginSchema: SchemaOf<LoginSchema> = yup.object({
  login: yup
    .string()
    .strict()
    .required().
    test(
    'correctLogin',
      'Invalid login format',
    (login: string): boolean => isCorrectLogin(login),
    ),
  password: yup
    .string()
    .required()
    .min(5)
    .test(
    'correctPassword',
    'Invalid password format',
    (password: string): boolean => isCorrectPassword(password),
  )
});

const registrationSchema: SchemaOf<RegistrationSchema> = yup.object({
  name: yup
    .string()
    .strict()
    .required()
    .test(
      'correctName',
      'Invalid name format',
      (name: string): boolean => isCorrectName(name),
    ),
  login: yup
    .string()
    .strict()
    .required().
    test(
      'correctLogin',
      'Invalid login format',
      (login: string): boolean => isCorrectLogin(login),
    ),
  password: yup
    .string()
    .strict()
    .required()
    .min(5)
    .test(
      'correctPassword',
      'Invalid password format',
      (password: string): boolean => isCorrectPassword(password),
    )
});

export {
  loginSchema,
  registrationSchema,
}
