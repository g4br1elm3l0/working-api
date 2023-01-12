export interface IJobRequest  { 
title: string;
description: string;
femaleOnly: boolean;
}


export interface IJob { 
    id: string;
    title: string;
    description: string;
    femaleOnly: boolean;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    
    }