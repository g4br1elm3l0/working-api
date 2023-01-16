export interface ILogin {
    email: string
    password: string
}

export interface IReqUser{
    id: string,
    isWorker: boolean,
    isActive: boolean,
    isAdm:    boolean
}