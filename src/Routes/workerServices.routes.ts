import { Router } from "express";
import { createWorkersServicesController, deleteWorkerServiceController, listWorkersServicesController, retrieveWorkersServicesController } from "../Controllers/workerServices.controllers";
import Users from "../Entities/users.entity";
import WorkerServices from "../Entities/workerServices.entity";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../Middlewares/ensureIsAdm.middleware";
import ensureIsValidDataMiddleware from "../Middlewares/ensureIsValidData.middleware";
import { ensureIsValidIdMiddleware } from "../Middlewares/ensureIsValidId.middleware";
import { workerServiceSerializer } from "../Serializers/workerServices.serializers";

const workerServicesRoutes = Router()


workerServicesRoutes.get('', ensureAuthMiddleware, ensureIsAdmMiddleware, listWorkersServicesController)
workerServicesRoutes.post('/:userId', ensureAuthMiddleware, ensureIsValidIdMiddleware(Users), ensureIsValidDataMiddleware(workerServiceSerializer), createWorkersServicesController)
workerServicesRoutes.get('/:userId', ensureAuthMiddleware, ensureIsValidIdMiddleware(Users), retrieveWorkersServicesController)
workerServicesRoutes.delete('/:userId', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), deleteWorkerServiceController )

export default workerServicesRoutes