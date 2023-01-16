import { Router } from "express";
import { createWorkersServicesController, listWorkersServicesController, retrieveWorkersServicesController } from "../Controllers/workerServices.controllers";
import WorkerServices from "../Entities/workerServices.entity";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../Middlewares/ensureIsAdm.middleware";
import ensureIsValidDataMiddleware from "../Middlewares/ensureIsValidData.middleware";
import { ensureIsValidIdMiddleware } from "../Middlewares/ensureIsValidId.middleware";
import ensureIsWorker from "../Middlewares/ensureIsWorker.middleware";
import { workerServiceSerializer } from "../Serializers/workerServices.serializers";

const workerServicesRoutes = Router()

workerServicesRoutes.get('', ensureAuthMiddleware, ensureIsAdmMiddleware, listWorkersServicesController)
workerServicesRoutes.post('', ensureAuthMiddleware, ensureIsWorker, ensureIsValidDataMiddleware(workerServiceSerializer), createWorkersServicesController)
workerServicesRoutes.get('/:id', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(WorkerServices), retrieveWorkersServicesController)

export default workerServicesRoutes