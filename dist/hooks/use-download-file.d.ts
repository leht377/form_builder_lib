interface UseDownloadFileOptions {
    filename?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}
export declare const useDownloadFile: (options?: UseDownloadFileOptions) => {
    downloadFile: import("@tanstack/react-query").UseMutateFunction<void, Error, {
        url: string;
        customFilename?: string;
    }, unknown>;
    isLoading: boolean;
};
export {};
//# sourceMappingURL=use-download-file.d.ts.map