'use client';
import React from 'react'
import JobCard from './JobCard';
import { useSearchParams } from 'next/navigation';
import { getAllJobsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';

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
  if(isPending) return <h2 className='text-xl'>Loading...</h2>
  if(jobs.length === 0) return <h2 className='text-xl'>No jobs found</h2>

  return (
    <>
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