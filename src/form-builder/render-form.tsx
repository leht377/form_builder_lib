import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod/v3'
import { Loader } from 'lucide-react'
import type { FormDynamicSchema, SpecialFormConfig } from './types/dynamic-form.types'
import { buildInitialValues, buildZodSchema } from './utils/dynamic-form-utils'
import { cn, renderValidationErrors } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import FormFieldInput from '@/components/ui/form-field-input'
import { useIsMobile } from '@/hooks/use-mobile'
import { FieldGroup } from '@/components/ui/field'

interface DynamicFormProps {
  formSchema: FormDynamicSchema
  onSubmit: (values: Record<string, unknown>) => void

  className?: React.HTMLAttributes<HTMLFormElement>['className']
  titleSectionContainerClassName?: React.HTMLAttributes<HTMLFormElement>['className']
  sectionClassName?: React.HTMLAttributes<HTMLElement>['className']
  questionContainerClassName?: React.HTMLAttributes<HTMLElement>['className']
  titleContainerClassName?: React.HTMLAttributes<HTMLElement>['className']

  initialValues?: Record<string, string>
  buttonText?: string
  isSending?: boolean
  disabledSubmit?: boolean
  disabled?: boolean
  error?: Record<string, string>
  specialFormConfig?: SpecialFormConfig
  isModeUploadFile?: boolean
  handleDeleteFileUploaded?: (uri: string) => Promise<void>
  isReadonly?: boolean
}

const RenderForm = ({
  formSchema,
  onSubmit,
  className,
  initialValues,
  buttonText = 'Crear',
  isSending,
  sectionClassName,
  questionContainerClassName,
  titleContainerClassName,
  error,
  disabledSubmit,
  titleSectionContainerClassName,
  specialFormConfig,
  disabled,
  isReadonly
}: DynamicFormProps) => {
  const inputsDefinitions = formSchema.sections.map((s) => s.questions).flat(2)
  const isMobile = useIsMobile()
  const initialVal = buildInitialValues(inputsDefinitions, initialValues)
  const zodSchema = buildZodSchema(inputsDefinitions, specialFormConfig)
  const form = useForm<z.infer<typeof zodSchema>>({
    resolver: zodResolver(zodSchema),
    defaultValues: initialVal
  })
  useEffect(() => {
    if (error) {
      renderValidationErrors(error, form.setError)
    }
  }, [error, form.setError])

  return (
    <section>
      {/* Header */}
      {/* <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre> */}
      <div className={cn('mb-7', titleContainerClassName)}>
        <h2 className='text-2xl font-bold first-letter:capitalize'>{formSchema.name}</h2>
        {formSchema.description && (
          <p className='text-sm text-muted-foreground'>{formSchema.description}</p>
        )}
      </div>
      <form className={cn('flex flex-col gap-5', className)} onSubmit={form.handleSubmit(onSubmit)}>
        {formSchema.sections.map((section) => (
          <div key={section.id} className={cn('flex flex-col gap-7', sectionClassName)}>
            <article className={cn(titleSectionContainerClassName)}>
              {section.title && <h3 className='text-xl font-semibold'>{section.title}</h3>}
              {section.description && (
                <p className='text-sm text-muted-foreground'>{section.description}</p>
              )}
            </article>

            <FieldGroup>
              <div
                className={cn(questionContainerClassName)}
                style={{
                  display: 'grid',
                  gap: 10,
                  gridTemplateColumns: isMobile
                    ? `repeat(1, 1fr)`
                    : `repeat(${section.columns ?? 1}, 1fr)`,
                  alignItems: 'flex-start'
                }}
              >
                {section.questions.map((field, index) => (
                  <FormFieldInput
                    key={index}
                    control={form.control}
                    name={field.name}
                    type={field.type}
                    label={field.label}
                    placeholder={field.placeholder}
                    description={field.description}
                    options={field.options}
                    isRequired={field.required}
                    min={field.min}
                    max={field.max}
                    isMultiSelect={field.config?.multiple}
                    multiple={field.config?.multiple}
                    accept={field.config?.accept}
                    formatThousands={field.config?.formatThousands}
                    readOnly={isReadonly}
                  
                  />
                ))}
              </div>
            </FieldGroup>
          </div>
        ))}

        <Button
          type='submit'
          className='self-end'
          disabled={isSending || disabledSubmit || disabled}
          style={{ display: isReadonly ? 'none' : 'block' }}
          hidden={inputsDefinitions.length === 0}
        >
          {isSending ? <Loader className='animate-spin' /> : buttonText}
        </Button>
      </form>
    </section>
  )
}

export default RenderForm
