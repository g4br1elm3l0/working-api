import { Request, Response } from "express";
import listWorkersService from "../Services/Workers/listWorker.service";

import createWorkerService from "../Services/Workers/createWorker.service";
import { IWorkerRequest } from './../Interfaces/Workers/index';

export const listWorkerController = async (req: Request, res: Response) => {
    const workers = await listWorkersService();

    return res.status(200).json(workers)
}

export const createWorkerController = async (req: Request, res: Response) => {
    const dataWorker: IWorkerRequest = req.body

    const newWorker = await createWorkerService(dataWorker)

    return res.status(201).json(newWorker)
}

