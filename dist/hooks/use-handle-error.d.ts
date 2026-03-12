import { type FieldValues, type UseFormSetError } from 'react-hook-form';
import { AxiosError } from 'axios';
interface UseFormErrorHandlerConfig {
    notFound?: {
        title?: string;
        description?: string;
    };
    forbidden?: {
        title?: string;
        description?: string;
    };
}
interface UseFormErrorHandlerProps<T extends FieldValues> {
    setError?: UseFormSetError<T>;
    config?: UseFormErrorHandlerConfig;
}
declare const useErrorHandler: <T extends FieldValues>(props?: UseFormErrorHandlerProps<T>) => {
    errorhandler: (err: AxiosError) => void;
};
export default useErrorHandler;
//# sourceMappingURL=use-handle-error.d.ts.map