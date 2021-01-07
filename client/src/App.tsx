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

function App() {
  const isAuth: boolean = AuthService.isAuth;

  return (
    <Router>
        <Switch>
          {ROUTES.map((route, index) => (
            route.private
              ? <PrivateRoute key={index} exact isAuth={isAuth} {...route}/>
              : <Route key={index} exact component={route.component} path={route.path}/>
          ))}
        </Switch>
    </Router>
  );
}

export default App;
