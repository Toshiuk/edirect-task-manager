import React from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

export default function ConfirmationHandler ({
  confirm,
  cancel
}) {
  return <>
    <IconButton onClick={confirm} edge="end">
      <CheckIcon />
    </IconButton>
    <IconButton onClick={cancel} edge="end">
      <CloseIcon />
    </IconButton>
  </>
}

ConfirmationHandler.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}
