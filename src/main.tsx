import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import { TasksManager } from './tasks_manager/TasksManager'

import { makeServer } from './mirage/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OnlineStore } from './online_store/OnlineStore'

const queryClient = new QueryClient();

makeServer();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <OnlineStore/>
    </QueryClientProvider>
  </StrictMode>,
)