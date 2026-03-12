import type { Section } from "../../../../form-builder/types/form-builder.types";
interface Props {
    section: Section;
    attributes: any;
    listeners: any;
    onRemoveSection: () => void;
    onOpenSettings: () => void;
}
export default function SortableSectionHeader({ section, attributes, listeners, onRemoveSection, onOpenSettings }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=sortable-section-header.d.ts.map