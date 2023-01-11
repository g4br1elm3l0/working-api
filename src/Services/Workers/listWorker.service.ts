import dataSource from "../../data-source";
import Users from "../../Entities/users.entity";

const listWorkersService = async () => {
    const workersRepo = dataSource.getRepository(Users)

    const workers = await workersRepo.find({
        isWorker: true
    })

    return workers
}

export default listWorkersService;