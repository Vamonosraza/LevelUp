'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getStatAction } from '@/utils/actions'
import  StatsCard, { StatsLoadingCard }  from './StatsCard'

function StatsContainer () {
    const { data} = useQuery({
        queryKey:['stats'],
        queryFn: ()=> getStatAction()
    })

    return (
        <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3'>
            <StatsCard title='Pending' value={data?.pending || 0}/>
            <StatsCard title='Interview' value={data?.interview || 0}/>
            <StatsCard title='Decline' value={data?.decline || 0}/>
        </div>
    )
}

export default StatsContainer