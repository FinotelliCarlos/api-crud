import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import fs from 'fs'

let projects = []

fs.readFile('projects.json', 'utf-8', (error, data) => {
  if (error) {
    console.log(error)
  } else {
    projects = JSON.parse(data)
  }
})

class ProjectController {
  async all(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(201).json(projects)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const project = await projects.find(project => project.id === id)

      return res.status(201).json(project)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }

  async add(req: Request, res: Response): Promise<Response> {
    const { title, description, image, link } = await req.body

    try {
      const project = {
        id: randomUUID(),
        title,
        description,
        image,
        link
      }

      projects.push(project)

      productFile()

      return res.status(201).json(project)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { title, description, image, link } = await req.body

    try {
      const projectIndex = projects.findIndex(project => project.id === id)

      projects[projectIndex] = {
        ...projects[projectIndex],
        title,
        description,
        image,
        link
      }

      productFile()

      return res
        .status(201)
        .json({ message: `Produto com id: ${id} alterado com sucesso!` })
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const projectIndex = projects.findIndex(project => project.id === id)
      projects.splice(projectIndex, 1)

      return res
        .status(201)
        .json({ message: `Produto com id: ${id} removido com sucesso!` })
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.'
      })
    }
  }
}

function productFile() {
  fs.writeFile('projects.json', JSON.stringify(projects), error => {
    if (error) {
      console.log(error)
    } else {
      console.log(`produto: inserido com sucesso.`)
    }
  })
}

export { ProjectController }
