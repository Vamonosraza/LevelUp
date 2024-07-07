'use client';
import React from 'react'
import JobCard from './JobCard';
import { useSearchParams } from 'next/navigation';
import { getAllJobsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import ButtonContainer from './ComplexButtonContainer';


const JobList = () => {

  const search = useSearchParams().get('search') || ''
  const jobStatus = useSearchParams().get('jobStatus') || 'all'
  const pageNumber = Number(useSearchParams().get('page')) || 1

  const { data, isPending } = useQuery(
    {queryKey: ['jobs', search, jobStatus, pageNumber],
      queryFn:()=> getAllJobsAction({search, jobStatus, page:pageNumber})
    }
  )

  const jobs = data?.jobs || []

  const count = data?.count || 0
  const page = data?.page || 0
  const totalPages = data?.totalPages || 0

  if(isPending) return <h2 className='text-xl'>Loading...</h2>
  if(jobs.length === 0) return <h2 className='text-xl'>No jobs found</h2>

  return (
    <>
    <div className='flex items-center justify-between'>
      <h2 className='text-xl font-semibold capitalize'>{count} job found</h2>
      {
        totalPages <2 ? null : (
        <ButtonContainer currentPage={page} totalPages={totalPages} />
        )
      }

    </div>
    <div className='grid md:grid-cols-2 gap-8'>
      {jobs.map((job) => {
        return <JobCard key={job.id} job={job} />
      }
      )}
    </div>
    </>
  )
}

export default JobList