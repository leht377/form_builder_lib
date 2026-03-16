'use client'
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  pointerWithin,
  type UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'
import type { EditInputForm, EditSectionForm, Form, Section } from './types/form-builder.types'
import NavInputsCreator from './components/nav-inputs-creator'
import FormAreaDroppable from './components/drag-components/form-area-droppable'
import SortableSection from './components/drag-components/sortable-section/sortable-section'
import EmptyFormArea from './components/drag-components/empty-form-area'
import useShowForm from './hooks/use-show-form'
import useApiVerifyFormHaveAnswers from './hooks/api/use-api-verify-form-have-answers'
import useManageFormSections from './hooks/use-manage-form-section'
import useManageFormInput from './hooks/use-manage-form-input'
import useListPaletteItems from './hooks/use-list-palette-items'
import { Loader } from 'lucide-react'
import RenderDialog from './components/(dialogs)/render-dialog'
import FormVersionConfirmationDialog from './components/(dialogs)/form-version-confirmation-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import useCreateNewVersion from './hooks/use-create-new-version'
import OverlayContent from './components/overlay-content'

interface Props {
  id: string
  onCreateNewVersion?: (form: Form) => void
}


const FormEditor = ({ id, onCreateNewVersion }: Props) => {
  const { sections, isLoading: isLoadingForm, refetch } = useShowForm(id)

  const { data } = useApiVerifyFormHaveAnswers(id)
  const hasAnswers = Boolean(data?.attributes.has_answers)
  const { createNewVersion, isPending: isCreatingNewVersion } = useCreateNewVersion()
  const { createSection, reorderSection, deleteSection, updateSection, isLoadingSection } =
    useManageFormSections({
      formId: id,
      hasAnswers,
      onRefetch: refetch
    })

  const { addQuestionToSection, reorderQuestion, deleteQuestion, updateQuestion, isLoadingInput } =
    useManageFormInput({
      formId: id,
      hasAnswers,
      onRefetch: refetch
    })

  // Estado para el diálogo de confirmación
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null)

  // Deshabilitar drag and drop cuando hay operaciones en curso
  const isPerformingAction =
    isLoadingSection || isLoadingInput || isLoadingForm || isCreatingNewVersion

  const { paletteItems } = useListPaletteItems()

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [activeType, setActiveType] = useState<string | null>(null)
  const [overId, setOverId] = useState<UniqueIdentifier | null>(null)

  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 8 }
    }),
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
    const type = event.active.data.current?.type
    setActiveType(type || null)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event
    setOverId(over ? over.id : null)
  }

  const findContainer = (id: string) => {
    for (const section of sections) {
      if (section.items.some((item) => item.id === id)) return section.id
    }
    return null
  }

  const handleCreateNewVersion = () => {
    createNewVersion({ id, has_answers: hasAnswers }, onCreateNewVersion)
  }

  const findSectionByItemId = (itemId: string) =>
    sections.find((section) => section.items.some((item) => item.id === itemId))?.id || null

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setOverId(null)

    if (!over) {
      setActiveId(null)
      setActiveType(null)
      return
    }

    const activeId = active.id.toString()
    const overId = over.id.toString()
    const overData = over.data.current

    // Crear nueva sección SOLO si se suelta en zonas válidas
    if (activeType === 'section-creator') {
      const isOverSection = sections.some((s) => s.id === overId)
      const isOverItem = findSectionByItemId(overId) !== null
      const isOverFormArea = overId === 'main-form-area'

      if (isOverSection || isOverItem || isOverFormArea || sections.length === 0) {
        createSection(() => {
          setPendingAction(() => handleCreateNewVersion)
          setShowConfirmDialog(true)
        })
      } else {
        // Drop inválido: no crear sección
        setActiveId(null)
        setActiveType(null)
        return
      }
    }

    // Reordenar secciones
    else if (activeType === 'section') {
      const oldIndex = sections.findIndex((s) => s.id === activeId)
      let result: Section[] = []
      // Permitir reordenar si se suelta sobre otra sección o en el área general
      if (overData?.type === 'section' || overId === 'main-form-area') {
        let newIndex = sections.findIndex((s) => s.id === overId)

        if (newIndex === -1) {
          // Si no encontramos una sección sobre, insertar al final
          newIndex = sections.length - 1
        }

        if (oldIndex !== -1 && oldIndex !== newIndex) {
          result = arrayMove(sections, oldIndex, newIndex)
        }
      } else {
        // Si se suelta sobre un input, también permitir el reorden
        const newIndex = sections.findIndex((s) => s.items.some((i) => i.id === overId))
        if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
          result = arrayMove(sections, oldIndex, newIndex)
        }
      }
      reorderSection(result)
    }

    // Arrastrar items
    else if (activeType === 'palette-item' || activeType === 'form-item') {
      const isPaletteItem = paletteItems.some((item) => item.id === activeId)
      const activeContainer = findContainer(activeId)

      let overContainer: string | null = null
      if (sections.some((s) => s.id === overId)) overContainer = overId
      else overContainer = findSectionByItemId(overId)

      // Drop desde la paleta
      if (isPaletteItem && overContainer) {
        const paletteItem = paletteItems.find((item) => item.id === activeId)
        if (paletteItem) {
          addQuestionToSection(
            overContainer,
            paletteItem.id.split('-')[1],
            `Campo ${paletteItem.type}`,
            () => {
              setPendingAction(() => handleCreateNewVersion)
              setShowConfirmDialog(true)
            }
          )
        }
      }

      // Mover entre secciones o dentro de la misma
      else if (activeContainer && overContainer) {
        if (activeContainer === overContainer) {
          const x = sections.find((s) => s.id === activeContainer)
          if (!x) return
          const r = arrayMove(
            x.items,
            x.items.findIndex((i) => i.id === activeId),
            x.items.findIndex((i) => i.id === overId)
          )
          reorderQuestion(r)
        } else {
          const activeSection = sections.find((s) => s.id === activeContainer)
          const activeItem = activeSection?.items.find((i) => i.id === activeId)
          const targetSection = sections.find((s) => s.id === overContainer)
          if (activeItem && activeSection && targetSection) {
            reorderQuestion(
              [...targetSection?.items, activeItem],
              targetSection.id.split('-')[0] as any
            )
          }
        }
      }
    }

    setActiveId(null)
    setActiveType(null)
  }

  const handleLockItem = async (sectionId: string, itemId: string, isLock: boolean) => {
    try {
      await updateQuestion({
        questionId: Number(itemId.split('-')[0]),
        sectionId: Number(sectionId.split('-')[0]),
        is_locked: isLock
      })
    } catch {}
  }

  const getOverSection = () => {
    if (!overId) return null
    if (sections.some((s) => s.id === overId)) return overId.toString()
    return findSectionByItemId(overId.toString())
  }

  const handleEditSection = (section: EditSectionForm) => updateSection(section)

  const handleEditInput = (input: EditInputForm) =>
    updateQuestion({
      description: input.description ?? '',
      is_required: input.required,
      sectionId: Number(input.sectionId.split('-')[0]),
      label: input.label,
      questionId: Number(input.id.split('-')[0]),
      config: input.config
    })

  const handleDeleteSection = (sectionId: string) => {
    deleteSection(sectionId)
  }

  const handleDeleteQuestion = (sectionId: string, questionId: string) => {
    deleteQuestion(sectionId, questionId)
  }

  const overSection = getOverSection()
  const isFormAreaOver =
    activeType === 'section-creator' &&
    (overId?.toString() === 'main-form-area' ||
      sections.some((s) => s.id === overId) ||
      findSectionByItemId(overId?.toString() || '') !== null ||
      sections.length === 0)

  const sectionIds = sections.map((s) => s.id)

  const handleConfirmAction = () => {
    if (!pendingAction) return
    pendingAction()
    setPendingAction(null)
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className='min-h-[80vh] relative'>
          {/* Overlay de carga cuando hay operaciones en curso */}
          {isPerformingAction && (
            <div className='absolute inset-0 bg-white/60 backdrop-blur-[2px] z-50 flex items-center justify-center rounded-xl'>
              <div className='bg-white rounded-lg shadow-lg border border-gray-200 px-6 py-4 flex items-center gap-3'>
                <Loader className='animate-spin' />
                <span className='text-sm font-medium text-gray-700'>
                  Actualizando información...
                </span>
              </div>
            </div>
          )}

          <div className='w-full mx-auto'>
            {/* CONTENEDOR RESPONSIVE */}
            <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
              {/* ---------- SIDEBAR RESPONSIVE ---------- */}
              <div className='w-full md:w-72 md:min-w-[288px] md:sticky md:top-0  border md:border-0 rounded-xl p-2 md:p-0'>
                <ScrollArea className='md:h-[90vh] md:overflow-y-auto'>
                  <NavInputsCreator paletteItems={paletteItems} />
                </ScrollArea>
              </div>

              {/* ---------- ÁREA DEL FORMULARIO ---------- */}
              <div className='flex-1 min-w-0 md:px-0'>
                <div className='bg-white rounded-xl  md:p-6'>
                  <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
                    <FormAreaDroppable isOver={isFormAreaOver} isEmpty={sections.length === 0 ? true : false}>
                      {sections.length === 0 ? (
                        <div
                          className={`border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition-colors ${
                            isFormAreaOver
                              ? 'border-green-400 bg-green-50 text-green-600 font-semibold'
                              : 'border-gray-300 text-gray-400'
                          }`}
                        >
                          <EmptyFormArea isOver={activeType === 'empty-area'} />
                        </div>
                      ) : (
                        sections.map((section) => (
                          <SortableSection
                            onLockItem={handleLockItem}
                            key={section.id}
                            section={section}
                            isOver={
                              activeType !== 'section' &&
                              activeType !== 'section-creator' &&
                              overSection === section.id
                            }
                          />
                        ))
                      )}
                    </FormAreaDroppable>
                  </SortableContext>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DragOverlay dropAnimation={null}>
          {activeId ? (
            <OverlayContent
              type={activeType || ''}
              label={
                activeType === 'section'
                  ? sections.find((s) => s.id === activeId)?.title || ''
                  : paletteItems.find((item) => item.id === activeId)?.label ||
                    sections.flatMap((s) => s.items).find((item) => item.id === activeId)?.label ||
                    ''
              }
              icon={
                activeType === 'section-creator'
                  ? 'LayoutPanelTop' // un icono representativo
                  : paletteItems.find((item) => item.id === activeId)?.icon ||
                    sections.flatMap((s) => s.items).find((item) => item.id === activeId)?.icon
              }
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <RenderDialog
        onEditSection={handleEditSection}
        onEditInput={handleEditInput}
        onDeleteSection={handleDeleteSection}
        onDeleteInput={handleDeleteQuestion}
      />
      <FormVersionConfirmationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmAction}
        title='¿Crear nueva versión del formulario?'
        description='Como este formulario ya tiene respuestas registradas, se creará una nueva versión con los cambios. Las respuestas anteriores no serán modificadas.'
        isLoading={isLoadingSection || isLoadingInput}
      />
    </>
  )
}

export default FormEditor
