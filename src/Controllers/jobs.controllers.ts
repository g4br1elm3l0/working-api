import { Request, Response } from "express";
import { IUserServiceRequest } from "../Interfaces/UserServices";
import { createUserServiceService } from "../Services/UserServices/createUserService.service";
import { listAllUserServicesService } from "../Services/UserServices/listAllUserServices.service";
import { listUserServicesbyUserIdService } from "../Services/UserServices/listUserServicesbyUserId.service";
import updateServiceService from "../Services/UserServices/updateService.service";
import { listServiceByIdService } from "../Services/UserServices/listServiceById.service";


export const createUserServiceController =async (req: Request, res: Response) => {
    const userData: IUserServiceRequest = req.body
    const newJob = await createUserServiceService(userData, req.user.id)
    return res.status(201).json(newJob)
}

export const UserServicesbyUserIdController = async (req: Request, res: Response) => {
    const userId: string = req.params.userId
    const jobs = await listUserServicesbyUserIdService(userId)
    return res.status(200).json(jobs)
}

export const listAllUserServicesController = async (req: Request, res: Response) => {
    const jobs = await listAllUserServicesService()
    return res.status(200).json(jobs)
}
export const listServiceByIdController = async (req: Request, res:Response) => {
    const serviceId: string = req.params.id
    const service = await listServiceByIdService(serviceId)
    return res.status(200).json(service)
}


// export const listServicesByUserController = async(req: Request, res: Response) => {
//     const userId: string = req.params.id
//     const services = await listServicesByUserService(userId)
//     return res.json(services)
// }

export const updateServiceController = async (req: Request, res: Response) => {
    const userData: IUserServiceRequest = req.body
    const userId: string = req.params.id
    const updatedService = await updateServiceService(userData, userId)
    return res.json(updatedService)
}