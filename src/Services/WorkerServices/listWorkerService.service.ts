import dataSource from "../../data-source";
import WorkerServices from "../../Entities/workerServices.entity";
import { listWorkerServiceReturnSerializer } from "../../Serializers/workerServices.serializers";

export const listWorkerService = async (workerServiceId: string) => {

    const workerRepository = dataSource.getRepository(WorkerServices);
    const workerServicesList = await workerRepository.find({
        where: {
            user: {
                id: workerServiceId
            }
        },
        relations: {
            user: true, userService: true
        },
        withDeleted: true
    })
    console.log(workerServiceId, workerServicesList)

    const correctUsersFormat = listWorkerServiceReturnSerializer.validate(workerServicesList, {
        stripUnknown: true
    });
    
    return correctUsersFormat;
}