import dataSource from "../../data-source";
import UserServices from "../../Entities/userServices.entity";
import { IJob, IJobRequest } from "../../Interfaces/Jobs";
import { IUserResponse } from "../../Interfaces/Users";
import { jobsSerializer } from "../../Serializers/jobs.serializers";
import Users from './../../Entities/users.entity';


export const listJobsService = async (userId: string): Promise<IJobRequest[] | undefined> => {

    const jobRepository = dataSource.getRepository(UserServices);
    // const userRepository = dataSource.getRepository(Users)
    // const findUser: IUserResponse = await userRepository.findOneBy({
    //     id: userId,
    //   })

     const jobs = await jobRepository.findBy({
        id: userId
    })

   


    return jobs;
}