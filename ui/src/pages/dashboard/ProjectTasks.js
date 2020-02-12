
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import api from '../../services/api'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Input from '@material-ui/core/Input'
import TaskList from './TaskList'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ConfirmationHandler from '../../components/ConfirmationHandler'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateNotification } from '../../actions'

class ProjectTasks extends Component {
    state = {
      loading: false,
      edit: false,
      create: false,
      title: ''
    };

    allowCreate = () => this.setState({ create: true, edit: false, title: '' })
    closeCreate = () => this.setState({ create: false })

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    handleCreate = async e => {
      e.preventDefault()
      this.setState({ loading: true })
      const { title } = this.state
      const { updateNotification, updateProject, project } = this.props
      await api
        .post('/task', { title, ProjectId: project.id })
        .then(response => {
          project.tasks = [response.data.data, ...(project.tasks || [])]
          updateProject(project)
        })
        .catch(async err => {
          updateNotification({ message: err.response.data.message, error: true })
        })
      this.setState({ loading: false, create: false })
    };

    deleteTask = id => {
      const { updateProject, project } = this.props
      project.tasks = [...(project.tasks || []).filter(task => task.id !== id)]
      updateProject(project)
    }

    updateTask = updatedTask => {
      const { updateProject, project } = this.props
      project.tasks = [...(project.tasks || []).map(task => task.id !== updatedTask.id ? task : updatedTask)]
      updateProject(project)
    }

    render () {
      const { create, title } = this.state
      const { project } = this.props
      return (
        <Fragment>
          <Typography variant="h5" component="h2">
          To do
          </Typography>
          <Divider />
          <List>
            { create &&
             <ListItem dense>
               <Input
                 label="Title"
                 name="title"
                 placeholder="Task title"
                 value={title}
                 onChange={this.handleChange}
               />
               <ListItemSecondaryAction>
                 <ConfirmationHandler confirm={this.handleCreate} cancel={this.closeCreate}/>
               </ListItemSecondaryAction>
             </ListItem>
            }
            <TaskList
              tasks={ project.tasks }
              deleteTask={this.deleteTask}
              updateTask={this.updateTask}
            />

            <Button size="small" onClick={ this.allowCreate } >New task</Button>
          </List>
          <Typography variant="h5" component="h2">
           Done
          </Typography>
          <Divider />
          <List>
            <TaskList
              tasks={ project.tasks }
              completed
            />
          </List>
        </Fragment>
      )
    }
}

ProjectTasks.propTypes = {
  project: PropTypes.object.isRequired,
  updateNotification: PropTypes.func.isRequired,
  updateProject: PropTypes.func
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateNotification }, dispatch)

export default connect(null, mapDispatchToProps)(ProjectTasks)
