import { Request, Response } from "express";
import Users from "../Entities/users.entity";
import { IJobRequest } from "../Interfaces/Jobs";
import { createJobService } from "../Services/Jobs/createJobsUsers.service";
import { listJobsService } from "../Services/Jobs/listJobsUsers.service";

export const createJobsController =async (req: Request, res: Response) => {
    const userData: IJobRequest = req.body
    const newJob = await createJobService(userData)
    return res.status(201).json(newJob)
}

export const listJobsController = async (req: Request, res: Response) => {
    const userId: any = req.params.id
    const jobs = await listJobsService(userId)
    return res.status(200).json(jobs)
}