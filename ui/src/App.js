import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'

import Header from './components/Header'
import Notifications from './components/Notifications'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import PrivateRoute from './components/PrivateRoute'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route
            path="/signup"
            exact
            component={Signup}
          />
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
          />
          <Route
            path="/"
            component={Login}
          />
        </Switch>
        <Notifications />
      </BrowserRouter>
    )
  }
}

export default App
