import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import api from '../../services/api'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Input from '@material-ui/core/Input'
import ConfirmationHandler from './../../components/ConfirmationHandler'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateNotification } from '../../actions'

export class Task extends Component {
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

    handleDelete = async () => {
      this.setState({ loading: true })
      const { updateNotification, deleteTask, task } = this.props
      await api
        .delete(`/task/${task.id}`)
        .then(response => {
          deleteTask(task.id)
        })
        .catch(async err => {
          updateNotification({ message: err.response.data.message, error: true })
        })
      this.setState({ loading: false })
    };

      handleComplete = async () => {
        this.setState({ loading: true })
        const { updateNotification, updateTask, task } = this.props
        await api
          .patch(`task/${task.id}/complete`)
          .then(response => {
            updateTask(response.data.data)
          })
          .catch(async err => {
            updateNotification({ message: err.response.data.message, error: true })
          })
        this.setState({ loading: false })
      };

      allowEdit = () => this.setState({ edit: true, title: this.props.task.title })
      closeEdit = () => this.setState({ edit: false })

      handleUpdate = async () => {
        this.setState({ loading: true })
        const { title } = this.state
        const { updateNotification, updateTask, task } = this.props
        await api
          .patch(`task/${task.id}`, { title })
          .then(response => {
            updateTask(response.data.data)
          })
          .catch(async err => {
            updateNotification({ message: err.response.data.message, error: true })
          })
        this.setState({ loading: false, edit: false })
      };

      render () {
        const { edit, title } = this.state
        const { task } = this.props
        const allowCheck = !task.completed && !edit
        return (
          <Tooltip
            title={ task.completed
              ? `Finished date: ${new Date(task.completedDate).toUTCString()}`
              : `Created date: ${new Date(task.createdAt).toUTCString()}`
            }
            placement="top"
          >
            <ListItem dense button={allowCheck} onClick={allowCheck ? this.handleComplete : undefined }>
              { edit
                ? <Input
                  label="Title"
                  name="title"
                  value={title}
                  placeholder="Task title"
                  onChange={this.handleChange}
                />
                : <Fragment>
                  <ListItemIcon>
                    <Checkbox disabled={task.completed} edge="start" checked={task.completed} />
                  </ListItemIcon>
                  <ListItemText primary={task.title} />
                </Fragment>
              }
              { !task.completed &&
                <ListItemSecondaryAction>
                  { edit
                    ? <ConfirmationHandler confirm={this.handleUpdate} cancel={this.closeEdit}/>
                    : <>
                      <IconButton onClick={this.allowEdit} edge="end">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={this.handleDelete} edge="end">
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }

                </ListItemSecondaryAction>
              }
            </ListItem>
          </Tooltip>
        )
      }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  updateNotification: PropTypes.func,
  deleteTask: PropTypes.func,
  updateTask: PropTypes.func
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateNotification }, dispatch)

export default connect(null, mapDispatchToProps)(Task)
