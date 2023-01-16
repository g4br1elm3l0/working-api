export interface IWorkerServiceRequest {
    userId: string
    userServiceId: string    
}

export interface IWorkerServiceListReturn {
    id: string
    acceptedAt: string | null
    user: {
        id: string
        name: string
        email: string
        gender: string
        birthday: string
        profileImg: string
        telephone: string
        isActive: boolean
        isWorker: boolean
        isAdm: boolean
        createdAt: string
        updatedAt: string

    }
    userService: {
        id: string
        title: string
        description: string
        femaleOnly: boolean
        status: string
        createdAt: string
        updatedAt: string 

    }
}

// export interface IWorkerServiceResponse {
    
// }
