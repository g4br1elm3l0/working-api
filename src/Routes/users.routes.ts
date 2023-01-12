import { Router } from "express";
import { createJobsController, listJobsController } from "../Controllers/jobs.controllers";
import Users from "../Entities/users.entity";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsActive from "../Middlewares/ensureIsActive.middleware";
import ensureIsAdmMiddleware from "../Middlewares/ensureIsAdm.middleware";
import ensureIsValidDataMiddleware from "../Middlewares/ensureIsValidData.middleware";
import { ensureIsValidIdMiddleware } from "../Middlewares/ensureIsValidId.middleware";
import { requestUsersSerializer, updatedUserSerializer } from "../Serializers/users.serializers";
import { createUserController, deleteUserController, listUsersController, listWorkersController, UpdateUserController } from './../Controllers/users.controllers';
import { jobsSerializer } from "../Serializers/jobs.serializers";
import ensureIsWorker from "../Middlewares/ensureIsWorker.middleware";
import UserServices from "../Entities/userServices.entity";

const userRouter = Router();

userRouter.post('', ensureIsValidDataMiddleware(requestUsersSerializer), createUserController)
userRouter.get('', ensureAuthMiddleware, ensureIsAdmMiddleware,listUsersController)
userRouter.get('/workers', ensureAuthMiddleware, ensureIsAdmMiddleware,listWorkersController)
userRouter.get('/:userId', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), )
userRouter.patch('/:userId', ensureAuthMiddleware, ensureIsActive, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), ensureIsValidDataMiddleware(updatedUserSerializer), UpdateUserController)
userRouter.delete('/:userId', ensureAuthMiddleware, ensureIsActive, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), deleteUserController)
userRouter.post('/services', ensureAuthMiddleware, ensureIsValidDataMiddleware(jobsSerializer), createJobsController)
userRouter.get('/services', ensureAuthMiddleware, ensureIsWorker, listJobsController)
userRouter.get('/:userId/services', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users))
userRouter.get('/services/:id', ensureAuthMiddleware, ensureIsValidIdMiddleware(UserServices))
userRouter.patch('/:userId/services/:servicesId', ensureAuthMiddleware)
userRouter.delete('/:userId/services/:servicesId', ensureAuthMiddleware)

export default userRouter
