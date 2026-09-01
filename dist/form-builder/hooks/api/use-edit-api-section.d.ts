import { AxiosError } from 'axios';
import type { UpdateSectionRequets } from '../../types/form-builder.types';
import type { ResponseError } from '../../../types/response.types';
declare const useEditApiSection: () => {
    mutate: (variables: UpdateSectionRequets, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any, any>>) => void;
    mutateAsync: (variables: UpdateSectionRequets, callbacks?: import("../../../lib/async-hooks").MutationCallbacks<void, AxiosError<ResponseError, any, any>>) => Promise<void>;
    isPending: boolean;
    error: AxiosError<ResponseError, any, any>;
};
export default useEditApiSection;
//# sourceMappingURL=use-edit-api-section.d.ts.map