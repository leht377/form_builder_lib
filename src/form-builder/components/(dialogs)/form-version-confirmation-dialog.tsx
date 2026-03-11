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
}

export default function FormVersionConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  isLoading = false
}: FormVersionConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-center gap-2'>
            <BaseIcon name='AlertTriangle' className='size-5 text-amber-600' />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-left space-y-2'>
            <span>
              {description ||
                'Esta acción modificará el formulario que ya tiene respuestas registradas.'}
            </span>
            <span className='font-medium text-foreground'>
              Al confirmar, se creará automáticamente una nueva versión del formulario para
              preservar la integridad de los datos existentes.
            </span>
            <span className='text-muted-foreground'>¿Deseas continuar?</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
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
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
