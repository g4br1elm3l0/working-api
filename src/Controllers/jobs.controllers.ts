import { Request, Response } from "express";
import { IUserService } from "../Interfaces/UserServices";
import { createUserServiceService } from "../Services/UserServices/createUserService.service";
import { listJobsService } from "../Services/UserServices/listJobsUsers.service";

export const createJobsController =async (req: Request, res: Response) => {
    const userData: IUserService = req.body
    const newJob = await createUserServiceService(userData)
    return res.status(201).json(newJob)
}

export const listJobsController = async (req: Request, res: Response) => {
    const userId: any = req.params.id
    const jobs = await listJobsService(userId)
    return res.status(200).json(jobs)
}