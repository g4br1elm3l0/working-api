import { Router } from "express";
import { createUserController, listUserController } from './../Controllers/users.controllers';
const userRouter = Router()


userRouter.post('', createUserController)
userRouter.get('', listUserController)


export default userRouter