import dataSource from "../../data-source";
import WorkerServices from "../../Entities/workerServices.entity";
import AppError from "../../errors";
import { usersWithoutPasswordSerializer } from "../../Serializers/users.serializers";


export const listWorkerService = async () => {

    const workerRepository = dataSource.getRepository(WorkerServices);
    const workerServicesList = await workerRepository.find({
        relations: {
            user: true, userService: true
        }
    })
    
    if(!workerServicesList.length){
        throw new AppError("Not found worker services", 404);
    }


    const correctUsersFormat = usersWithoutPasswordSerializer.validate(workerServicesList, {
        stripUnknown: true
    });
    return workerServicesList;
}