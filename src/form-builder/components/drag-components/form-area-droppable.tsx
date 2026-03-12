import { useDroppable } from '@dnd-kit/core'
import { type ReactNode } from 'react'

interface FormAreaDroppableProps {
  children: ReactNode
  isOver: boolean
  isEmpty?: boolean
}

export default function FormAreaDroppable({ children, isOver }: FormAreaDroppableProps) {
  const { setNodeRef } = useDroppable({
    id: 'main-form-area',
    data: { type: 'form-area' }
  })

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[500px] transition-all rounded-lg p-4 border-2 ${
        isOver ? 'bg-green-50 border-dashed border-green-400' : 'border-transparent'
      }`}
    >
      {children}
    </div>
  )
}
