import { Request, Response } from 'express';
import { createUserService } from '../Services/Users/createUser.service';
import deleteUserService from '../Services/Users/deleteUser.service';
import { listAnUserService } from '../Services/Users/listAnUser.service';
import listWorkersService from '../Services/Users/listWorker.service';
import { updateUserService } from '../Services/Users/uptadeUser.service';
import { IUserRequest, IUserUpdate } from './../Interfaces/Users/index';
import { listUserService } from './../Services/Users/listUser.service';


export const createUserController = async (req: Request, res: Response) => {
    const userData: IUserRequest = req.body
    const newUser = await createUserService(userData)
    return res.status(201).json(newUser);
};

export const listUsersController = async (req: Request, res: Response) => {
    const users = await listUserService()
    return res.status(200).json(users)
}

export const listWorkersController = async (req: Request, res: Response) => {
    const users = await listWorkersService()
    return res.status(200).json(users)
}

export const listAnUserController = async (req: Request, res: Response) => {
    const users = await listAnUserService(req.params.id)
    return res.status(200).json(users)
}

export const UpdateUserController = async (req: Request, res: Response) => {
    const userParamsId: string = req.params.id
    const userData: IUserUpdate = req.body
    const updatedUser = await updateUserService(userData, userParamsId, req.user)
    return res.json(updatedUser)
}

export const deleteUserController = async (req: Request, res: Response) => {

    await deleteUserService(req.params.id)
    return res.status(204).json({})
}

