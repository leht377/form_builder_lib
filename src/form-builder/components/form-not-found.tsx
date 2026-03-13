import { FileSearch } from 'lucide-react'

const FormNotFound = () => {
  return (
    <section className='flex min-h-60 items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 p-6'>
      <div className='flex flex-col items-center gap-2 text-center'>
        <FileSearch className='size-5 text-muted-foreground' />
        <p className='text-sm font-medium'>Formulario no encontrado</p>
        <p className='text-sm text-muted-foreground'>
          Verifica el identificador del formulario e intenta nuevamente.
        </p>
      </div>
    </section>
  )
}

export default FormNotFound
