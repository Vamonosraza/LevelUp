import { JobType } from '@/utils/types'
import React from 'react'
import { MapPin, Briefcase, CalendarDays, RadioTower } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from './ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import JobInfo from './JobInfo'
import DeleteJobBtn from './DeleteJobBtn'


function JobCard  ({job}:{job:JobType}) {
  const date = new Date(job.createdAt).toLocaleDateString()
  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className='mt-4 grid grid-cols-2 gap-4'>
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <Badge className='w-32 justify-center'>
          <JobInfo icon={<RadioTower className='w-4 h-4'/>} text={job.status} />
        </Badge>
      </CardContent>
      <CardFooter className='flex gap-4'>
      <Button asChild size={'sm'}>
        <Link href={`/jobs/${job.id}`}>
          View
        </Link>
      </Button>
      <DeleteJobBtn/>
      </CardFooter>
    </Card>
  )
}

export default JobCard