interface Props {
    visible: boolean;
    close: () => void;
    data: {
        id: string;
        title: string;
        sectionId: string;
    };
    deleteInput: (sectionId: string, id: string) => Promise<void> | void;
}
export declare function DialogDeleteInput({ visible, close, data, deleteInput }: Props): import("react").JSX.Element;
export {};
//# sourceMappingURL=dialog-delete-input.d.ts.map