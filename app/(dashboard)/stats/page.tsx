import React from 'react'
import { getChartsDataAction, getStatAction } from '@/utils/actions'
import  ChartsContainer  from '@/components/ChartsContainer'
import  StatsContainer  from '@/components/StatsContainer'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'


async function StatsPage () {
  const charts = await getChartsDataAction()
  console.log('charts', charts)

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey:['stats'],
    queryFn: ()=> getStatAction()
  })
  await queryClient.prefetchQuery({
    queryKey:['charts'],
    queryFn: ()=> getChartsDataAction()
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartsContainer />
    </HydrationBoundary>
  )
}

export default StatsPage