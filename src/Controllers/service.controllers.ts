import { Request, Response } from "express";
import { IServiceRequest, IServiceUpdate } from "../Interfaces/Services";
import { createServiceService } from "../Services/Services/createService.service";
import { listAllServicesService } from "../Services/Services/listAllServices.service";
import { listServicesOfUserService } from "../Services/Services/listServcesOfUser.service";
import { listServiceByIdService } from "../Services/Services/listServiceById.service";
import listServicesByUserService from "../Services/Services/listServicesByUser.service";
import updateServiceService from "../Services/Services/updateService.service";

export const createServiceController =async (req: Request, res: Response) => {
    const userData: IServiceRequest = req.body
    const newJob = await createServiceService(userData)
    return res.status(201).json(newJob)
}

export const listServicesOfUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.userId
    const jobs = await listServicesOfUserService(userId)
    return res.json(jobs)
}

export const listAllServicesController = async (req: Request, res: Response) => {
    const jobs = await listAllServicesService()
    return res.json(jobs)
}

export const listServiceByIdController = async (req: Request, res:Response) => {
    const serviceId: string = req.params.serviceId
    const service = await listServiceByIdService(serviceId)
    return res.json(service)
}

export const listServicesByUserController = async(req: Request, res: Response) => {
    const userId: string = req.params.userId
    const services = await listServicesByUserService(userId)
    return res.json(services)
}

export const updateServiceController = async (req: Request, res: Response) => {
    const userData: IServiceUpdate = req.body
    const serviceId: string = req.params.serviceId
    const updatedService = await updateServiceService(userData, serviceId)
    return res.json(updatedService)
}