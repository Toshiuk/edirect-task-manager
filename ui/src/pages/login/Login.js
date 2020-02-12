import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../../services/api'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateNotification } from '../../actions'

class Login extends Component {
  state = {
    loading: false,
    username: '',
    password: '',
    redirect: ''
  };

  componentDidMount () {
    sessionStorage.token && this.setState({ redirect: '/dashboard' })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = async e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { username, password } = this.state
    const { updateNotification } = this.props
    await api
      .post('/login', { username, password })
      .then(response => {
        sessionStorage.setItem('token', response.data.data.token)
        sessionStorage.setItem('id', response.data.data.user.id)
        sessionStorage.setItem('name', response.data.data.user.name)
        window.location.href = '/dashboard'
      })
      .catch(async err => {
        updateNotification({ message: err.response.data.message, error: true })
      })
    this.setState({ loading: false })
  };

  render () {
    const { username, password, redirect, loading } = this.state
    if (redirect) return <Redirect to={redirect} />
    return (
      <Container className="container">
        <form onSubmit={this.handleLogin}>
          <FormControl className="formControl">
            <InputLabel>Username</InputLabel>
            <Input
              label="Username"
              name="username"
              value={username}
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className="formControl">
            <InputLabel>Password</InputLabel>
            <Input
              label="Password"
              name="password"
              value={password}
              type="password"
              onChange={this.handleChange}
            />
          </FormControl>
          <Button disabled={loading} type="submit">Login</Button>
        </form>
        <Typography>
          {"Don't have an account? "}
          <Link to={'/signup'}>{'Click here'}</Link>
        </Typography>
      </Container>
    )
  }
}

Login.propTypes = {
  updateNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateNotification }, dispatch)

export default connect(null, mapDispatchToProps)(Login)
