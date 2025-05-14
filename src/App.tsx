
import { Suspense } from 'react'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import View from './routes/View'


const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <View />
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
