import { useSimpleMutation } from '../lib/async-hooks'
import { toast } from "../components/react-sonner";

interface UseDownloadFileOptions {
    filename?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export const useDownloadFile = (options: UseDownloadFileOptions = {}) => {
    const { filename = "download", onSuccess, onError } = options;

    const mutation = useSimpleMutation<void, { url: string; customFilename?: string }, Error>({
        mutationFn: async ({
            url,
            customFilename,
        }: {
            url: string;
            customFilename?: string;
        }) => {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error en la descarga: ${response.statusText}`);
            }

            const blob = await response.blob();
            const objectUrl = globalThis.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = customFilename || filename;

            document.body.appendChild(link);
            link.click();
            link.remove();

            globalThis.URL.revokeObjectURL(objectUrl);
            }
    });

    return {
        downloadFile: (payload: { url: string; customFilename?: string }) => {
            mutation.mutate(payload, {
                onSuccess: () => {
                    toast.success("Archivo descargado exitosamente");
                    onSuccess?.();
                },
                onError: (error) => {
                    const message =
                        error instanceof Error ? error.message : "Error desconocido";
                    console.error("Error descargando archivo:", message);
                    toast.error(`Error al descargar: ${message}`);
                    onError?.(error instanceof Error ? error : new Error(message));
                }
            });
        },
        isLoading: mutation.isPending,
    };
};
