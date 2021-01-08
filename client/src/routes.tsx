import {
  GamePage,
  GamesPage,
  LoginPage,
  RegistrationPage,
} from './pages'


const ROUTES = [
  {
    path: '/',
    private: true,
    component: GamesPage,
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
