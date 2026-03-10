import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { FormQuestionTypeInput } from '../../types/form-builder.types'
import type { IconName } from '../../../components/base-icon'
import BaseIcon from '../../../components/base-icon'

interface DraggableInputProps {
  id: string
  type: FormQuestionTypeInput
  label: string
  icon?: IconName
}

export default function DraggableInput({ id, label, icon }: DraggableInputProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id,
    data: { type: 'palette-item' }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.6 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        p-3 mb-2 rounded-lg border
        bg-white
        border-gray-200 
        cursor-grab
        transition-all
        shadow-sm
        touch-none
        select-none

        hover:bg-gray-50
        hover:border-gray-300

        ${isDragging ? 'shadow-md scale-[1.01] border-gray-300' : ''}
      `}
    >
      <div className="flex gap-3 items-center text-gray-700">
        {icon && <BaseIcon name={icon} size={18} className="text-gray-600" />}
        {label && <span className="font-medium">{label}</span>}
      </div>
    </div>
  )
}
