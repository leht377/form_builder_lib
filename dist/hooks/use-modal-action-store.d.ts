export type ModalActionType = 'create' | 'update' | 'delete' | null;
interface ModalActionState {
    name: string;
    action: ModalActionType;
    data?: unknown;
    open: boolean;
    openModal: (action: ModalActionType, name: string, data?: unknown) => void;
    closeModal: () => void;
    isSuccess?: boolean;
    setIsSuccess: (isSuccess: boolean) => void;
}
export declare const useModalActionStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ModalActionState>>;
export {};
//# sourceMappingURL=use-modal-action-store.d.ts.map