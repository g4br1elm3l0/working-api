import dataSource from "../../data-source";
import WorkerServices from "../../Entities/workerServices.entity";
import { usersWithoutPasswordSerializer } from "../../Serializers/users.serializers";


export const listWorkerService = async () => {

    const workerRepository = dataSource.getRepository(WorkerServices);
    const workerServicesList = await workerRepository.find({
        relations: {
            user: true, userService: true
        }
    })

    const correctUsersFormat = usersWithoutPasswordSerializer.validate(workerServicesList, {
        stripUnknown: true
    });
    return correctUsersFormat;
}