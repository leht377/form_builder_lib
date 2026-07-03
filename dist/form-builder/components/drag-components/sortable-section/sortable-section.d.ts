import type { Section } from '../../../../form-builder/types/form-builder.types';
interface SortableSectionProps {
    section: Section;
    onLockItem: (sectionId: string, itemId: string, lock: boolean) => void;
    isOver: boolean;
}
export default function SortableSection({ section, onLockItem, isOver }: SortableSectionProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=sortable-section.d.ts.map