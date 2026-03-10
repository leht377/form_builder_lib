import { useSortable } from "@dnd-kit/sortable"

export default function EmptyFormArea({ isOver }: { isOver: boolean }) {
  const { setNodeRef } = useSortable({
    id: 'empty-form-area',
    data: { type: 'empty-area' }
  })

  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg h-[300px]  p-12 text-center transition-colors flex items-center justify-center ${
        isOver
          ? 'border-green-400 bg-green-50 text-green-600 font-semibold'
          : 'border-gray-300 text-gray-400'
      }`}
    >
      <p>{isOver ? '⬇ Suelta para crear una sección' : 'Arrastra "Nueva Sección" aquí para comenzar'}</p>
    </div>
  )
}