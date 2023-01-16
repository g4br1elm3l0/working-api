import { Request, Response } from "express";
import { IJobRequest } from "../Interfaces/Jobs";
import { createJobService } from "../Services/Jobs/createJobsUsers.service";
import { listAllJobsService } from "../Services/Jobs/listAllJobs.service";
import { listJobsOfUserService } from "../Services/Jobs/listJobsUsers.service";
import { listServiceByIdService } from "../Services/Jobs/listServiceById.service";

export const createJobsController =async (req: Request, res: Response) => {
    const userData: IJobRequest = req.body
    const newJob = await createJobService(userData)
    return res.status(201).json(newJob)
}

export const listJobsOfUserController = async (req: Request, res: Response) => {
    const userId: string = req.params.userId
    const jobs = await listJobsOfUserService(userId)
    return res.status(200).json(jobs)
}

export const listAllJobsController = async (req: Request, res: Response) => {
    const jobs = await listAllJobsService()
    return res.status(200).json(jobs)
}
export const listServiceByIdController = async (req: Request, res:Response) => {
    const serviceId: string = req.params.id
    const service = await listServiceByIdService(serviceId)
    return res.status(200).json(service)
}