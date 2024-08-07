'use client'

import React from 'react'
import { ThemeProvider } from "@/components/Theme-Provider"
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from '@/components/ui/toaster'

const Providers = ({children}: {children: React.ReactNode}) => {
  const [queryClient] = useState(() => 
    new QueryClient({
      defaultOptions:{
        queries:{
          staleTime: 3000 * 60 * 5
        }
      }
    })
  
  );
  return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
          <Toaster />
          <QueryClientProvider client={queryClient}>

            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
          </QueryClientProvider>
        </ThemeProvider>
  );
};

export default Providers