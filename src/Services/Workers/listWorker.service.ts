import dataSource from "../../data-source";
import Workers from "../../Entities/workers.entity";


const listWorkersService = async () => {
    const workersRepo = dataSource.getRepository(Workers)

    const workers = await workersRepo.find()

    return workers
}

export default listWorkersService;