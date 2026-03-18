import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import SortableSectionHeader from './sortable-section-header'
import SortableSectionContainer from './sortable-section-container'
import { ModalsNameTemplateBuilder } from '../../../constants/dialog-contants'
import SortableItem from '../sortable-item'
import SortableItemCard from './sortable-Item-card'
import type { EditInputForm, EditSectionForm, Section } from '@/form-builder/types/form-builder.types'
import { useModalActionStore } from '@/hooks/use-modal-action-store'
import BaseIcon from '@/components/base-icon'
interface SortableSectionProps {
  section: Section
  onLockItem: (sectionId: string, itemId: string, lock: boolean) => void
  isOver: boolean
}
export default function SortableSection({ section, onLockItem, isOver }: SortableSectionProps) {
  const openModal = useModalActionStore((s) => s.openModal)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
    data: { type: 'section' }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border-2 p-3 md:p-4 mb-4 transition-all bg-white ${
        isDragging
          ? 'border-orange-400 shadow-lg'
          : isOver
            ? 'border-green-400 shadow-lg'
            : 'border-gray-200'
      }`}
    >
      {/* Header */}
      {/* onRemoveSection(section.id) */}
      <SortableSectionHeader
        section={section}
        attributes={attributes}
        listeners={listeners}
        onRemoveSection={() =>
          openModal('delete', ModalsNameTemplateBuilder.deleteSection, {
            id: section.id,
            title: section.title
          })
        }
        onOpenSettings={() =>
          openModal('create', ModalsNameTemplateBuilder.configSection, {
            id: section.id,
            description: section.description,
            title: section.title,
            columns: section.columns?.toString()
          } as EditSectionForm)
        }
      />

      {/* Drop Area */}
      <SortableContext
        items={section.items.map((i) => i.id)}
        strategy={section.columns === 1 ? verticalListSortingStrategy : rectSortingStrategy}
      >
        <SortableSectionContainer
          isOver={isOver}
          hasItems={section.items.length > 0}
          columns={section.columns}
        >
          {section.items.length === 0 ? (
            <div
              className={`text-center py-8 rounded ${
                isOver ? 'text-blue-600 font-semibold' : 'text-gray-400'
              }`}
            >
              {isOver ? (
                <p className='self-center flex justify-center gap-2 items-center'>
                  {' '}
                  <BaseIcon name='CircleArrowDown' size={18} /> Suelta aquí
                </p>
              ) : (
                'Arrastra inputs aquí'
              )}
            </div>
          ) : (
            section.items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <SortableItemCard
                  item={item}
                  onRemove={() =>
                    openModal('delete', ModalsNameTemplateBuilder.deleteInput, {
                      id: item.id,
                      title: item.label,
                      sectionId: section.id
                    })
                  }
                  onLock={() => onLockItem(section.id, item.id, !item.isLock)}
                  onOpenSettings={() =>
                    openModal('create', ModalsNameTemplateBuilder.configInput, {
                      id: item.id,
                      label: item.label,
                      required: item.required,
                      description: item.description,
                      sectionId: section.id,
                      placeholder: item.placeholder,
                      question_type_id: item.question_type_id,
                      config: item.config
                    } as EditInputForm)
                  }
                />
              </SortableItem>
            ))
          )}
        </SortableSectionContainer>
      </SortableContext>
    </div>
  )
}
