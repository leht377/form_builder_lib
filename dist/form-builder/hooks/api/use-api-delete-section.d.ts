import { AxiosError } from 'axios';
import type { DeleteSectionRequest } from '../../types/form-builder.types';
import type { ResponseError } from '../../../types/response.types';
declare const useApiDeleteSection: () => {
    mutate: (variables: DeleteSectionRequest, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any, any>>) => void;
    mutateAsync: (variables: DeleteSectionRequest, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any, any>>) => Promise<void>;
    isPending: boolean;
    error: AxiosError<ResponseError, any, any>;
};
export default useApiDeleteSection;
//# sourceMappingURL=use-api-delete-section.d.ts.map