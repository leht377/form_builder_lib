import {
  toast as sonnerToast,
  type Action,
  type ExternalToast,
  type ToastClassnames,
  type ToastT,
  type ToastToDismiss,
  Toaster,
  type ToasterProps,
  useSonner
} from 'sonner'

const toast = {
  success: (message: string, options?: ExternalToast) => {
    return sonnerToast.success(message, {
      duration: 5000,
      richColors: true,
      closeButton: true,
      ...options
    })
  },
  error: (message: string, options?: ExternalToast) => {
    return sonnerToast.error(message, {
      duration: 5000,
      richColors: true,
      ...options
    })
  },
  // Puedes añadir info, warning, etc.
  info: (message: string, options?: ExternalToast) => {
    return sonnerToast.info(message, {
      duration: 4000,
      richColors: true,
      ...options
    })
  },
  warning: (message: string, options?: ExternalToast) => {
    return sonnerToast.warning(message, {
      duration: 4000,
      richColors: true,
      ...options
    })
  }
}

export {
  toast,
  type Action,
  type ExternalToast,
  type ToastClassnames,
  type ToastT,
  type ToastToDismiss,
  Toaster,
  type ToasterProps,
  useSonner
}
