import { Router  } from "express";
import { createWorkerController, listWorkerController } from "../Controllers/workers.controller";


const workersRoutes = Router()

workersRoutes.get('', listWorkerController)
workersRoutes.post('', createWorkerController)

export default workersRoutes
