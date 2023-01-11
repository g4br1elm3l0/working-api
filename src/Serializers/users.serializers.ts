import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest, IUserResponse } from "../Interfaces/Users";

export const responseUsersSerializer: SchemaOf<IUserResponse> = yup.object().shape({
    id:yup.string().required(),
    name:yup.string().required(),
    email:yup.string().email().required(),
    birthday:yup.string().required(),
    gender:yup.string().required(),
    profileImg:yup.string().notRequired(), 
    telephone:yup.string().required(),
    isWorker: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt:yup.date().required(),
    isActive:yup.boolean().required()
})

export const requestUsersSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    name:yup.string().required(),
    email:yup.string().email().required(),
    password:yup.string().required(),
    birthday:yup.string().required(),
    gender:yup.string().required(),
    profileImg:yup.string().notRequired(), 
    telephone:yup.string().required(),
    isWorker: yup.boolean().required()
})