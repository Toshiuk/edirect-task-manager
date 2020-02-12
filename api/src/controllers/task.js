const taskService = require('../services/task')
const projectService = require('../services/project')
const response = require('../helpers/response')

async function create (req, res) {
  return projectService.getById(req.body.ProjectId)
    .then(async exists => {
      if (exists) {
        if (exists.dataValues.UserId !== req.user.id) { return response.error(res, 401, 'Not your Project') }

        const task = {
          title: req.body.title,
          ProjectId: req.body.ProjectId
        }
        return response.success(res, await taskService.create(task))
      }

      return response.error(res, 404, 'Project not found')
    })
};

function update (req, res) {
  return taskService.getById(req.params.id)
    .then(async exists => {
      if (exists) {
        if (exists.project.dataValues.UserId !== req.user.id) {
          return response.error(res, 401, 'Not your Task')
        }
        const task = {
          title: req.body.title
        }
        return response.success(res, await taskService.update(req.params.id, task))
      }
      return response.error(res, 404, 'Task not found')
    })
}

function complete (req, res) {
  return taskService.getById(req.params.id)
    .then(async exists => {
      if (exists) {
        if (exists.completed) {
          return response.error(res, 403, 'Task already completed')
        }
        return response.success(res, await taskService.complete(req.params.id))
      }
      return response.error(res, 404, 'Task not found')
    })
}

function remove (req, res) {
  return taskService.getById(req.params.id)
    .then(exists => {
      if (exists) {
        if (exists.completed) {
          return response.error(res, 403, 'Not possible delete completed tasks')
        }
        if (exists.project.dataValues.UserId !== req.user.id) {
          return response.error(res, 401, 'Not your task')
        }
        taskService.remove(req.params.id)
        return response.success(res)
      }

      return response.error(res, 404, 'Task not found')
    })
}

module.exports = {
  create,
  update,
  remove,
  complete
}
