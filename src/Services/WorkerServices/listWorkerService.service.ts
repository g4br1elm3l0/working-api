import dataSource from "../../data-source";
import WorkerServices from "../../Entities/workerServices.entity";
import AppError from "../../errors";
import { IUserResponse } from "../../Interfaces/Users";
import { usersWithoutPasswordSerializer } from "../../Serializers/users.serializers";
import Users from './../../Entities/users.entity';

export const listWorkerService = async () => {

    const workerRepository = dataSource.getRepository(WorkerServices);
    const workerServicesList = await workerRepository.find({
        relations: {
            user: true, userService: true
        },
        where: {
            user: {
                isWorker: true
            }
        },
    })

    if(workerServicesList.length === 0){
        throw new AppError("Not found worker services", 404);

    }

    const correctUsersFormat = usersWithoutPasswordSerializer.validate(workerServicesList, {
        stripUnknown: true
    });
    return workerServicesList;
}