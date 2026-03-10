import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { IconName } from '../../../components/base-icon'
import BaseIcon from '../../../components/base-icon'

interface DraggableSectionCreatorProps {
  id: string
  label: string
  icon?: IconName
}
export default function DraggableSectionCreator({ id, label, icon }: DraggableSectionCreatorProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id,
    data: { type: 'section-creator' }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='bg-green-100 p-3 mb-2 rounded-lg border-2 border-green-400 cursor-grab hover:bg-green-200 transition-colors touch-none select-none'
      onPointerDown={(e) => {
        // Evita que eventos del contenedor interfieran con el gesto de drag
        e.stopPropagation()
      }}
    >
      <div
        className='flex gap-2 items-center'
        {...attributes}
        {...listeners}
        role='button'
        tabIndex={0}
        onClick={(e) => {
          // Previene activaciones por click cuando el objetivo es iniciar drag
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {icon && <BaseIcon name={icon} size={18} className=' text-green-800' />}
        <span className='font-semibold text-green-800'>{label}</span>
      </div>
    </div>
  )
}
