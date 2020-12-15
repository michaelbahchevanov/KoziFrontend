import React from 'react';
import Routes from '../routes.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Components from '../index';
import { withRouter } from 'react-router-dom';

export const App = ({ location }) => {
  return (
    <div>
      {location.pathname !== '/login' && <Components.NavigationBar />}
      <Routes />
    </div>
  );
};

export default withRouter(App);
