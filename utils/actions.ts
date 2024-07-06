'use server'

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import daujs from "dayjs";
import { resolve } from "path";

function authenicated(){
    const {userId} = auth();
    if(!userId){
        redirect('/');
    }
    return userId;
}

export async function createJobAction(values:CreateAndEditJobType):Promise<JobType | null>{

    // await new Promise((resolve)=>setTimeout(resolve, 1000));
    const userId = authenicated();
    try{
        createAndEditJobSchema.parse(values);
        const job :JobType = await prisma.job.create({
            data:{
                ...values,
                clerkId: userId,
            }
        });
        return job;
    }catch(error){
        console.error(error);
        return null;
    }
}

type GetAllJobsActionType = {
    search?: string;
    jobStatus?: string;
    page?: number;
    limit?: number;
};

export async function getAllJobsAction(
    {search, jobStatus, page = 1, limit = 10}:GetAllJobsActionType
):Promise<{
    jobs:JobType[];count:number;page:number;totalPages:number;
}>{
    const userId = authenicated();
    try{
        let whereClause:Prisma.JobWhereInput = {
            clerkId:userId
        };
        if(search){
            whereClause = {
                ...whereClause,
                OR:[
                    {
                        position:{
                            contains:search
                        }
                    },
                    {
                        company:{
                            contains:search
                        }
                    },
                    {
                        location:{
                            contains:search
                        }
                    }
                ]
            };
            }
        if(jobStatus && jobStatus !== 'all'){
            whereClause = {
                ...whereClause,
                status:jobStatus
            };
        }

        const jobs:JobType[]= await prisma.job.findMany({
            where:whereClause,
            orderBy:{
                createdAt:'desc'
            },
            });
            return {jobs, count:0, page:1, totalPages:0};
    }catch(error){
        console.error(error);
        return {
            jobs:[],
            count:0,
            page:1,
            totalPages:1
        };
    }
}

export async function deleteJobAction(id:string): Promise<JobType | null>{
    let job:JobType | null = null;
    const userId = authenicated();

    try{
        const job: JobType = await prisma.job.delete({
            where:{
                    id,
                    clerkId:userId
            }
        })
        return job;
    }catch(error){
        job = null
    }
    if (!job){
        redirect('/jobs')
    }
    return job;
}