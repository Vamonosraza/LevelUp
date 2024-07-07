'use server'

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import daujs from "dayjs";
import { resolve } from "path";
import { date } from "zod";
import { count } from "console";

function authenicated(){
    const {userId} = auth();
    console.log('userId', userId);
    // user_2i9FW8RaLM9CKfbUsnSucpiHBg4
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
    {search, jobStatus, page = 1, limit = 20}:GetAllJobsActionType
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

        const skip = (page - 1) * limit;
        const jobs:JobType[]= await prisma.job.findMany({
            where:whereClause,
            skip,
            take:limit,
            orderBy:{
                createdAt:'desc'
            },
            });

            const count:number = await prisma.job.count({
                where:whereClause
            });
            const totalPages = Math.ceil(count / limit);
            return {jobs, count, page, totalPages};
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
    return job;
}

export async function getSingleJobAction(id:string): Promise<JobType | null>{
    let job: JobType | null =null;
    const userId = authenicated();

    try{
        job = await prisma.job.findUnique({
            where:{
                id,
                clerkId:userId
            }
        })
    }catch(error){
        job = null;
    }
    if(!job){
        redirect('/jobs');
    }
    return job;
}

export async function updateJobAction(id:string, values:CreateAndEditJobType): Promise<JobType | null>{
    const userId = authenicated();

    try{
        const job: JobType = await prisma.job.update({
            where:{
                id,
                clerkId:userId
            },
            data:{
                ...values
            }
        })
        return job;
    }catch(error){
        return null;
    }
}

export async function getStatAction(): Promise<{pending:number, interview:number, decline:number}>{
    await new Promise((resolve)=>setTimeout(resolve, 4000));
    const userId = authenicated();
    try{
        const stats = await prisma.job.groupBy({
            where:{
                clerkId:userId
            },
            by:['status'],
            _count:{
                status:true
            }
        });
        const statObject = stats.reduce((acc, curr)=>{
            acc[curr.status] = curr._count.status;
            return acc;
        }, {} as Record<string, number>)

        const defaultStats ={
            pending:0,
            decline:0,
            interview:0,
            ...statObject,
        };
        return defaultStats;
    }catch(error){
        console.error(error);
        redirect('/jobs');
    }
}

export async function getChartsDataAction(): Promise<
Array<{date:string;count:number}>
>{
    const userId = authenicated();
    const sixMonthsAgo = daujs().subtract(6, 'month').toDate();
    try{
        const jobs = await prisma.job.findMany({
            where:{
                clerkId:userId,
                createdAt:{
                    gte:sixMonthsAgo
                }
            },
            orderBy:{
                createdAt:'asc'
            }
        })
        console.log(jobs)

        let applicationsPerMonth = jobs.reduce((acc, job)=>{
            const date = daujs(job.createdAt).format('MMM YYYY');
            const existingEntry = acc.find((entry) => entry.date === date);

            if(existingEntry){
                existingEntry.count +=1;
            }else{
                acc.push({date, count:1});
            }
            return acc;
        }, [] as Array<{date:string;count:number}>);
        return applicationsPerMonth;
    }catch(error){
        redirect('/jobs');
    }
}