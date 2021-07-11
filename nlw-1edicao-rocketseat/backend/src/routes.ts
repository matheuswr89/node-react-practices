import express from 'express';
import { celebrate, Joi } from 'celebrate';

import PointController from './controller/PointController';
import ItemController from './controller/ItemController';

import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();
const uploads = multer(multerConfig);

const pointController = new PointController();
const itemController = new ItemController();

routes.get('/items', itemController.index);

routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);

routes.post(
    '/points',
    uploads.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        }),
    }, {
        abortEarly: false
    }),
    pointController.create
);

export default routes;