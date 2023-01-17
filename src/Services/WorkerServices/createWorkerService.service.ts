import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import WorkerServices from "../../Entities/workerServices.entity";
import AppError from "../../errors";
import { IWorkerServiceRequest } from "../../Interfaces/WorkerServices";
import { responseUsersSerializer } from "../../Serializers/users.serializers";
import Users from './../../Entities/users.entity';

export const createWorkerService = async (userData: IWorkerServiceRequest) => {
    const workerServiceRepository = dataSource.getRepository(WorkerServices);
    const userServicesRepository = dataSource.getRepository(UserServices)
    const userRepository = dataSource.getRepository(Users)
    
    const searchUser = await userRepository.findOneBy({id: userData.userId});
    if (!searchUser){
        throw new AppError("User Not Found", 404);
    }
    
    if (!searchUser.isWorker) {
        throw new AppError("Need to be a worker account", 409);
    };

    const searchUserService = await userServicesRepository.findOneBy({id: userData.userServiceId});
    if (!searchUserService){
        throw new AppError("User Service Not Found", 404);
    };

    const workerService = workerServiceRepository.create(userData);

    workerService.user = searchUser;
    workerService.userService = searchUserService;

    const createdWorkerService = await workerServiceRepository.save(workerService)
    
    const {password, ...userWithoutPassword} = createdWorkerService.user
    
    return {
        ...createdWorkerService,
        worker: userWithoutPassword
    };
}