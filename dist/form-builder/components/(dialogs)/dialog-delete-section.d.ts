interface Props {
    visible: boolean;
    close: () => void;
    data: {
        id: string;
        title: string;
    };
    deleteSection: (id: string) => Promise<void> | void;
}
export declare function DialogDeleteSection({ visible, close, data, deleteSection }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=dialog-delete-section.d.ts.map