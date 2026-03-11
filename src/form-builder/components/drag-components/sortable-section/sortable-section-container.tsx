import { cn } from "@/lib/utils"

interface Props {
  isOver: boolean
  hasItems: boolean
  columns?: number
  children: React.ReactNode
}

export default function SortableSectionContainer({
  isOver,
  hasItems,
  columns = 1,
  children
}: Props) {
  return (
    <div
      className={cn(
        'min-h-[120px] rounded-lg p-3 border-2 border-dashed transition-all border-gray-300',
        hasItems && !isOver && 'border-transparent',
        isOver ? 'bg-blue-50 border-blue-400 shadow-inner' : 'bg-white'
      )}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${hasItems ? columns : 1}, 1fr)`,

        gap: 5
      }}
    >
      {children}
    </div>
  )
}
