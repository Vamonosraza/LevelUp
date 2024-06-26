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
        redirect('/sign-in');
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
                createdAt: daujs().toDate(),
                updatedAt: daujs().toDate(),
            }
        });
        return job;
    }catch(error){
        console.error(error);
        return null;
    }
}