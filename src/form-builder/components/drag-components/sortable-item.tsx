import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import BaseIcon from '../../../components/base-icon'

interface SortableItemProps {
  id: string
  children: React.ReactNode
}

export default function SortableItem({ id, children }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { type: 'form-item' }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={style} className='mb-2 flex gap-2'>
      <div className='p-2 cursor-grab touch-none select-none' {...attributes} {...listeners}>
        <BaseIcon name='GripVertical' size={18} />
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  )
}
