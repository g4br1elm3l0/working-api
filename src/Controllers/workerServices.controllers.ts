import { Request, Response } from 'express';
import { createWorkerService } from '../Services/WorkerServices/createWorkerService.service';
import deleteWorkerService from '../Services/WorkerServices/deleteServiceWorker.service';
import { listWorkerService } from '../Services/WorkerServices/listWorkerService.service';
import { listWorkersService } from '../Services/WorkerServices/listWorkersService.service';
import { retrieveWorkerService } from '../Services/WorkerServices/retrieveWorkerService.service';


export const listWorkersServicesController = async (req: Request, res: Response) => {
    const users = await listWorkersService()
    return res.status(200).json(users)
}

export const listWorkerServicesController = async (req: Request, res: Response) => {
    const users = await listWorkerService(req.params.userId)
    return res.status(200).json(users)
}

export const createWorkersServicesController = async (req: Request, res: Response) => {
    const userServiceId: string = req.params.userId
    const users = await createWorkerService(userServiceId, req.user)
    return res.status(201).json(users)
}

export const retrieveWorkersServicesController = async (req: Request, res: Response) => {
    const id:string = req.params.userId
    const users = await retrieveWorkerService(id)
    return res.status(200).json(users)
}

export const deleteWorkerServiceController = async (req: Request, res: Response) => {
    await deleteWorkerService(req.user.id, req.params.userId)

    return res.status(204).json({})
}