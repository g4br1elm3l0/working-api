import { Router } from "express";
<<<<<<< HEAD
import {createUserServiceController, deleteJobsController, listAllUserServicesController, UserServicesbyUserIdController } from "../Controllers/jobs.controllers";
=======
import { createUserServiceController, deleteUserServiceController, listAllUserServicesController, UserServicesbyUserIdController } from "../Controllers/jobs.controllers";
>>>>>>> 4fa1b6133471182d3525d9aad9e544087959c7df
import Users from "../Entities/users.entity";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsActive from "../Middlewares/ensureIsActive.middleware";
import ensureIsAdmMiddleware from "../Middlewares/ensureIsAdm.middleware";
import ensureIsValidDataMiddleware from "../Middlewares/ensureIsValidData.middleware";
import { ensureIsValidIdMiddleware } from "../Middlewares/ensureIsValidId.middleware";
import { requestUsersSerializer, updatedUserSerializer } from "../Serializers/users.serializers";
import { createUserController, deleteUserController, listUsersController, listWorkersController, UpdateUserController } from './../Controllers/users.controllers';
import { userServiceSerializer } from "../Serializers/userService.serializers";
import ensureIsWorker from "../Middlewares/ensureIsWorker.middleware";
import UserServices from "../Entities/userServices.entity";

const userRouter = Router();

userRouter.post('', ensureIsValidDataMiddleware(requestUsersSerializer), createUserController)  // criar usuários
userRouter.post('/services', ensureAuthMiddleware, ensureIsValidDataMiddleware(userServiceSerializer), createUserServiceController) // criar serviços do usuário

userRouter.get('', ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController) // listar todos os usuários não trabalhadores (apenas administradores)
userRouter.get('/workers', ensureAuthMiddleware, ensureIsAdmMiddleware, listWorkersController) // listar todos os trabalhadores (apenas administradores)
userRouter.get('/services', ensureAuthMiddleware, ensureIsWorker, listAllUserServicesController) // listar todos os serviços de todos os usuários
userRouter.get('/services/:servicesId', ensureAuthMiddleware, ensureIsWorker, ensureIsValidIdMiddleware(UserServices)) // listar um serviço específico
userRouter.get('/:userId/services', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), UserServicesbyUserIdController) // listar todos os serviços de um usuário (apenas administradores/dono)
userRouter.get('/:userId', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users)) // listar um usuário específco (apenas administradores/dono)

userRouter.patch('/:userId', ensureAuthMiddleware, ensureIsActive, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), ensureIsValidDataMiddleware(updatedUserSerializer), UpdateUserController) // atualizar um usuário específico (apenas administradores/dono)
userRouter.patch('/:userId/services/:servicesId', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users, UserServices)) // atualizar um serviço de um usuário específico (apenas administradores/dono)

userRouter.delete('/:userId', ensureAuthMiddleware, ensureIsActive, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), deleteUserController) // deletar um usuário (apenas administradores/dono)
<<<<<<< HEAD
userRouter.delete('/:userId/services/:servicesId', ensureAuthMiddleware, ensureIsAdmMiddleware, deleteJobsController) // deletar um serviço (apenas administradores/dono)
=======
userRouter.delete('/:userId/services/:servicesId', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users, UserServices), deleteUserServiceController) // deletar um serviço (apenas administradores/dono)
>>>>>>> 4fa1b6133471182d3525d9aad9e544087959c7df

export default userRouter
