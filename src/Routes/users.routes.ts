import { Router } from "express";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsValidDataMiddleware from "../Middlewares/ensureIsValidData.middleware";
import { requestUsersSerializer, updatedUserSerializer } from "../Serializers/users.serializers";
import { createUserController, listUsersController, listWorkersController, pathUserController } from './../Controllers/users.controllers';
const userRouter = Router()


userRouter.post('', ensureIsValidDataMiddleware(requestUsersSerializer), createUserController)
userRouter.get('', listUsersController)
userRouter.get('/workers', listWorkersController)
userRouter.get('/:id',)
userRouter.get('/:id/workers',)
userRouter.patch('/:id', ensureAuthMiddleware, ensureIsValidDataMiddleware(updatedUserSerializer), pathUserController)


export default userRouter