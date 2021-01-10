import React from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
  RouteProps,
} from 'react-router-dom';

import ROUTES from './routes';
import { AuthService } from './services'

interface PrivateRouteProps extends RouteProps {
  component: React.FC,
  isAuth: boolean,
  redirectPath?: string,
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const {
    component: Component,
    isAuth,
    redirectPath = '/auth/registration',
    ...restProps
  } = props;

  const privateComponent = isAuth
    ? <Component {...restProps} />
    : <Redirect to={redirectPath} />;

  return (
    <Route
      {...restProps}
      render={() => privateComponent}
    />
  )
};

const AuthContext = React.createContext({
  isAuth: false,
  user: null,
  fetchUser: () => console.log('fetching'),
});


function App() {
  const [user, setUser] = React.useState(null);
  const isAuth: boolean = AuthService.isAuth;

  // const fetchUser = () => {
  //   setUser(prevState => ({
  //     name: 'User'
  //   }))
  // }

  return (
      <Router>
        <Switch>
          {ROUTES.map((route, index) => (
            route.private && AuthService.isAuth
              ? <PrivateRoute key={index} isAuth={isAuth} {...route} />
              : <Route key={index} component={route.component} path={route.path} />
          ))}
          <Route render={() => <Redirect to='/games'/>} />
        </Switch>
      </Router>
  );
}

export default App;
