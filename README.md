# sdi-form-builder

Libreria React para crear y renderizar formularios dinamicos.

## Requisitos

- React 18 o 19
- React DOM 18 o 19
- @tanstack/react-query v5

## Instalacion

```bash
npm install sdi-form-builder @tanstack/react-query react react-dom
```

## Uso rapido

```tsx
import { QueryClient } from '@tanstack/react-query'
import {
  FormBuilderProvider,
  FormEditor,
  RenderForm,
  formBuilderSchema,
  type Form
} from 'sdi-form-builder'
import 'sdi-form-builder/styles.css'

const queryClient = new QueryClient()

function App() {
  const form = {} as Form

  return (
    <FormBuilderProvider
      config={{ apiBaseUrl: 'https://api.example.com' }}
      queryClient={queryClient}
    >
      <FormEditor id={form.id.toString()} onCreateNewVersion={() => {}} />
      <RenderForm
        formSchema={formBuilderSchema(form, 'strict')}
        onSubmit={(values) => console.log(values)}
        buttonText='Enviar'
      />
    </FormBuilderProvider>
  )
}
```

## API publica

- `FormBuilderProvider`
- `FormEditor`
- `RenderForm`
- `formBuilderSchema`
- `mapDynamicFormAnswerToFormAnswer`
- tipo `Form`

## Scripts

- `pnpm dev`: entorno de desarrollo con Vite
- `pnpm build`: genera bundles ESM/CJS y tipos en `dist/`
- `pnpm lint`: ejecuta ESLint

## Publicacion

Antes de publicar:

1. Actualiza `version` en `package.json`.
2. Ejecuta `pnpm build`.
3. Verifica contenido del paquete con `npm pack --dry-run`.
4. Publica con `npm publish`.
