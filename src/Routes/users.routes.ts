import { Router } from "express";
import Users from "../Entities/users.entity";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsValidDataMiddleware from "../Middlewares/ensureIsValidData.middleware";
import { ensureIsValidUserIdMiddleware } from "../Middlewares/ensureIsValidId.middleware";
import { requestUsersSerializer, updatedUserSerializer } from "../Serializers/users.serializers";
import { createUserController, listUsersController, listWorkersController, pathUserController } from './../Controllers/users.controllers';
const userRouter = Router()


userRouter.post('', ensureIsValidDataMiddleware(requestUsersSerializer), createUserController)
userRouter.get('', listUsersController)
userRouter.get('/workers', listWorkersController)
userRouter.get('/:id', ensureAuthMiddleware, ensureIsValidUserIdMiddleware(Users), )
userRouter.patch('/:id', ensureAuthMiddleware, ensureIsValidUserIdMiddleware(Users), ensureIsValidDataMiddleware(updatedUserSerializer), pathUserController)


export default userRouter