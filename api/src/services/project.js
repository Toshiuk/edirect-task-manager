const Project = require('../models').Project

const getById = id => Project.findOne({
  where: {
    id
  }
})

const getAllByUserId = UserId => Project.findAll({
  where: {
    UserId
  },
  include: ['tasks']
})

const create = project => Project.create(project)

const update = (id, project) =>
  Project.update(
    project,
    {
      where: {
        id: Number(id)
      },
      returning: true
    }
  )
    .then(projectUpdated => projectUpdated[1][0])

const remove = id => Project.destroy({ where: { id: Number(id) } })

module.exports = {
  getById,
  getAllByUserId,
  create,
  update,
  remove
}
