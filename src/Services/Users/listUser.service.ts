import dataSource from "../../data-source";
import Users from './../../Entities/users.entity';

export const listUserService = async (): Promise<Users[]> => {
    const userRepo = dataSource.getRepository(Users);
    const users = await userRepo.find()
    return users
}