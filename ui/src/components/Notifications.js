import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateNotification } from '../actions'

function Alert (props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function Notifications ({ notification, updateNotification }) {
  return (
    <div >
      { !!notification.message &&
      <Snackbar open={true} autoHideDuration={6000} onClose={() => updateNotification({})}>
        <Alert onClose={() => updateNotification({})} severity={ notification.error ? 'error' : 'success'}>
          {notification.message}
        </Alert>
      </Snackbar>
      }
    </div>
  )
}

Notifications.propTypes = {
  notification: PropTypes.object.isRequired,
  updateNotification: PropTypes.func.isRequired
}

const mapStateToProps = store => ({
  notification: store.notificationState.notification
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateNotification }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
