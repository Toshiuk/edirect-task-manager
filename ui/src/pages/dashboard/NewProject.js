import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import api from '../../services/api'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateNotification } from '../../actions'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

import './Card.css'
import './NewProject.css'

class NewProject extends Component {
    state = {
      loading: false,
      title: ''
    };

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleCreateProject = async e => {
      e.preventDefault()
      this.setState({ loading: true })
      const { title } = this.state
      const { updateNotification, addNewProject } = this.props
      await api
        .post('/project', { title })
        .then(response => {
          addNewProject(response.data.data)
          this.setState({ title: '' })
        })
        .catch(async err => {
          updateNotification({ message: err.response.data.message, error: true })
        })
      this.setState({ loading: false })
    };

    render () {
      const { title, loading } = this.state
      return (
        <Card variant="outlined" className="project-card">
          <form id="project-form" onSubmit={this.handleCreateProject}>
            <CardContent>
              <FormControl className="formControl">
                <InputLabel>New Project</InputLabel>
                <Input
                  label="Title"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                />
              </FormControl>
            </CardContent>
            <CardActions>
              <Button fullWidth disabled={loading} type="submit">Create</Button>
            </CardActions>
          </form>
        </Card>
      )
    }
}

NewProject.propTypes = {
  addNewProject: PropTypes.func.isRequired,
  updateNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateNotification }, dispatch)

export default connect(null, mapDispatchToProps)(NewProject)
