import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as Components from './index';
import MainPage from '../Views/MainPage';
const Routes = () => (
  <main>
    <Switch>
      <Route path='/' component={MainPage} />
      <Route path='/login' component={Components.LoginPage}>
        {/* { sessionStorage.getItem('state') ? <Redirect to="/" /> : undefined } */}
      </Route>
    </Switch>
  </main>
);

export default Routes;
