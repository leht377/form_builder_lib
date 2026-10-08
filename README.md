# SDI Form Builder (`sdi-form-builder`)

Librería de componentes React para la creación, edición visual (drag-and-drop) y renderizado de formularios dinámicos, 100% encapsulada y aislada para funcionar sin fricción en cualquier aplicación **React / Next.js (App Router & Pages)**.

---

## ✨ Características Principales

- 🛡️ **Aislamiento Total de Estilos (Zero CSS Collisions):** Todos los estilos y variables CSS están encapsulados bajo el namespace `.sdi-form-builder-root`, evitando que las reglas o variables de Tailwind (`--background`, `--foreground`, `--primary`, etc.) colisionen con los estilos globales de tu aplicación anfitriona.
- 🎨 **Soporte Nativo de Modo Oscuro:** Compatible con modo claro y oscuro (`.dark`), sincronizándose automáticamente con el tema de tu aplicación.
- 🧩 **Componentes Listos para Usar:**
  - `FormEditor`: Editor interactivo con drag-and-drop (`@dnd-kit`) para organizar secciones y campos.
  - `RenderForm`: Renderizador de formularios validado con Zod y React Hook Form.
  - `DynamicForm`: Componente integrado que consulta la API, carga respuestas previas y gestiona el envío de forma autónoma.
- 📦 **Empaquetado Moderno:** Bundles optimizados en ESM (`dist/index.js`), CommonJS (`dist/index.cjs`) y tipos de TypeScript integrados (`dist/index.d.ts`).
- ⚡ **Compatibilidad SSR / Next.js:** Incluye directivas `'use client'` y polyfills seguros para entornos de renderizado en servidor.

---

## 📦 Instalación

```bash
npm install sdi-form-builder
# o con pnpm
pnpm add sdi-form-builder
# o con yarn
yarn add sdi-form-builder
```

### Requisitos Previos (`peerDependencies`)

- **React:** `>=18.0.0`
- **React DOM:** `>=18.0.0`
- **Radix UI:** `^1`

---

## 🚀 Inicio Rápido

### 1. Importación de Estilos

Importa la hoja de estilos de la librería una sola vez en el archivo raíz de tu aplicación (ej. `layout.tsx`, `_app.tsx`, `App.tsx` o `main.tsx`):

```tsx
import 'sdi-form-builder/styles.css'
// o alternativamente:
// import 'sdi-form-builder/style.css'
```

> [!NOTE]
> **No requieres configurar `@source` en Tailwind de tu app host.** Los estilos ya vienen pre-compilados y aislados dentro del bundle de la librería.

---

### 2. Configurar el Proveedor (`FormBuilderProvider`)

Envuelve tu árbol de componentes con `FormBuilderProvider` para configurar los accesos de API y opciones de sesión:

```tsx
import { FormBuilderProvider } from 'sdi-form-builder'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <FormBuilderProvider
      config={{
        apiBaseUrl: 'https://api.tuempresa.com',
        token: 'tu_token_aqui',
        userId: '123'
      }}
    >
      {children}
    </FormBuilderProvider>
  )
}
```

---

### 3. Uso de los Componentes

#### A. Editor de Formularios (`FormEditor`)

Permite diseñar visualmente las secciones y preguntas del formulario mediante arrastrar y soltar:

```tsx
import { FormEditor } from 'sdi-form-builder'

export default function EditFormPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <FormEditor
        id={params.id}
        handleCreateNewVersion={async () => {
          console.log('Nueva versión creada')
        }}
      />
    </div>
  )
}
```

#### B. Renderizador de Formulario (`RenderForm`)

Renderiza un formulario a partir de un esquema estructurado:

```tsx
import { RenderForm, formBuilderSchema, type Form } from 'sdi-form-builder'

interface Props {
  formData: Form
}

export default function ViewForm({ formData }: Props) {
  const schema = formBuilderSchema(formData, 'strict')

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log('Formulario enviado:', values)
  }

  return (
    <RenderForm
      formSchema={schema}
      onSubmit={handleSubmit}
      buttonText="Guardar Respuestas"
    />
  )
}
```

#### C. Formulario Dinámico Conectado (`DynamicForm`)

Obtiene el formulario y sus respuestas desde la API, gestionando automáticamente el estado de carga, errores y mutaciones:

```tsx
import { DynamicForm } from 'sdi-form-builder'

export default function DynamicFormPage({ formId, responseId }: { formId: string; responseId: string }) {
  return (
    <DynamicForm
      formId={formId}
      formResponseId={responseId}
      buttonText="Actualizar Información"
    />
  )
}
```

---

## 🛠️ API Pública Exportada

| Exportación | Tipo | Descripción |
| :--- | :--- | :--- |
| `FormEditor` | Componente | Editor drag-and-drop de secciones y campos |
| `RenderForm` | Componente | Renderizador de esquemas de formularios |
| `DynamicForm` | Componente | Formulario auto-conectado a endpoints de API |
| `FormBuilderProvider` | Proveedor | Contexto global de configuración para la librería |
| `formBuilderSchema` | Función | Normalizador y constructor de esquemas de validación |
| `mapDynamicFormAnswerToFormAnswer` | Función | Utilidad para mapeo y conversión de respuestas |
| `type Form` | Tipo | Interfaz del modelo de formulario |

---

## 🧑‍💻 Scripts de Desarrollo

- `pnpm dev`: Inicia el servidor de desarrollo local con Vite.
- `pnpm build`: Compila los bundles ESM, CJS, tipos `.d.ts` y CSS encapsulado en la carpeta `dist/`.
- `pnpm typecheck`: Valida el tipado en TypeScript sin emitir archivos (`tsc --noEmit`).
- `pnpm lint`: Ejecuta el análisis estático de código con ESLint.

