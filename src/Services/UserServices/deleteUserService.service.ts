import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import WorkerServices from "../../Entities/workerServices.entity";
import AppError from "../../errors";

const deleteUserService = async (serviceId: string) => {
    const serviceRepository = dataSource.getRepository(UserServices)

    const findService = await serviceRepository.findOneBy({
        id: serviceId
    })

    if(!findService){
        throw new AppError('service does not exists', 404)
    }

    findService.status = "excluido"
    await serviceRepository.save(findService)

    const workerServiceRepository = dataSource.getRepository(WorkerServices);
    const searchWorkerServiceByUserServiceId = await workerServiceRepository.findOne({
        where: {
            userService: {
                id: serviceId
            }
        },
        relations: {
            userService: true
        }
    });

    await workerServiceRepository.remove(searchWorkerServiceByUserServiceId);

    await serviceRepository.softRemove(findService)
    

    return {}
}

export default deleteUserService;
