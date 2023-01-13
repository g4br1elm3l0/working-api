import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IJob } from "../../Interfaces/Jobs";

export const listAllJobsService = async (): Promise<IJob[] | undefined> => {
    const jobRepository = dataSource.getRepository(UserServices);

     const jobs = await jobRepository.find();

    return jobs;
}