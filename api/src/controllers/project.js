const projectService = require('../services/project')
const response = require('../helpers/response')

async function create (req, res) {
  const project = {
    title: req.body.title,
    UserId: req.user.id
  }

  return response.success(res, await projectService.create(project))
};

async function listAllByUserId (req, res) {
  return response.success(res, await projectService.getAllByUserId(req.user.id))
};

function update (req, res) {
  return projectService.getById(req.params.id)
    .then(async exists => {
      if (exists) {
        if (exists.dataValues.UserId !== req.user.id) { return response.error(res, 401, 'Not your project') }

        return response.success(res, await projectService.update(req.params.id, req.body))
      }

      return response.error(res, 404, 'Project not found')
    })
}

function remove (req, res) {
  return projectService.getById(req.params.id)
    .then(exists => {
      if (exists) {
        if (exists.dataValues.UserId !== req.user.id) { return response.error(res, 401, 'Not your project') }

        projectService.remove(req.params.id)
        return response.success(res)
      }

      return response.error(res, 404, 'Project not found')
    })
}

module.exports = {
  listAllByUserId,
  create,
  update,
  remove
}
