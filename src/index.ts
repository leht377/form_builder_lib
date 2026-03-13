import './index.css'

// COMPONENTS PRINCIPALES
export { default as FormEditor } from './form-builder/form-editor'
export { default as RenderForm } from './form-builder/render-form'
export { default as DynamicForm } from './form-builder/dynamic-form'

// UTILIDADES DE COMPONENTE

export {
  formBuilderSchema,
  mapDynamicFormAnswerToFormAnswer
} from './form-builder/utils/dynamic-form-utils'

// PROVIDER
export * from './form-builder/providers'

export { type Form } from './form-builder/types/form-builder.types'
