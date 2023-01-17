import { Request, Response } from 'express';
import { createWorkerService } from '../Services/WorkerServices/createWorkerService.service';
import { listWorkerService } from '../Services/WorkerServices/listWorkerService.service';
import { retrieveWorkerService } from '../Services/WorkerServices/retrieveWorkerService.service';


export const listWorkersServicesController = async (req: Request, res: Response) => {
    const users = await listWorkerService()
    return res.status(200).json(users)
}

export const createWorkersServicesController = async (req: Request, res: Response) => {
    const users = await createWorkerService(req.body)
    return res.status(201).json(users)
}

export const retrieveWorkersServicesController = async (req: Request, res: Response) => {
    const id:string = req.params.id
    const users = await retrieveWorkerService(id)
    return res.status(200).json(users)
}

