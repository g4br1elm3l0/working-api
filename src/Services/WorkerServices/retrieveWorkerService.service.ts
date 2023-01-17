import dataSource from "../../data-source";
import WorkerServices from "../../Entities/workerServices.entity";
import AppError from "../../errors";
import { IWorkerServiceCreateReturn } from "../../Interfaces/WorkerServices";
import { usersWithoutPasswordSerializer } from "../../Serializers/users.serializers";
import { listWorkerServiceReturnSerializer, uniqueWorkerServiceReturnSerializer } from "../../Serializers/workerServices.serializers";

export const retrieveWorkerService = async (id:string) => {
    const workerRepository = dataSource.getRepository(WorkerServices);
    const workerService = await workerRepository.find({
        relations: {
            user: true, userService: true
        },
        where: {
            id
        },
    })

    if (!workerService){
        throw new AppError("Worker service not found", 404)
    }

    const correctUsersFormat = listWorkerServiceReturnSerializer.validate(workerService, {
        stripUnknown: true
    });
    return correctUsersFormat;
}