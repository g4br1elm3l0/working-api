import dataSource from "../../data-source";
import WorkerServices from "../../Entities/workerServices.entity";
import { listWorkerServiceReturnSerializer } from "../../Serializers/workerServices.serializers";

export const listWorkersService = async () => {

    const workerRepository = dataSource.getRepository(WorkerServices);
    const workerServicesList = await workerRepository.find({
        relations: {
            user: true, userService: true
        }
    })
    if(workerServicesList.length > 0){
        const correctUsersFormat = await listWorkerServiceReturnSerializer.validate(workerServicesList, {
            stripUnknown: true
        });
        return correctUsersFormat;
    }
    return [];
}