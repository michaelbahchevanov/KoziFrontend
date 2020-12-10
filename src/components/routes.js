import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as Components from './index';
import MainPage from '../Views/MainPage';
const Routes = () => (
  <main>
    <Switch>
      <Route path='/login' component={Components.LoginPage}>
        {/* { sessionStorage.getItem('state') ? <Redirect to="/" /> : undefined } */}
      </Route>
      <Route exact path='/' component={MainPage} />
      <Route path='*' component={() => <div>error not found</div>} />
    </Switch>
  </main>
);

export default Routes;
