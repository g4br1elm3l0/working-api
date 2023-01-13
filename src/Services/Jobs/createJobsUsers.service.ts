import dataSource from '../../data-source';
import { IJob, IJobRequest } from '../../Interfaces/Jobs';
import UserServices from './../../Entities/userServices.entity';
import { jobsSerializer } from '../../Serializers/jobs.serializers';

export const createJobService = async (userData: IJobRequest): Promise<IJob> => {
    const jobRepository = dataSource.getRepository(UserServices);
    
    const job = jobRepository.create(userData);
    const validadateJob = jobsSerializer.validate(job, {
        abortEarly: false,
        stripUnknown: true
    });

    await jobRepository.save(job)    

    return job;
} 