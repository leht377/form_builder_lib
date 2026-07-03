// import FormBuilder from "./form-builder/form-builder"
import './index.css'
import { useState } from 'react'
import FormEditor from './form-builder/form-editor'
import DynamicForm from './form-builder/dynamic-form'

// import FormBuilder from "./form-builder/form-builder".

function App() {
  const [curr, setCurr] = useState('62')
  const handleCreateNewVersion = async () => {
    setCurr((prev) => String(Number(prev) + 1))
  }
  return (
    <>
      <pre>{curr}</pre>
      <div className='min-h-screen w-full py-8 px-4 overflow-x-hidden'>
        <FormEditor id={curr} handleCreateNewVersion={handleCreateNewVersion} />
      </div>
      <div className='min-h-screen w-full py-8 px-4 overflow-x-hidden'>
        <DynamicForm formId={curr} formResponseId='1459' />
      </div>
    </>
  )
}

export default App
