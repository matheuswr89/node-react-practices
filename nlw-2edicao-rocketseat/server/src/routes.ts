import express from 'express';
import ClassesController from './controller/ClassesController';
import ConnectionController from './controller/ConnectionController';
const routes = express.Router();
const classesController = new ClassesController();
const connectionController = new ConnectionController();

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.post('/connection', connectionController.create);
routes.get('/connection', connectionController.index);

export default routes;