// import FormBuilder from "./form-builder/form-builder"

import { Toaster } from 'sonner'
import { useState } from 'react'
import type { Form } from './form-builder/types/form-builder.types'
import FormEditor from './form-builder/form-editor'
import RenderForm from './form-builder/render-form'
import { useShowApiForm } from './form-builder/hooks/api/use-show-api-form'
import { formBuilderSchema } from './form-builder/utils/dynamic-form-utils'

// import FormBuilder from "./form-builder/form-builder".

function App() {
  const [currentFormId, setCurrentFormId] = useState<string>('8')
  const { data: form } = useShowApiForm(currentFormId)

  const formSchema = form ? formBuilderSchema(form, 'strict') : undefined

  const handleCreateNewVersion = (form: Form) => {
    setCurrentFormId(form.id.toString())
  }
  return (
    <>
      <div className='min-h-screen w-full py-8 px-4 overflow-x-hidden'>
        <FormEditor id={currentFormId} onCreateNewVersion={handleCreateNewVersion} />
      </div>
      <div className='min-h-screen w-full py-8 px-4 overflow-x-hidden'>
        {formSchema && (
          <RenderForm
            formSchema={formSchema}
            onSubmit={(v) => console.log(v)}
            buttonText='Enviar'
          />
        )}
      </div>
      <Toaster />
    </>
  )
}

export default App
