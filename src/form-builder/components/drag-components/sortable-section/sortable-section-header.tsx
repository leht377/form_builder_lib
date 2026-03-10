import { Button } from '@/src/components/ui/button'
import BaseIcon from '@/src/components/ui/base-icon'
import { Section } from '../../../types/template-builder-types'

interface Props {
  section: Section
  attributes: any
  listeners: any
  onRemoveSection: () => void
  onOpenSettings: () => void
}

export default function SortableSectionHeader({
  section,
  attributes,
  listeners,
  onRemoveSection,
  onOpenSettings
}: Props) {
  return (
    <div className='flex items-center justify-between mb-3 gap-2'>
      {/* Grip + title */}
      <div className='flex flex-col flex-1'>
        <div className='flex justify-between flex-wrap'>
          <div
            className='flex items-center gap-2 cursor-grab p-2 w-fit touch-none select-none'
            {...attributes}
            {...listeners}
            title='Arrastra para reordenar sección'
          >
            <BaseIcon name='GripVertical' size={18} />
            <h3 className='text-lg font-semibold text-gray-700'>{section.title}</h3>
          </div>

          <div className='flex gap-1'>
            {!section.isLock && (
              <Button
                variant='outline'
                size='icon'
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveSection()
                }}
              >
                <BaseIcon name='Trash2' className='text-destructive' />
              </Button>
            )}

            <Button variant='outline' size='icon' onClick={onOpenSettings}>
              <BaseIcon name='Settings' />
            </Button>
          </div>
        </div>
        {section.description && (
          <p className='text-sm text-muted-foreground pl-8'>{section.description}</p>
        )}
      </div>

      {/* Botones */}
    </div>
  )
}
