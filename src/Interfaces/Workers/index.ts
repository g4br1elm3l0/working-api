import { DeepPartial } from "typeorm"

export interface IWorkerRequest {
    name: string
    email: string
    password: string
    birthday: string
    gender: string
    profileImg: string
    isWorker: boolean
    telephone: string
}

export interface IWorkerResponse {
    id: string
    name: string
    email: string
    birthday: string
    gender: string
    profileImg?: string 
    telephone: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
}

export interface IWorkerLogin {
    email: string
    password: string
}

export interface IWorkerUpdate {
    name?: string
    email?: string
    password?: string
    telephone?: string
    profileImg?: string 
}