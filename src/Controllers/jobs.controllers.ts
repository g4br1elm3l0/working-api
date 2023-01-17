import { Request, Response } from "express";
import { IUserServiceRequest } from "../Interfaces/UserServices";
import { createUserServiceService } from "../Services/UserServices/createUserService.service";
import deleteUserService from "../Services/UserServices/deleteUserService.service";
import deleteJobsService from "../Services/UserServices/deleteUserService.service";
import { listAllUserServicesService } from "../Services/UserServices/listAllUserServices.service";
import { listUserServicesbyUserIdService } from "../Services/UserServices/listUserServicesbyUserId.service";


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

export const deleteUserServiceController = async (req: Request, res: Response) => {
    await deleteUserService(req.params.id)

    return res.status(204).json({})
}