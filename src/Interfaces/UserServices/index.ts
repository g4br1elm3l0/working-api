import Categories from "../../Entities/categories.entity";
import { IUserResponse } from "../Users";

export interface IUserServiceRequest {
    title: string;
    description: string;
    femaleOnly?: boolean;
    category: string;
    location: {
        latitude: number
        longitude: number
    }
}

<<<<<<< HEAD

export interface IUserService {
=======
export interface IUserService { 
>>>>>>> 561f37ad240cfb5480b3f6736c0478e6dd2df1ee
    id: string;
    title: string;
    description: string;
    femaleOnly: boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    user: IUserResponse;
    category: Categories
}

export interface IUserServiceResponse {
    id: string,
    title: string,
    description: string,
    status: string,
    createdAt: Date,
    user: {
        id: string,
        name: string,
        email: string,
        profileImg: string,
        telephone: string,
    },
    category: {
        id: string,
        name: string
    },

    location: {
        latitude: number
        longitude: number
    }


}