import { FieldValues, UseFormSetError } from 'react-hook-form'
import { toast } from '../components/react-sonner'
import { renderValidationErrors } from '../lib/utils'
import { AxiosError } from 'axios'

interface UseFormErrorHandlerConfig {
  notFound?: { title?: string; description?: string }
  forbidden?: { title?: string; description?: string }
}

interface UseFormErrorHandlerProps<T extends FieldValues> {
  setError?: UseFormSetError<T>
  config?: UseFormErrorHandlerConfig
}

const useErrorHandler = <T extends FieldValues>(props?: UseFormErrorHandlerProps<T>) => {
  const config = props?.config
  const setError = props?.setError

  const toastForbidden = () => {
    toast.error(config?.forbidden?.title ?? 'Acceso denegado', {
      description:
        config?.forbidden?.description ??
        'No tienes permiso para realizar esta acción. Si crees que es un error, contacta al área de T.I.',
      duration: 10000,
      closeButton: true
    })
  }

  const toastNotFound = () => {
    toast.error(config?.notFound?.title || 'Data no encontrada', {
      description:
        config?.notFound?.description ||
        'No pudimos encontrar la información solicitada. Intenta nuevamente.',
      duration: 10000,
      closeButton: true
    })
  }

  const toastValidationError = (message?: string) => {
    toast.error('Error de validación', {
      description:
        message || 'Hay campos con errores o incompletos. Por favor, revisa e intenta nuevamente.',
      duration: 10000,
      closeButton: true
    })
  }

  const renderToastError = () => {
    toast.error('Error interno del servidor', {
      description: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
      duration: 10000,
      closeButton: true
    })
  }

  type ValidationError = string | string[] | Record<string, any> | null | undefined

  const extractFirstErrorMessage = (
    errors: ValidationError,
    fallback = 'Error de validación'
  ): string => {
    if (!errors) return fallback

    // Caso: string directo
    if (typeof errors === 'string') {
      return errors
    }

    // Caso: array
    if (Array.isArray(errors)) {
      const first = errors[0]

      if (typeof first === 'string') return first

      if (typeof first === 'object') {
        return extractFirstErrorMessage(first, fallback)
      }
    }

    // Caso: objeto
    if (typeof errors === 'object' && !Array.isArray(errors)) {
      const firstKey = Object.keys(errors)[0]

      if (!firstKey) return fallback

      return extractFirstErrorMessage((errors as Record<string, any>)[firstKey], fallback)
    }

    return fallback
  }

  const handleValidationError = (errors: unknown, message?: string) => {
    if (setError) {
      renderValidationErrors(errors as any, setError)
      return
    }

    const errorMessage = extractFirstErrorMessage(errors as ValidationError, message)

    toastValidationError(errorMessage)
  }

  const handleApiError = (err: any) => {
    if (err instanceof AxiosError) {
      switch (err.status) {
        case 422: {
          handleValidationError(err.response?.data?.errors, err.response?.data?.message)
          break
        }
        case 404:
          toastNotFound()
          break
        case 403:
          toastForbidden()
          break
        case 500:
          renderToastError()
          break
        default:
          toast.error('Error', {
            description:
              err.response?.data?.message || err.message || 'Ocurrió un error inesperado',
            duration: 10000,
            closeButton: true
          })
      }
    }
  }

  const errorhandler = (err: AxiosError) => {
    handleApiError(err)
  }

  return { errorhandler }
}

export default useErrorHandler
