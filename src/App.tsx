
import { Suspense } from 'react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import View from './routes/View'
import { Toaster } from 'sonner'
import CheckOutProvider from './context/checkOutContext'



const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
       <CheckOutProvider>
         <Suspense fallback={<div>Loading...</div>}>
          <View />
          <Toaster />
        </Suspense>
       </CheckOutProvider>
    </QueryClientProvider>
  )
}

export default App
