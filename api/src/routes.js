const userController = require('./controllers/user')
const projectController = require('./controllers/project')
const taskController = require('./controllers/task')

const auth = require('./middlewares/auth')

module.exports.set = (app) => {
  app.post('/login', userController.login)
  app.post('/register', userController.create)

  // With auth
  app.use(auth.checkAuth)

  // Project
  app.post('/project', projectController.create)
  app.patch('/project/:id', projectController.update)
  app.delete('/project/:id', projectController.remove)
  app.get('/project', projectController.listAllByUserId)

  // Task
  app.post('/task', taskController.create)
  app.patch('/task/:id', taskController.update)
  app.patch('/task/:id/complete', taskController.complete)
  app.delete('/task/:id', taskController.remove)
}
