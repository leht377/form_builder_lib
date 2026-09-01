import type { ResponseError } from '../../../types/response.types';
import { AxiosError } from 'axios';
import type { ReorderSectionRequest } from '../../types/form-builder.types';
declare const useReorderApiSection: () => {
    mutate: (variables: ReorderSectionRequest, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any, any>>) => void;
    mutateAsync: (variables: ReorderSectionRequest, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any, any>>) => Promise<void>;
    isPending: boolean;
    error: AxiosError<ResponseError, any, any>;
};
export default useReorderApiSection;
//# sourceMappingURL=use-reorder-api-section.d.ts.map