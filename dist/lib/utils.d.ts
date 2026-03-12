import { type ClassValue } from "clsx";
import type { UseFormSetError } from "react-hook-form";
import type { NormalizedFile } from "../form-builder/types/form-builder.types";
export declare function cn(...inputs: ClassValue[]): string;
type ValidationError<T> = {
    [K in keyof T]?: string;
};
export declare const renderValidationErrors: <T extends Record<string, unknown>>(err: ValidationError<T>, setError: UseFormSetError<T>) => void;
export declare function tryParseJSON(value: any): any;
export declare const mapFileToNormalizedFile: (file: File) => NormalizedFile;
export {};
//# sourceMappingURL=utils.d.ts.map