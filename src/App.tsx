// import FormBuilder from "./form-builder/form-builder"

import { useState } from 'react'
import FormEditor from './form-builder/form-editor'

// import FormBuilder from "./form-builder/form-builder".

function App() {
  const [curr, setCurr] = useState('64')
  return (
    <>
    <pre>{curr}</pre>
      <div className='min-h-screen w-full py-8 px-4 overflow-x-hidden'>
        <FormEditor id={curr} onCreateNewVersion={(v) => setCurr(v.id.toString())} />
      </div>
      <div className='min-h-screen w-full py-8 px-4 overflow-x-hidden'>
        {/* <DynamicForm formId={curr} formResponseId='1456' /> */}
      </div>
    </>
  )
}

export default App
