export interface IServiceRequest { 
    title: string;
    description: string;
    femaleOnly: boolean;
}

export interface IServiceResponse { 
    id: string;
    title: string;
    description: string;
    femaleOnly: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface IServiceUpdate { 
    title: string;
    description: string;
    femaleOnly: boolean;
}