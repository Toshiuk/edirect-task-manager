import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import api from '../../services/api'
import EditIcon from '@material-ui/icons/Edit'
import Input from '@material-ui/core/Input'
import ConfirmationHandler from '../../components/ConfirmationHandler'
import Divider from '@material-ui/core/Divider'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateNotification } from '../../actions'

import ListTasks from './ProjectTasks'

import './Card.css'

class Project extends Component {
    state = {
      loading: false,
      edit: false,
      title: ''
    };

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleDeleteProject = async e => {
      e.preventDefault()
      this.setState({ loading: true })
      const { updateNotification, removeProject, project } = this.props
      await api
        .delete(`/project/${project.id}`)
        .then(response => {
          removeProject(project.id)
        })
        .catch(async err => {
          updateNotification({ message: err.response.data.message, error: true })
        })
      this.setState({ loading: false })
    };

    handleEdit = async e => {
      e.preventDefault()
      this.setState({ loading: true })
      const { title } = this.state
      const { updateNotification, updateProject, project } = this.props
      await api
        .patch(`/project/${project.id}`, { title: title })
        .then(response => {
          updateProject(response.data.data)
        })
        .catch(async err => {
          updateNotification({ message: err.response.data.message, error: true })
        })
      this.setState({ loading: false, edit: false })
    };

    allowEdit = () => {
      const { project } = this.props
      this.setState({ edit: true, title: project.title })
    }

    closeEdit = () => this.setState({ edit: false })

    render () {
      const { project, updateProject } = this.props
      const { edit, title } = this.state
      return (
        <Grid key={`project${project.id}`} container item xs={12} sm={6} md={4} >
          <Card variant="outlined" className="project-card">
            <CardHeader
              action={
                edit
                  ? <ConfirmationHandler confirm={this.handleEdit} cancel={this.closeEdit}/>
                  : <>
                    <IconButton onClick={this.allowEdit} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={this.handleDeleteProject} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </>
              }
              title={
                edit
                  ? <Input
                    label="Title"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                  />

                  : project.title

              }
              subheader={ new Date(project.createdAt).toUTCString()}
            />
            <Divider light />
            <CardContent>

              <ListTasks updateProject={updateProject} project={project} />

            </CardContent>
          </Card>
        </Grid>
      )
    }
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
  updateNotification: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateNotification }, dispatch)

export default connect(null, mapDispatchToProps)(Project)
