'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { JobStatus, JobMode, createAndEditJobSchema, CreateAndEditJobType } from '@/utils/types'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { CustomFormField, CustomFormSelect } from './FormComponents'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createJobAction, getSingleJobAction, updateJobAction } from '@/utils/actions'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Value } from '@radix-ui/react-select'

function EditJobForm ({jobId}:{jobId:string}) {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const router = useRouter()
    const { data } = useQuery({
        queryKey: ['job', jobId],
        queryFn: ()=> getSingleJobAction(jobId)
    })
    const { mutate, isPending } = useMutation({
        mutationFn: (values: CreateAndEditJobType)=>
            updateJobAction(jobId, values),
        onSuccess: (data) => {
            if(!data){
                toast({
                    description: 'error updating job',
                })
                return
            }
            toast({
                description: 'Job updated successfully',
            })
            queryClient.invalidateQueries({queryKey: ['jobs']})
            queryClient.invalidateQueries({queryKey: ['stats']})
            queryClient.invalidateQueries({queryKey: ['jobs',jobId]})
            router.push('/jobs')
        }
    })

    const from = useForm<CreateAndEditJobType>({
        resolver: zodResolver(createAndEditJobSchema),
        defaultValues:{
            position:data?.position || '',
            company:data?.company || '',
            location:data?.location || '',
            status: (data?.status as JobStatus) || JobStatus.Pending,
            mode:(data?.mode as JobMode) || JobMode.FullTime,
        }
    })

    function onSubmit(values: CreateAndEditJobType){
        mutate(values)
    }
    return (
    <Form {...from}>
        <form
            onSubmit={from.handleSubmit(onSubmit)}
            className='bg-muted p-8 rounded'>
                <h2 className='capitalize font-semibold text-4xl mb-6'>
                    Edit Job
                </h2>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 itemds-start'>
                    <CustomFormField name='position' control={from.control} />
                    <CustomFormField name='company' control={from.control} />
                    <CustomFormField name='location' control={from.control} />

                    <CustomFormSelect
                        name='status'
                        control={from.control}
                        labelText='job status'
                        items={Object.values(JobStatus)}/>

                    <CustomFormSelect
                        name='mode'
                        control={from.control}
                        labelText='job mode'
                        items={Object.values(JobMode)}/>

                    <Button
                        type='submit'
                        className='self-end capitalize'
                        disabled={isPending}>
                            {isPending ? 'Updating...' : 'Update'}
                    </Button>
                </div>
            </form>
    </Form>
    )
}

export default EditJobForm