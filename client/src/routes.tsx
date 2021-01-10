import {
  GamePage,
  GamesPage,
  LoginPage,
  RegistrationPage,
} from './pages'

const ROUTES = [
  {
    path: '/games',
    private: true,
    exact: true,
    component: GamesPage,
  },
  {
    path: '/games/:id',
    private: true,
    exact: true,
    component: GamePage,
  },
  {
    path: '/auth/registration',
    exact: true,
    component: RegistrationPage,
  },
  {
    path: '/auth/login',
    exact: true,
    component: LoginPage,
  },
];

export default ROUTES;
