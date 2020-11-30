import React from 'react'
import { Route, Switch ,Redirect} from "react-router-dom";

import * as Components from "./index";
import MainPage from "../Views/MainPage"
const Routes = () => (
  <main>
     <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/login" component={Components.LoginPage}>
          {/* { sessionStorage.getItem('state') ? <Redirect to="/" /> : undefined } */}
          </Route>
      </Switch>
  </main>
)

export default Routes;