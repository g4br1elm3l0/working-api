import dataSource from "../../data-source";
import { IWorkerResponse, IWorkerRequest } from "../../Interfaces/Workers";
import Workers from "../../Entities/workers.entity";
import AppError from "../../errors";
import { responseWorkerSerializer } from "../../Serializers/workers.serializers";


const createWorkerService = async (dataWorker: IWorkerRequest): Promise<IWorkerResponse> => {
    const workerRepo = dataSource.getRepository(Workers)

    const findWorker = await workerRepo.findOneBy({
        email: dataWorker.email
    })

    if(findWorker){
        throw new AppError("user already exists", 409)
    }

    const worker = workerRepo.create(dataWorker)

    await workerRepo.save(worker)

    const returnDataSchema = await responseWorkerSerializer.validate(worker,{
        stripUnknown: true,
    })

    return returnDataSchema
}   

export default createWorkerService;
