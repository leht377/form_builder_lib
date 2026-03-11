// import FormBuilder from "./form-builder/form-builder"

import { QueryClientProvider } from '@tanstack/react-query'
import FormBuilder from './form-builder/form-builder'
import { queryClient } from './lib/react-query'
import { Toaster } from 'sonner'
import { useState } from 'react'
import type { Form } from './form-builder/types/form-builder.types'

// import FormBuilder from "./form-builder/form-builder".

function App() {
  const [currentFormId, setCurrentFormId] = useState<string>('8')

  const handleCreateNewVersion = (form: Form) => {
    setCurrentFormId(form.id.toString())
  }
  return (
    <QueryClientProvider client={queryClient}>
      <pre>{JSON.stringify(currentFormId, null, 2)}</pre>
      <div className='min-h-screen w-full py-8 px-4 overflow-x-hidden'>
        <FormBuilder id={currentFormId} onCreateNewVersion={handleCreateNewVersion} />
      </div>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
