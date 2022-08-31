"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const ProjectController_1 = require("./controllers/ProjectController");
const routes = express_1.default.Router();
exports.routes = routes;
const projectController = new ProjectController_1.ProjectController();
routes
    .get('/projects', projectController.index)
    .post('/projects/:id', projectController.create)
    .put('/projects/:id', projectController.change)
    .delete('/projects/:id', projectController.delete);
