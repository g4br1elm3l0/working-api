import { FindOptionsWhere } from "typeorm";
import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import WorkerServices from "../../Entities/workerServices.entity";
import AppError from "../../errors";
import { IWorkerServiceRequest } from "../../Interfaces/WorkerServices";
import { listWorkerServiceReturnSerializer } from "../../Serializers/workerServices.serializers";
import Users from './../../Entities/users.entity';

export const createWorkerService = async (userData: IWorkerServiceRequest) => {
    const workerServiceRepository = dataSource.getRepository(WorkerServices);
    const userServicesRepository = dataSource.getRepository(UserServices)
    const userRepository = dataSource.getRepository(Users)
    
    const searchUser = await userRepository.findOneBy({id: userData.userId});
    if (!searchUser){
        throw new AppError("User was Not Found", 404);
    }

    const searchUserService = await userServicesRepository.findOneBy({id: userData.userServiceId});
    if (!searchUserService){
        throw new AppError("User Service was Not Found", 404);
    };

    const searchWorkerServiceByUserService = await workerServiceRepository.findOne({
        where: {
            userService: {
                id: userData.userServiceId
            }
        }
    })
    if (searchWorkerServiceByUserService){
        throw new AppError("This User Service already was accepted", 409)
    }

    const workerService = {
        user: searchUser,
        userService: searchUserService
    }
    const createdWorkerService = await workerServiceRepository.save(workerService)
    
    const {password, ...userWithoutPassword} = createdWorkerService.user
    const {user, ...serviceWithoutUser} = createdWorkerService
    return {
        ...serviceWithoutUser,
        worker: userWithoutPassword
    };
}