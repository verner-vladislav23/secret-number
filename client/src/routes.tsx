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
    component: GamesPage,
  },
  {
    path: '/games/:id',
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
