'use client'
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useQuery } from '@tanstack/react-query'
import { getChartsDataAction, getStatAction } from '@/utils/actions'


function ChartsContainer () {
    const { data, isPending} = useQuery({
        queryKey:['charts'],
        queryFn:() => getChartsDataAction()
    })
    console.log(data)

    if(isPending) return <h2 className='text-xl'>Loading...</h2>
    if(!data || data.length <1) return <h2 className='text-xl'>No data</h2>
    return (
        <section className='mt-16'>
            <h1 className='text-4xl font-semibold text-center'>
                Monthly Applications
            </h1>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart
                    data={data} margin={{top:5}} >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis allowDecimals={false}/>
                    <Tooltip />
                    <Bar dataKey='count' fill='#8884d8' barSize={75}/>
                </BarChart>
            </ResponsiveContainer>
        </section>
    )
}

export default ChartsContainer