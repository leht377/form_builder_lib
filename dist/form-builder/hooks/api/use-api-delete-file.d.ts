import { AxiosError } from 'axios';
import type { ResponseError } from '../../../types/response.types';
declare const useApiDeleteFile: () => {
    mutate: (variables: string, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any, any>>) => void;
    mutateAsync: (variables: string, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any, any>>) => Promise<void>;
    isPending: boolean;
    error: AxiosError<ResponseError, any, any>;
};
export default useApiDeleteFile;
//# sourceMappingURL=use-api-delete-file.d.ts.map