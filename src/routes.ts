import express from 'express'
import { ProjectController } from './controllers/ProjectController'

const routes = express.Router()

const projectController = new ProjectController()

routes
  .get('/projects', projectController.index)
  .post('/projects/:id', projectController.create)
  .put('/projects/:id', projectController.change)
  .delete('/projects/:id', projectController.delete)

export { routes }
