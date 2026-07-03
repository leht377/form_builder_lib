import * as React from 'react';
import type { NormalizedFile } from '../../form-builder/types/form-builder.types';
interface FileDropzoneProps {
    value: NormalizedFile[];
    onChange: (files: NormalizedFile[]) => void;
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    disabled?: boolean;
    className?: string;
    readOnly?: boolean;
}
export declare function FileInput({ value, onChange, accept, multiple, maxFiles, disabled, className, readOnly }: FileDropzoneProps): React.JSX.Element;
export {};
//# sourceMappingURL=file-input.d.ts.map