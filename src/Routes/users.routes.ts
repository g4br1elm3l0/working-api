import { Router } from "express";
import Users from "../Entities/users.entity";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsActive from "../Middlewares/ensureIsActive.middleware";
import ensureIsAdmMiddleware from "../Middlewares/ensureIsAdm.middleware";
import ensureIsValidDataMiddleware from "../Middlewares/ensureIsValidData.middleware";
import { ensureIsValidIdMiddleware } from "../Middlewares/ensureIsValidId.middleware";
import { requestUsersSerializer, updatedUserSerializer } from "../Serializers/users.serializers";
import { createUserController, deleteUserController, listUsersController, listWorkersController, UpdateUserController } from './../Controllers/users.controllers';

const userRouter = Router();

userRouter.post('', ensureIsValidDataMiddleware(requestUsersSerializer), createUserController)
userRouter.get('', ensureAuthMiddleware, ensureIsAdmMiddleware,listUsersController)
userRouter.get('/workers', ensureAuthMiddleware, ensureIsAdmMiddleware,listWorkersController)
userRouter.get('/:id', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), )
userRouter.patch('/:id', ensureAuthMiddleware, ensureIsActive, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), ensureIsValidDataMiddleware(updatedUserSerializer), UpdateUserController)
userRouter.delete('/:id', ensureAuthMiddleware, ensureIsActive, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), deleteUserController)

export default userRouter
