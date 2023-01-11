import dataSource from "../../data-source";
<<<<<<< HEAD
import Workers from "../../Entities/workers.entity";


const listWorkersService = async () => {
    const workersRepo = dataSource.getRepository(Workers)

    const workers = await workersRepo.find()
=======
import Users from "../../Entities/users.entity";

const listWorkersService = async () => {
    const workersRepo = dataSource.getRepository(Users)

    const workers = await workersRepo.find({
        isWorker: true
    })
>>>>>>> d762fde47418e367cbdea225e743a691e39ee3d4

    return workers
}

export default listWorkersService;