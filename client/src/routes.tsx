import {
  GamePage,
  LoginPage,
  RegistrationPage,
} from './pages'


const ROUTES = [
  {
    path: '/',
    private: true,
    component: GamePage,
  },
  {
    path: '/auth/registration',
    component: RegistrationPage,
  },
  {
    path: '/auth/login',
    component: LoginPage,
  },
];

export default ROUTES;
