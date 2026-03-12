import useApiDuplicateForm from './api/use-api-duplicate-form'
import useErrorHandler from '@/hooks/use-handle-error'
import { toast } from '../../components/react-sonner'
import type { Form } from '../types/form-builder.types'
import type { DuplicateFormPayload } from '@/types/response.types'

const useCreateNewVersion = () => {
  const { mutate, isPending } = useApiDuplicateForm()
  const { errorhandler } = useErrorHandler()

  const createNewVersion = (
    data: DuplicateFormPayload,
    onCreateNewVersion?: (data: Form) => void
  ) => {
    mutate(data, {
      onSuccess: (data) => {
        onCreateNewVersion?.(data)
        toast.success('Se creó una nueva versión del formulario')
      },
      onError(error) {
        errorhandler(error)
      }
    })
  }

  return {
    createNewVersion,
    isPending
  }
}

export default useCreateNewVersion
