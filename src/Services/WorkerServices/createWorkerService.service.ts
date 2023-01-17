import { FindOptionsWhere } from "typeorm";
import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import WorkerServices from "../../Entities/workerServices.entity";
import AppError from "../../errors";
import { Request } from "express";
import { IWorkerServiceRequest } from "../../Interfaces/WorkerServices";
import { listWorkerServiceReturnSerializer } from "../../Serializers/workerServices.serializers";
import Users from './../../Entities/users.entity';
import { IReqUser } from "../../Interfaces/Session";

export const createWorkerService = async (userServiceId: string, userReq:IReqUser) => {
    const workerServiceRepository = dataSource.getRepository(WorkerServices);
    const userServicesRepository = dataSource.getRepository(UserServices)
    const userRepository = dataSource.getRepository(Users)
    
    const searchUser = await userRepository.findOneBy({id: userReq.id});

    const searchUserService = await userServicesRepository.findOneBy({id: userServiceId});
    if (!searchUserService){
        throw new AppError("User Service was Not Found", 404);
    };

    const searchWorkerServiceByUserService = await workerServiceRepository.findOne({
        where: {
            userService: {
                id: userServiceId
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