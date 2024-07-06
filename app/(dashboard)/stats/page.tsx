import React from 'react'
import { getStatAction } from '@/utils/actions'

async function StatsPage () {

  const stats = await getStatAction()
  console.log('stats', stats)
  return (
    <h1 className='text-4xl'>StatsPage</h1>
  )
}

export default StatsPage