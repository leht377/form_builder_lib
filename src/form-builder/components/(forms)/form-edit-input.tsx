import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useShowApiQuestionType } from '../../hooks/api/use-show-api-form-question-type'
import CreatableSelect from 'react-select/creatable'
import { Loader } from 'lucide-react'
import { toast } from '../../../components/react-sonner'
import { EditInputFormSchema, type EditInputForm } from '../../types/form-builder.types'
import { Separator } from '../../../components/ui/separator'
import { Button } from '../../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import FormFieldInput, { ReactSelectCustomStyles } from '@/components/ui/form-field-input'
import { Field, FieldLabel } from '@/components/ui/field'

interface Props {
  values?: EditInputForm
  onsubmit?: (data: EditInputForm) => Promise<void> | void
  closeDialog: () => void
}

const safeJsonParse = (input: unknown): any[] => {
  try {
    if (typeof input !== 'string') return []
    const parsed = JSON.parse(input)

    // Validar que sea un array de {value,label}
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item) => item && typeof item.value !== 'undefined' && typeof item.label === 'string'
    )
  } catch {
    return []
  }
}

const isDuplicateValue = (existingValues: any[], newValue: string): boolean => {
  return existingValues.some((item) => item.value?.toLowerCase() === newValue.toLowerCase())
}
const defaultFormValues: EditInputForm = {
  id: '',
  label: '',
  sectionId: '',
  required: false,
  question_type_id: '',
  description: '',
  placeholder: '',
  config: {}
}

const renderDynamicField = (form: any, key: string, fieldName: string, type: string) => {
  switch (type) {
    case 'date':
      return (
        <FormFieldInput
          control={form.control}
          name={`config.${key}`}
          label={fieldName}
          type='date'
        />
      )
    case 'string':
      return (
        <FormFieldInput
          control={form.control}
          name={`config.${key}`}
          label={fieldName}
          type='text-area'
        />
      )
    case 'number':
      return (
        <FormFieldInput
          control={form.control}
          name={`config.${key}`}
          label={fieldName}
          type='number'
          min={0}
        />
      )
    case 'boolean':
      return (
        <FormFieldInput
          control={form.control}
          name={`config.${key}`}
          label={fieldName}
          type='switch'
        />
      )

    case 'array':
      return (
        <Controller
          control={form.control}
          name={`config.${key}`}
          render={({ field }) => {
            const value = safeJsonParse(field.value)

            return (
              <Field>
                <div className='space-y-2'>
                  <FieldLabel>{fieldName}</FieldLabel>

                  <CreatableSelect
                    isMulti
                    styles={ReactSelectCustomStyles}
                    value={value}
                    onChange={(newValue) => {
                      form.setValue(`config.${key}`, JSON.stringify(newValue))
                    }}
                    onCreateOption={(inputValue) => {
                      // Validar que no exista un valor duplicado
                      if (isDuplicateValue(value, inputValue)) {
                        toast.error(`La opción "${inputValue}" ya existe`)
                        return
                      }

                      const newOption = {
                        value: inputValue,
                        label: inputValue
                      }

                      form.setValue(`config.${key}`, JSON.stringify([...value, newOption]))
                    }}
                    placeholder='Agrega opciones...'
                    className='text-sm'
                  />

                  <p className='text-xs text-muted-foreground'>
                    Puedes escribir una opción y presionar Enter para agregarla.
                  </p>
                </div>
                {/* <FormMessage /> */}
              </Field>
            )
          }}
        />
      )

    default:
      return <p className='text-sm text-muted-foreground'>Tipo no soportado: {type}</p>
  }
}

export default function FormEditInput({
  closeDialog,
  onsubmit,
  values = defaultFormValues
}: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const { data: questionType } = useShowApiQuestionType(values.question_type_id)

  const form = useForm<EditInputForm>({
    resolver: zodResolver(EditInputFormSchema),
    defaultValues: values
  })

  const handleSubmit = async (data: EditInputForm) => {
    try {
      setIsLoading(true)
      await onsubmit?.(data)
      closeDialog()
    } catch {
      // Error handled by onsubmit callback
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (questionType) {
      const currentConfig = form.getValues('config')
      const config: Record<string, string | null | boolean> = {}

      questionType.relationships.attributes.forEach((c) => {
        if (currentConfig && currentConfig[c.attributes.key]) {
          let currentValue = currentConfig[c.attributes.key]
          if (currentValue === 'false') currentValue = false
          else if (currentValue === 'true') currentValue = true

          config[c.attributes.key] = currentValue
        } else {
          let currentValue: string | boolean | null = c.attributes.default_value
          if (currentValue === 'false') currentValue = false
          else if (currentValue === 'true') currentValue = true
          config[c.attributes.key] = currentValue
        }
      })

      form.setValue('config', config)
    }
  }, [questionType])

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6 px-2 py-3'>
      <Tabs defaultValue='general' className='w-full'>
        <TabsList className='grid grid-cols-2 mb-4'>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='config'>Configuración extra</TabsTrigger>
        </TabsList>

        {/* TAB GENERAL */}
        <TabsContent value='general' className='space-y-4'>
          <FormFieldInput
            control={form.control}
            name='label'
            label='Nombre del campo'
            type='text'
            placeholder='Ingrese el nombre del campo'
          />

          <FormFieldInput
            control={form.control}
            name='description'
            label='Descripción'
            type='text-area'
            placeholder='Ingrese la descripción'
          />

          <FormFieldInput
            control={form.control}
            name='required'
            label='Campo obligatorio'
            type='switch'
          />
        </TabsContent>

        {/* TAB CONFIGURACIÓN EXTRA */}
        <TabsContent value='config' className='space-y-4'>
          <div className='space-y-3'>
            {questionType?.relationships.attributes?.length ? (
              questionType.relationships.attributes.map((attr) => {
                const { key, type, description } = attr.attributes
                return (
                  <React.Fragment key={attr.id}>
                    {renderDynamicField(form, key, description || key, type)}
                  </React.Fragment>
                )
              })
            ) : (
              <p className='text-sm text-muted-foreground'>
                No hay configuraciones adicionales para este tipo.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <div className='flex justify-end gap-2 pb-2'>
        <Button type='button' variant='outline' disabled={isLoading} onClick={closeDialog}>
          Cancelar
        </Button>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? <Loader className='animate-spin' /> : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
