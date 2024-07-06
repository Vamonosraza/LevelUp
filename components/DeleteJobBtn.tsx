import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import JobInfo from './JobInfo'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteJobAction } from '@/utils/actions'
import { useToast } from './ui/use-toast'



function DeleteJobBtn ({id}:{id:string}) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string)=> deleteJobAction(id),
    onSuccess: (data) => { 
      if(!data){
        toast({
          description: 'Job deleted successfully',
        })
        return;
      }
      queryClient.invalidateQueries({queryKey: ['jobs']})
      queryClient.invalidateQueries({queryKey: ['stats']})
      queryClient.invalidateQueries({queryKey: ['charts']})
      toast({
        description: 'Job deleted successfully',
      })
    }
  })
  return (
    <Button size={'sm'} disabled={isPending} onClick={()=>{
      mutate(id);
    }}>
      {isPending ? 'Deleting...' : 'Delete' }

    </Button>
  )
}

export default DeleteJobBtn