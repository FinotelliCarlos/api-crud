import express from 'express'
import { ProjectController } from './controllers/ProjectController'

const routes = express.Router()

const projectController = new ProjectController()

routes
  .get('/projects', projectController.all)
  .post('/projects/:id', projectController.add)
  .put('/projects/:id', projectController.update)
  .delete('/projects/:id', projectController.remove)

export { routes }
