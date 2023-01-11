import * as yup from "yup"
import { SchemaOf } from "yup";
import { IWorkerResponse } from "../Interfaces/Workers";

export const responseWorkerSerializer: SchemaOf<IWorkerResponse> = yup.object().shape({
    id:yup.string().required(),
    name:yup.string().required(),
    email:yup.string().email().required(),
    birthday:yup.string().required(),
    gender:yup.string().required(),
    profileImg:yup.string().notRequired(), 
    telephone:yup.string().required(),
    createdAt: yup.date().required(),
    updatedAt:yup.date().required(),
    isActive:yup.boolean().required()
})