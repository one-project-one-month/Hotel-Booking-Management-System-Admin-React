
import { Suspense } from 'react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import View from './routes/View'
import { Toaster } from 'sonner'



const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
          <View />
        <Toaster />
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
