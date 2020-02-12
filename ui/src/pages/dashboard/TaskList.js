import React from 'react'
import Task from './Task'
export default function TaskList ({ tasks, completed = false, ...props }) {
  return (tasks || [])
    .filter(task => task.completed === completed)
    .map(task => <Task key={`task${task.id}`} task={task} {...props} />)
}
