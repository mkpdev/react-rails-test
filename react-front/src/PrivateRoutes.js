import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Routes to handle authenticated routes as well admin routes accessibility.
const PrivateRoutes = ({ component: Component, authed, isAccessible, rootRedirect, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authed 
        ? isAccessible
        ? <Component {...props} />
        : <Redirect to={rootRedirect} />
        : <Redirect to="/" />
    )}
  />
);

export default PrivateRoutes;
