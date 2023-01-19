import dataSource from "../../data-source";

import Users from "../../Entities/users.entity";
import UserServices from "../../Entities/userServices.entity";
import WorkerServices from "../../Entities/workerServices.entity";



const deleteUserService = async (userId: string) => {
    const userRepository = dataSource.getRepository(Users);
    const userServiceRepository = dataSource.getRepository(UserServices);
    const workerServiceRepository = dataSource.getRepository(WorkerServices);

    const findUser = await userRepository.findOneBy({ id: userId });
    
    if(findUser.isWorker){
        const searchWorkerServices = await workerServiceRepository.find({
            where: {
                user: {
                    id: userId
                }
            },
            relations: {
                userService: true
            }
        })
        if(searchWorkerServices.length > 0){
            searchWorkerServices.forEach( async (service) => {
                if(service.userService.status === "aceito"){
                    let userService = await userServiceRepository.findOneBy({id: service.userService.id});
                    userService.status = "pendente";
                    userServiceRepository.save(userService);
                } 
                await workerServiceRepository.remove(service);
            });
        };
    }
    if(!findUser.isWorker){
        const searchUserServices = await userServiceRepository.find({
            where: {
                user: {
                    id: userId
                }
            }
        })
        if(searchUserServices.length > 0){
            searchUserServices.forEach( async (service) => {
                if(service.status === "aceito"){
                    const searchWorkerServiceByUserServiceId = await workerServiceRepository.findOne({
                        where: {
                            userService: {
                                id: service.id
                            }
                        },
                        relations: {
                            userService: true
                        }
                    });
                    await workerServiceRepository.remove(searchWorkerServiceByUserServiceId);
                }
                service.status = "excluído";
                userServiceRepository.save(service);
                await userServiceRepository.softRemove(service);
            })
        }
    }

    findUser.isActive = false;
    await userRepository.save(findUser);

    await userRepository.softRemove(findUser);

    return {};
};
export default deleteUserService;
