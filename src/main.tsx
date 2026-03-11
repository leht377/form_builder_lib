import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { FormBuilderProvider } from './form-builder/providers'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormBuilderProvider
      config={{
        apiBaseUrl: import.meta.env.VITE_API_URL || ''
      }}
    >
      <App />
    </FormBuilderProvider>
  </StrictMode>
)
