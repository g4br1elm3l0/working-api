import { Request, Response } from "express";
import { IUserLogin } from "../Interfaces/Users";
import createSessionService from "../Services/Session/createSession.service";

export const createSessionController = async (req: Request, res: Response) => {

    const userData: IUserLogin = req.body;
    const token = await createSessionService(userData);
    return res.status(200).json({token});
};