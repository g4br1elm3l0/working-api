import { Router } from "express";
import ensureIsValidDataMiddleware from "../Middlewares/ensureIsValidData.middleware";
import { requestUsersSerializer, updatedUserSerializer } from "../Serializers/users.serializers";
import { createUserController, listUsersController, listWorkersController, pathUserController } from './../Controllers/users.controllers';
const userRouter = Router()


userRouter.post('', ensureIsValidDataMiddleware(requestUsersSerializer), createUserController) // Create an user
userRouter.get('', listUsersController) // List
userRouter.get('/workers', listWorkersController)
userRouter.get('/:id',)
userRouter.get('/:id/workers',)
userRouter.patch('/:id', ensureIsValidDataMiddleware(updatedUserSerializer), pathUserController)


export default userRouter