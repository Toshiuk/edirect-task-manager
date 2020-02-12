import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute ({
  component: Component,
  ...rest
}) {
  return (
    <Route {...rest} render={props => sessionStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to='/login' />}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired
}
