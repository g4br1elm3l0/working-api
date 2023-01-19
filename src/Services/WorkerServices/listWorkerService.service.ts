import dataSource from "../../data-source";
import WorkerServices from "../../Entities/workerServices.entity";
import { IWorkerServiceResponse } from "../../Interfaces/WorkerServices";
import { listServicesOfWorkerResponseSerializer } from "../../Serializers/workerServices.serializers";

export const listWorkerService = async (workerServiceId: string): Promise<IWorkerServiceResponse[]> => {

    const workerRepository = dataSource.getRepository(WorkerServices);
    const workerServicesList = await workerRepository.find({
        where: {
            user: {
                id: workerServiceId
            }
        },
        relations: {
            userService: true
        }
    })

    const correctUsersFormat = listServicesOfWorkerResponseSerializer.validate(workerServicesList, {
        stripUnknown: true
    });
    
    return correctUsersFormat;
}