
import type { JSX } from 'react'
import { useModalActionStore } from '../../../hooks/use-modal-action-store'
import type { ModalsNameTemplateBuilder } from '../../constants/dialog-contants'
import type { EditInputForm, EditSectionForm } from '../../types/form-builder.types'
import { DialogDeleteInput } from './dialog-delete-input'
import SheetConfig from '../sheet-config/sheet-config'
import { DialogDeleteSection } from './dialog-delete-section'
import FormEditSection from '../(forms)/form-edit-section'
import FormEditInput from '../(forms)/form-edit-input'
interface Props {
  onEditSection: (s: EditSectionForm) => void
  onEditInput: (input: EditInputForm) => void
  onDeleteSection: (id: string) => void
  onDeleteInput: (sectionId: string, id: string) => void
}
const RenderDialog = ({ onEditSection, onEditInput, onDeleteSection, onDeleteInput }: Props) => {
  const { name, data, open, closeModal } = useModalActionStore()
  const dialog: Record<ModalsNameTemplateBuilder, JSX.Element> = {
    configSection: (
      <SheetConfig visible={open} close={closeModal} title='Editar sección'>
        <FormEditSection values={data as any} onsubmit={onEditSection} closeDialog={closeModal} />
      </SheetConfig>
    ),
    configInput: (
      <SheetConfig
        visible={open}
        close={closeModal}
        title={`Editar campo ${(data as any)?.label ?? ''}`}
      >
        <FormEditInput closeDialog={closeModal} values={data as any} onsubmit={onEditInput} />
      </SheetConfig>
    ),
    deleteSection: (
      <DialogDeleteSection
        visible={open}
        close={closeModal}
        data={data as any}
        deleteSection={onDeleteSection}
      />
    ),
    deleteInput: (
      <DialogDeleteInput
        visible={open}
        close={closeModal}
        data={data as any}
        deleteInput={onDeleteInput}
      />
    )
  }

  return open && dialog[name as ModalsNameTemplateBuilder]
}

export default RenderDialog
