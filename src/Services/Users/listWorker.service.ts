import dataSource from "../../data-source";
import Users from "../../Entities/users.entity";
import { IUserResponse } from "../../Interfaces/Users";
import { usersWithoutPasswordSerializer } from "../../Serializers/users.serializers";

const listWorkersService = async (): Promise<IUserResponse[]> => {
    const workersRepo = dataSource.getRepository(Users)

    const workers = await workersRepo.findBy({
        isWorker: true
    })

    const correctWorkersFormat = usersWithoutPasswordSerializer.validate(workers, {
        stripUnknown: true
    });
    return correctWorkersFormat;
}

export default listWorkersService;