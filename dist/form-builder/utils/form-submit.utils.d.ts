import type { FormResponse, NormalizedFile, UploadFile } from "../types/form-builder.types";
/**
 * Detecta archivos que fueron eliminados comparando estado anterior vs actual
 */
export declare const detectDeletedFiles: (response: Record<string, any>, formResponse: FormResponse | undefined) => string[];
/**
 * Parsea archivos del JSON guardado
 */
export declare const getParsedFiles: (jsonString: string) => any[];
/**
 * Procesa y sube archivos nuevos, separando existentes de nuevos
 */
export declare const processAndUploadFilesPerQuestion: (response: Record<string, any>, uploadFiles: (files: NormalizedFile[]) => Promise<UploadFile[]>) => Promise<{
    updatedResponse: Record<string, any>;
    uploadedFileIds: string[];
}>;
/**
 * Elimina archivos del servidor uno a uno
 */
export declare const deleteFilesFromServer: (filesToDelete: string[], deleteFile: (id: string) => Promise<void>) => Promise<boolean>;
//# sourceMappingURL=form-submit.utils.d.ts.map