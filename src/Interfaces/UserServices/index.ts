import Categories from "../../Entities/categories.entity";
import { IUserResponse } from "../Users";

export interface IUserServiceRequest  { 
    title: string;
    description: string;
    femaleOnly?: boolean;
    category: string;
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