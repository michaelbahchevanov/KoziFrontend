import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as Components from './index';
import MainPage from '../Views/MainPage';
const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route path='/login' component={Components.LoginPage} />
      <Route path='*' component={() => <div>error not found</div>} />
    </Switch>
  </main>
);

export default Routes;
