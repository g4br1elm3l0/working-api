import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import 'dotenv/config'
import AppError from '../../errors'
import dataSource from '../../data-source'
import { IUserLogin } from '../../Interfaces/Users'
import Users from '../../Entities/users.entity'

const createSessionService = async ( { email, password }: IUserLogin ) => {

    const userRepository = dataSource.getRepository(Users);
    
    const searchUser = await userRepository.findOneBy({
        email: email
    });
    
    if(!searchUser){
        throw new AppError("Invalid user or password!", 403);
    };
    
    if (!searchUser.isActive){
        throw new AppError("User is not active");
    };
    
    const passwordMatch = await compare(String(password), searchUser.password);
    if(!passwordMatch){
        throw new AppError("Invalid user or password!", 403);
    };

    const token = jwt.sign(
        {
            isWorker: searchUser.isWorker,
            isActive: searchUser.isActive,
            isAdm:    searchUser.isAdm
        },
        process.env.SECRET_KEY,
        {
            subject: String(searchUser.id), 
            expiresIn: '24h'
        }
    );
    return token;
};

export default createSessionService;