"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const crypto_1 = require("crypto");
const fs_1 = __importDefault(require("fs"));
let projects = [];
fs_1.default.readFile('projects.json', 'utf-8', (error, data) => {
    if (error) {
        console.log(error);
    }
    else {
        projects = JSON.parse(data);
    }
});
class ProjectController {
    async index(req, res) {
        try {
            return res.status(201).json(projects);
        }
        catch (err) {
            return res.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
    async show(req, res) {
        const { id } = req.params;
        try {
            const project = await projects.find(project => project.id === id);
            return res.status(201).json(project);
        }
        catch (err) {
            return res.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
    async create(req, res) {
        const { title, description, image, link } = await req.body;
        try {
            const project = {
                id: (0, crypto_1.randomUUID)(),
                title,
                description,
                image,
                link
            };
            projects.push(project);
            productFile();
            return res.status(201).json(project);
        }
        catch (err) {
            return res.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
    async change(req, res) {
        const { id } = req.params;
        const { title, description, image, link } = await req.body;
        try {
            const projectIndex = projects.findIndex(project => project.id === id);
            projects[projectIndex] = Object.assign(Object.assign({}, projects[projectIndex]), { title,
                description,
                image,
                link });
            productFile();
            return res
                .status(201)
                .json({ message: `Produto com id: ${id} alterado com sucesso!` });
        }
        catch (err) {
            return res.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try {
            const projectIndex = projects.findIndex(project => project.id === id);
            projects.splice(projectIndex, 1);
            return res
                .status(201)
                .json({ message: `Produto com id: ${id} removido com sucesso!` });
        }
        catch (err) {
            return res.status(400).json({
                message: err.message || 'Unexpected error.'
            });
        }
    }
}
exports.ProjectController = ProjectController;
function productFile() {
    fs_1.default.writeFile('projects.json', JSON.stringify(projects), error => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(`produto: inserido com sucesso.`);
        }
    });
}
