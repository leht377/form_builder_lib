import React, { type JSX } from 'react'
import type { FormQuestionTypeInput } from '../types/form-builder.types'
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

// const ReactQuill = dynamic(() => import("react-quill-new"), {
//   ssr: false, // <-- LO IMPORTANTE
// });
// import 'react-quill-new/dist/quill.snow.css';

interface Props {
  type: FormQuestionTypeInput

  onClick?: React.MouseEventHandler<HTMLInputElement>
  placeholder?: string
  label: string
  description?: string
  required?: boolean
}

const InputSelect = ({ placeholder }: { placeholder: string }) => {
  return (
    <Select>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Opciones</SelectLabel>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
const RenderTemplateInput = ({
  type,
  onClick,
  placeholder,
  label,
  description,
  required
}: Props) => {
  const renderInput: Record<FormQuestionTypeInput, JSX.Element> = {
    file: <Input type='file' placeholder={placeholder} readOnly onClick={onClick} />,
    number: <Input type='number' placeholder={placeholder} readOnly onClick={onClick} />,
    date: <Input type='date' placeholder={placeholder} readOnly onClick={onClick} />,
    text: <Input type='text' placeholder={placeholder} readOnly onClick={onClick} />,
    select: <InputSelect placeholder={placeholder ?? ''} />
  }

  return (
    <div>
      {label && (
        <Label className='my-2'>
          {label}{' '}
          <span className={cn(required ? 'block text-destructive text-xs font-medium' : 'hidden')}>
            (obligatorio)
          </span>
        </Label>
      )}
      {renderInput[type]}
      {description && <p className='text-sm my-1 text-muted-foreground'>{description}</p>}
    </div>
  )
}

export default RenderTemplateInput
