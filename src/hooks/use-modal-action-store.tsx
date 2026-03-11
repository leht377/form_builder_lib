import { create } from 'zustand'

export type ModalActionType = 'create' | 'update' | 'delete' | null

interface ModalActionState {
  name: string
  action: ModalActionType
  data?: unknown
  open: boolean
  openModal: (action: ModalActionType, name: string, data?: unknown) => void
  closeModal: () => void
  isSuccess?: boolean
  setIsSuccess: (isSuccess: boolean) => void
}

export const useModalActionStore = create<ModalActionState>((set) => ({
  action: null,
  data: undefined,
  open: false,
  name: 'default',
  isSuccess: false,
  setIsSuccess: (isSuccess) => set({ isSuccess }),
  error: () => set({ action: null, data: undefined, open: false }),
  openModal: (action, name, data) => {
    set({ action, data, open: true, name })
  },
  closeModal: () => set({ action: null, data: undefined, open: false, name: 'default' })
}))
