import { Router } from "express";
import ensureIsValidDataMiddleware from "../Middlewares/ensureIsValidData.middleware";
import { requestUsersSerializer } from "../Serializers/users.serializers";
import { createUserController } from './../Controllers/users.controllers';
const userRouter = Router()


userRouter.post('', ensureIsValidDataMiddleware(requestUsersSerializer), createUserController)


export default userRouter