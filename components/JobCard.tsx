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
  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>

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