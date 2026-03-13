import { Loader2 } from 'lucide-react'

const FormLoading = () => {
  return (
    <section className='flex min-h-60 items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 p-6'>
      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
        <Loader2 className='size-4 animate-spin' />
        Cargando formulario...
      </div>
    </section>
  )
}

export default FormLoading
