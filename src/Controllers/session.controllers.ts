import { Request, Response } from "express";
import { IUserLogin } from "../Interfaces/Users";
import createSessionService from "../Services/Session/createSession.service";

export const createUserController = async (req: Request, res: Response) => {
    
    const userData: IUserLogin = req.body;
    const newUser = await createSessionService(userData);
    return res.status(201).json(newUser);
};