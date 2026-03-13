import RenderForm from './render-form'
import { useShowApiForm } from './hooks/api/use-show-api-form'
import { extractInitialValues, formBuilderSchema } from './utils/dynamic-form-utils'
import { useDynamicFormSubmit } from './hooks/use-dynamic-form-submit'
import { toast } from '@/components/react-sonner'
import { queryClient } from '@/lib/react-query'
import useErrorHandler from '@/hooks/use-handle-error'
import type { AxiosError } from 'axios'
import type { ComponentProps } from 'react'
import useShowApiFormResponse from './hooks/api/use-show-api-form-response'
import FormLoading from './components/form-loading'
import FormNotFound from './components/form-not-found'

type DynamicFormRenderProps = Omit<
  ComponentProps<typeof RenderForm>,
  'formSchema' | 'onSubmit' | 'isSending' | 'initialValues'
>

interface Props extends DynamicFormRenderProps {
  formId: string
  formResponseId: string
}

const DynamicForm = ({ formId, formResponseId, ...renderFormProps }: Props) => {
  const { data: form, isLoading: isLoadignForm } = useShowApiForm(formId)
  const { data: formResponse, isLoading: isLoadingResponse } = useShowApiFormResponse({
    formId: formId?.toString(),
    formResponseId: formResponseId?.toString()
  })

  const aswersAssociatedIds = new Map(
    formResponse?.relationships.answers.map((a) => [
      Number(a.attributes.form_question_id),
      Number(a.id)
    ])
  )

  const { handleSubmit: handleSubmitDynamicForm, isLoading: isSubmitingForm } =
    useDynamicFormSubmit({
      formId: formId?.toString(),
      userId: '1',
      formResponse: formResponse,
      answersAssociatedIds: aswersAssociatedIds
      // formResponse,
    })

  const { errorhandler } = useErrorHandler()

  const handleSubmit = async (response: Record<string, any>) => {
    handleSubmitDynamicForm(response, formResponseId, {
      onSuccess() {
        toast.success('Información actualizada con éxito!')
        queryClient.invalidateQueries({
          queryKey: ['show-form-response']
        })
      },
      onError(error) {
        errorhandler(error as AxiosError)
      }
    })
  }

  if (isLoadignForm || isLoadingResponse) return <FormLoading />
  if (!form) return <FormNotFound />

  const formSchema = formBuilderSchema(form, 'strict')

  return (
    <RenderForm
      {...renderFormProps}
      formSchema={formSchema}
      onSubmit={handleSubmit}
      isSending={isSubmitingForm}
      initialValues={extractInitialValues(formResponse)}
    />
  )
}

export default DynamicForm
