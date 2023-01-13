import { Router } from "express";
import { createWorkersServicesController, listWorkersServicesController, retrieveWorkersServicesController } from "../Controllers/workerServices.controllers";
import WorkerServices from "../Entities/workerServices.entity";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsValidDataMiddleware from "../Middlewares/ensureIsValidData.middleware";
import { ensureIsValidIdMiddleware } from "../Middlewares/ensureIsValidId.middleware";
import { workerServiceSerializer } from "../Serializers/workerServices.serializers";

const workerServicesRoutes = Router()


workerServicesRoutes.get('', ensureAuthMiddleware, listWorkersServicesController)
workerServicesRoutes.post('', ensureAuthMiddleware, ensureIsValidDataMiddleware(workerServiceSerializer), createWorkersServicesController)
workerServicesRoutes.get('/:id', ensureAuthMiddleware, ensureIsValidIdMiddleware(WorkerServices), retrieveWorkersServicesController)





export default workerServicesRoutes