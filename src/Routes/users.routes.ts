import { Router } from "express";
import { createUserController } from './../Controllers/users.controllers';
const userRouter = Router()


userRouter.post('', createUserController)


export default userRouter