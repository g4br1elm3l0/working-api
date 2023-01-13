import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IJob } from "../../Interfaces/Jobs";


export const listJobsOfUserService = async (userId: string): Promise<IJob[] | undefined> => {
    const jobRepository = dataSource.getRepository(UserServices);

     const jobs = await jobRepository.findBy({
        id: userId
    })

    return jobs;
}