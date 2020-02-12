import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Container from '@material-ui/core/Container'
import ListProjects from './ListProjects'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateNotification } from '../../actions'

import api from '../../services/api'

class Dashboard extends Component {
  state = {
    loading: true,
    projects: []
  };

  componentDidMount () {
    const { updateNotification } = this.props
    api
      .get('/project')
      .then(response => {
        this.setState({ projects: response.data.data, loading: false })
      })
      .catch(async err => {
        updateNotification({ message: err.response.data.message, error: true })
        sessionStorage.clear()
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addNewProject = project => this.setState({ projects: [...this.state.projects, project] })

  updateProject = updatedProject =>
    this.setState({ projects: this.state.projects.map(project => project.id === updatedProject.id ? { ...project, ...updatedProject } : project) })

  removeProject = projectId =>
    this.setState({ projects: this.state.projects.filter(project => project.id !== projectId) })

  render () {
    const { projects } = this.state
    return (
      <Container id="dashboard-container">
        <ListProjects
          projects={ projects }
          addNewProject={this.addNewProject}
          removeProject={this.removeProject}
          updateProject={this.updateProject}
        />
      </Container>
    )
  }
}

Dashboard.propTypes = {
  updateNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateNotification }, dispatch)

export default connect(null, mapDispatchToProps)(Dashboard)
