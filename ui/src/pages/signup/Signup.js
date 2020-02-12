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

class Signup extends Component {
  state = {
    loading: false,
    name: '',
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

  handleRegister = async e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { name, username, password } = this.state
    const { updateNotification } = this.props
    await api
      .post('/register', { name, username, password })
      .then(response => {
        this.setState({ redirect: '/login' })
        updateNotification({ message: 'User created. Now you can login', error: false })
      })
      .catch(async err => {
        updateNotification({ message: err.response.data.message, error: true })
      })
    this.setState({ loading: false })
  };

  render () {
    const { name, username, password, redirect, loading } = this.state
    if (redirect) return <Redirect to={redirect} />
    return (
      <Container className="container">
        <form onSubmit={this.handleRegister}>
          <FormControl className="formControl">
            <InputLabel>Name</InputLabel>
            <Input
              label="Name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </FormControl>
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
          <Button disabled={loading} type="submit">Register</Button>
        </form>
        <Typography>
          {'Already have an account? '}
          <Link to={'/login'}>{'Click here'}</Link>
        </Typography>
      </Container>
    )
  }
}

Signup.propTypes = {
  updateNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateNotification }, dispatch)

export default connect(null, mapDispatchToProps)(Signup)
