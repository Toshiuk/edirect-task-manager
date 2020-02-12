import { UPDATE_NOTIFICATION } from '../actions/actionTypes'

const initialState = {
  notification: {}
}
export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        notification: action.notification
      }
    default:
      return state
  }
}
