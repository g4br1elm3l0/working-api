import { Router } from "express";
import { createWorkersServicesController, deleteWorkerServiceController, listWorkerServicesController, listWorkersServicesController, retrieveWorkersServicesController } from "../Controllers/workerServices.controllers";
import Users from "../Entities/users.entity";
import UserServices from "../Entities/userServices.entity";
import WorkerServices from "../Entities/workerServices.entity";

import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../Middlewares/ensureIsAdm.middleware";
import { ensureIsValidIdMiddleware } from "../Middlewares/ensureIsValidId.middleware";
import ensureIsWorker from "../Middlewares/ensureIsWorker.middleware";

const workerServicesRoutes = Router()

workerServicesRoutes.post('/:userId', ensureAuthMiddleware, ensureIsValidIdMiddleware(UserServices), createWorkersServicesController)

workerServicesRoutes.get('', ensureAuthMiddleware, ensureIsAdmMiddleware, listWorkersServicesController)
workerServicesRoutes.get('/:userId', ensureAuthMiddleware, ensureIsValidIdMiddleware(WorkerServices), retrieveWorkersServicesController)
workerServicesRoutes.get('/worker/:userId', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsWorker, ensureIsValidIdMiddleware(Users), listWorkerServicesController)

workerServicesRoutes.delete('/:userId', ensureAuthMiddleware, ensureIsValidIdMiddleware(WorkerServices), deleteWorkerServiceController )

export default workerServicesRoutes