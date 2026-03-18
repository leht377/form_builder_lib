import type { ResponseError } from '../../../types/response.types';
import { AxiosError } from 'axios';
declare const useCreateApiSection: () => {
    mutate: (variables: string, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any>>) => void;
    mutateAsync: (variables: string, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any>>) => Promise<void>;
    isPending: boolean;
    error: AxiosError<ResponseError, any>;
};
export default useCreateApiSection;
//# sourceMappingURL=use-create-api-section.d.ts.map