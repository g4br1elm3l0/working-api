import dataSource from "../../data-source";
import WorkerServices from "../../Entities/workerServices.entity";
import AppError from "../../errors";
import { usersWithoutPasswordSerializer } from "../../Serializers/users.serializers";

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

    if(!workerService.length){
        throw new AppError("Not found worker service", 404);

    }

    // const correctUsersFormat = usersWithoutPasswordSerializer.validate(workerService, {
    //     stripUnknown: true
    // });
    return workerService;
}