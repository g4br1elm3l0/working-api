import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import WorkerServices from "../../Entities/workerServices.entity";
import AppError from "../../errors";
import Users from './../../Entities/users.entity';
import { IReqUser } from "../../Interfaces/Session";
import { oneUserServiceResponseSerializer } from "../../Serializers/userService.serializers";

export const createWorkerService = async (userServiceId: string, userReq:IReqUser) => {
    const workerServiceRepository = dataSource.getRepository(WorkerServices);
    const userServicesRepository = dataSource.getRepository(UserServices)
    const userRepository = dataSource.getRepository(Users)
    
    const searchUser = await userRepository.findOneBy({id: userReq.id});

    const searchUserService = await userServicesRepository.findOne(
        {
            where: {id: userServiceId},
            relations: {
                user: true,
                location: true,
                category: true
            }
        });
    if (!searchUserService){
        throw new AppError("User Service was Not Found", 404);
    };

    if (searchUserService.status !== "pendente"){
        throw new AppError("User Service can not be accepted", 409);
    };

    if(searchUserService.femaleOnly){
        if(searchUser.gender.toLowerCase() === "masculino"){
            throw new AppError("This service can not be accepted by male workers", 403);
        };
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

    searchUserService.status = "aceito"
    await userServicesRepository.save(searchUserService)

    const newSearchUserService = await oneUserServiceResponseSerializer.validate(searchUserService, {
        stripUnknown: true
    })

    const workerService = {
        user: searchUser,
        userService: searchUserService
    }
    const createdWorkerService = await workerServiceRepository.save(workerService)
    
    const {password, ...userWithoutPassword} = createdWorkerService.user
    const {user, ...serviceWithoutUser} = createdWorkerService
    
    return {
        ...serviceWithoutUser,
        userService: {...newSearchUserService},
        worker: userWithoutPassword
    };
}