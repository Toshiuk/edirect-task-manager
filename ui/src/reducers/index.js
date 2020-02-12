import { notificationReducer } from './notificationReducer'
import { combineReducers } from 'redux'
export const Reducers = combineReducers({
  notificationState: notificationReducer
})
