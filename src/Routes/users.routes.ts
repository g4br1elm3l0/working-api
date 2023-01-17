import { Router } from "express";
import Users from "../Entities/users.entity";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsActive from "../Middlewares/ensureIsActive.middleware";
import ensureIsAdmMiddleware from "../Middlewares/ensureIsAdm.middleware";
import ensureIsValidDataMiddleware from "../Middlewares/ensureIsValidData.middleware";
import { ensureIsValidIdMiddleware } from "../Middlewares/ensureIsValidId.middleware";
import { 
    requestUsersSerializer, 
    updatedUserSerializer 
} from "../Serializers/users.serializers";
import { 
    createUserController, 
    deleteUserController, 
    listAnUserController, 
    listUsersController, 
    listWorkersController, 
    UpdateUserController 
} from './../Controllers/users.controllers';
import ensureIsWorker from "../Middlewares/ensureIsWorker.middleware";
import UserServices from "../Entities/userServices.entity";
import { 
    createUserServiceController, 
    deleteUserServiceController, 
    listAllUserServicesController, 
    listServiceByIdController, 
    updateServiceController, 
    UserServicesbyUserIdController 
} from "../Controllers/jobs.controllers";
import { userServiceSerializer } from "../Serializers/userService.serializers";

const userRouter = Router();

userRouter.post('', ensureIsValidDataMiddleware(requestUsersSerializer), createUserController)  // criar usuários
userRouter.post('/services', ensureAuthMiddleware, ensureIsValidDataMiddleware(userServiceSerializer), createUserServiceController) // criar serviços do usuário

userRouter.get('', ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController) // listar todos os usuários não trabalhadores (apenas administradores)
userRouter.get('/workers', ensureAuthMiddleware, ensureIsAdmMiddleware, listWorkersController) // listar todos os trabalhadores (apenas administradores)
userRouter.get('/services', ensureAuthMiddleware, ensureIsWorker, listAllUserServicesController) // listar todos os serviços de todos os usuários
userRouter.get('/services/:servicesId', ensureAuthMiddleware, ensureIsWorker, ensureIsValidIdMiddleware(UserServices), listServiceByIdController) // listar um serviço específico
userRouter.get('/:userId/services', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), UserServicesbyUserIdController) // listar todos os serviços de um usuário (apenas administradores/dono)
userRouter.get('/:userId', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), listAnUserController) // listar um usuário específco (apenas administradores/dono)

userRouter.patch('/:userId', ensureAuthMiddleware, ensureIsActive, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), ensureIsValidDataMiddleware(updatedUserSerializer), UpdateUserController) // atualizar um usuário específico (apenas administradores/dono)
userRouter.patch('/:userId/services/:servicesId', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users, UserServices), updateServiceController) // atualizar um serviço de um usuário específico (apenas administradores/dono)

userRouter.delete('/:userId', ensureAuthMiddleware, ensureIsActive, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users), deleteUserController) // deletar um usuário (apenas administradores/dono)
userRouter.delete('/:userId/services/:servicesId', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureIsValidIdMiddleware(Users, UserServices), deleteUserServiceController) // deletar um serviço (apenas administradores/dono)

export default userRouter
