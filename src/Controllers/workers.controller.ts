import listWorkersService from "../Services/Workers/listWorker.service";
import { Request, Response } from "express";

export const listWorkerController = async (req: Request, res: Response) => {
    const workers = await listWorkersService();

    return res.status(200).json(workers)
}

