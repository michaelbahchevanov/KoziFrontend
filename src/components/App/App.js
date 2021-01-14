import React from 'react'
import Routes from '../routes.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as Components from '../index'
import { withRouter } from 'react-router-dom'
import { useAuthenticatedUser } from '../../hooks/index.js'

export const App = ({ location }) => {
  global.user = useAuthenticatedUser()
  return (
    <div>
      {location.pathname !== '/login' && <Components.NavigationBar />}
      <Routes />
    </div>
  )
}

export default withRouter(App)
