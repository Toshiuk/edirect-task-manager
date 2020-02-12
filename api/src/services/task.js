const Task = require('../models').Task

const getById = id => Task.findOne({
  where: {
    id
  },
  include: ['project']
})

const create = task => Task.create(task)

const update = (id, task) =>
  Task.update(
    task,
    {
      where: {
        id: Number(id)
      },
      returning: true
    }
  )
    .then(taskUpdated => taskUpdated[1][0])

const complete = (id) =>
  Task.update(
    {
      completed: true,
      completedDate: Date.now()
    },
    {
      where: {
        id: Number(id)
      },
      returning: true
    }
  )
    .then(taskUpdated => taskUpdated[1][0])

const remove = id => Task.destroy({ where: { id: Number(id) } })

module.exports = {
  getById,
  create,
  update,
  remove,
  complete
}
