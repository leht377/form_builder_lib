interface FormVersionConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title: string;
    description?: string;
    isLoading?: boolean;
    hasHandleCreateNewVersion?: boolean;
}
export default function FormVersionConfirmationDialog({ open, onOpenChange, onConfirm, title, description, isLoading, hasHandleCreateNewVersion }: FormVersionConfirmationDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=form-version-confirmation-dialog.d.ts.map