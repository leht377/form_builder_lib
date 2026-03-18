
import { Loader, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../../components/ui/alert-dialog'

interface Props {
  visible: boolean
  close: () => void
  data: {
    id: string
    title: string,
    sectionId: string
  }
  deleteInput: ( sectionId: string, id: string,) => Promise<void> | void
}

export function DialogDeleteInput({ visible, close, data, deleteInput }: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await deleteInput(data.sectionId,data.id)
      close()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={visible} onOpenChange={() => {}}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10'>
              <Trash2 className='h-5 w-5 text-destructive' />
            </div>

            <AlertDialogTitle className='text-lg'>Eliminar campo</AlertDialogTitle>
          </div>

          <AlertDialogDescription className='pt-2'>
            ¿Estás seguro de que deseas eliminar el campo{' '}
            <span className='font-medium text-foreground'>“{data.title}”</span>
            ?
            <br />
            Esta acción es permanente y no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={close} disabled={isLoading}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            className='bg-red-400 text-destructive-foreground hover:bg-destructive/90 text-white'
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? <Loader className='animate-spin' /> : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
