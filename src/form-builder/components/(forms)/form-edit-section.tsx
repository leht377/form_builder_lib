import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Loader } from 'lucide-react'
import {
  EditSectionFormSchema,
  type EditSectionForm
} from '@/form-builder/types/form-builder.types'
import FormFieldInput from '@/components/ui/form-field-input'
import { Button } from '@/components/ui/button'

interface Props {
  values?: EditSectionForm
  onsubmit?: (d: EditSectionForm) => Promise<void> | void
  closeDialog: () => void
}

const FormEditSection = ({
  onsubmit,
  closeDialog,
  values = { description: '', id: '', title: '', columns: 1 }
}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<EditSectionForm>({
    resolver: zodResolver(EditSectionFormSchema),
    defaultValues: values
  })

  const handleSubmit = async (v: EditSectionForm) => {
    try {
      setIsLoading(true)
      await onsubmit?.(v)
      closeDialog()
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6 px-3'>
      <FormFieldInput
        control={form.control}
        name='title'
        label='Nombre de la sección'
        type='text'
        placeholder='Nombre de la sección'
      />
      <FormFieldInput
        control={form.control}
        name='description'
        label='Descripción de la sección'
        type='text-area'
        placeholder='Descripción de la sección'
      />
      <FormFieldInput
        control={form.control}
        name='columns'
        label='Numero de columnas'
        type='number'
        min={1}
        max={12}
        placeholder='Numero de columns'
      />
      <div className='flex justify-end  gap-2'>
        <Button type='button' variant='outline' disabled={isLoading} onClick={closeDialog}>
          Cancelar
        </Button>
        <Button type='submit' disabled={isLoading}>
          {isLoading ? <Loader className='animate-spin' /> : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}

export default FormEditSection
