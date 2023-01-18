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

export interface IUserService { 
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

export interface IUserServiceUpdateRequest {
    title?: string;
    description?: string;
    femaleOnly?: boolean;
    category?: string;
    location?: {
        latitude: number
        longitude: number
    }
}