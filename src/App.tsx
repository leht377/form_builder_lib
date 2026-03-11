// import FormBuilder from "./form-builder/form-builder"

import { QueryClientProvider } from '@tanstack/react-query'
import FormBuilder from './form-builder/form-builder'
import { queryClient } from './lib/react-query'

// import FormBuilder from "./form-builder/form-builder".

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='h-screen w-screen py-8 px-4 '>
        <FormBuilder id='8' />
      </div>
    </QueryClientProvider>
  )
}

export default App
