import { Router  } from "express";
import { listWorkerController } from "../Controllers/workers.controller";


const workersRoutes = Router()

workersRoutes.get('', listWorkerController)

export default workersRoutes
