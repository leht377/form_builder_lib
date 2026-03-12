import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { FormBuilderProvider } from './form-builder/providers'
import { queryClient } from './lib/react-query'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FormBuilderProvider
      config={{
        apiBaseUrl: import.meta.env.VITE_API_URL || ''
      }}
      queryClient={queryClient}
    >
      <App />
    </FormBuilderProvider>
  </StrictMode>
)
