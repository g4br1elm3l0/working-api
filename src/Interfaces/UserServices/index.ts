export interface IUserServiceRequest  { 
title: string;
description: string;
femaleOnly?: boolean;
userId: string;
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
}