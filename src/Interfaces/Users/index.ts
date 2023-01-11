export interface IUserRequest {
    name: string
    email: string
    password: string
    birthday: string
    gender: string
    profileImg: string
    isWorker: boolean
    telephone: string
}

export interface IUserResponse {
    id: string
    name: string
    email: string
    birthday: string
    isWorker: boolean
    gender: string
    profileImg?: string
    telephone: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
}

export interface IUserLogin {
    email: string
    password: string
}

export interface IUserUpdate {
    name?: string
    email?: string
    password?: string
    telephone?: string
    profileImg?: string
    gender?: string
}
