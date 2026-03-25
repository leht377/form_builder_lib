'use client'

import BaseIcon from '../../../components/base-icon'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../../../components/ui/alert-dialog'

interface FormVersionConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title: string
  description?: string
  isLoading?: boolean
  hasHandleCreateNewVersion?: boolean
}

export default function FormVersionConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  isLoading = false,
  hasHandleCreateNewVersion = false
}: FormVersionConfirmationDialogProps) {
  const handleConfirm = () => {
    if (hasHandleCreateNewVersion) {
      onConfirm()
    }
    onOpenChange(false)
  }

  const defaultDescription = hasHandleCreateNewVersion
    ? 'Esta acción modificará el formulario que ya tiene respuestas registradas.'
    : 'Este formulario ya tiene respuestas registradas y no puede ser modificado directamente.'

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center gap-2'>
            <BaseIcon name='AlertTriangle' className='size-5 text-amber-600' />
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className='text-left space-y-2'>
            <span>{description || defaultDescription}</span>

            {hasHandleCreateNewVersion ? (
              <>
                <span className='font-medium text-foreground'>
                  Al confirmar, se creará automáticamente una nueva versión del formulario para
                  preservar la integridad de los datos existentes.
                </span>
                <span className='text-muted-foreground'>
                  ¿Deseas continuar?
                </span>
              </>
            ) : (
              <span className='font-medium text-foreground'>
                Debes crear una nueva versión del formulario para poder realizar modificaciones.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {hasHandleCreateNewVersion ? 'Cancelar' : 'Entendido'}
          </AlertDialogCancel>

          {hasHandleCreateNewVersion && (
            <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? (
                <>
                  <BaseIcon name='Loader' className='size-4 animate-spin' />
                  Procesando...
                </>
              ) : (
                <>Confirmar</>
              )}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}