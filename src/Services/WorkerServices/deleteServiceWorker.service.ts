import dataSource from "../../data-source";
import Users from "../../Entities/users.entity";
import UserServices from "../../Entities/userServices.entity";
import WorkerServices from "../../Entities/workerServices.entity";
import AppError from "../../errors";

const deleteWorkerService = async (userId: string, workerServiceId: string) => {
    const userRepository = dataSource.getRepository(Users);
    const serviceRepository = dataSource.getRepository(UserServices);
    const workerServiceRepository = dataSource.getRepository(WorkerServices);
    
    const findUser = await userRepository.findOneBy({ id: userId });

    if(!findUser.isWorker) {
        throw new AppError("invalid id! User is not worker", 404);
    };
    const workerService = await workerServiceRepository.findOne({
        where: {
            id: workerServiceId
        },
        relations: {
            userService: true
        }
    });

    const userService = await serviceRepository.findOneBy({
        id: workerService.userService.id
    });
    userService.status = "pendente";
    await serviceRepository.save(userService);
    
    await workerServiceRepository.softRemove(workerService);
    
    return {};
}

export default deleteWorkerService;