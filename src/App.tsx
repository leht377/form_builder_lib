// import FormBuilder from "./form-builder/form-builder"

import { Toaster } from 'sonner'
import { useState } from 'react'
import type { Form } from './form-builder/types/form-builder.types'
import FormEditor from './form-builder/form-editor'
import DynamicForm from './form-builder/dynamic-form'

// import FormBuilder from "./form-builder/form-builder".

function App() {
  return (
    <>
      <div className='min-h-screen w-full py-8 px-4 overflow-x-hidden'>
        {/* <FormEditor id={currentFormId} onCreateNewVersion={handleCreateNewVersion} /> */}
        <DynamicForm formId='64' formResponseId='1456' />
      </div>
      <div className='min-h-screen w-full py-8 px-4 overflow-x-hidden'>
      </div>
    </>
  )
}

export default App
