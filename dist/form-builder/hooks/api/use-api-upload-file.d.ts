import { AxiosError } from 'axios';
import type { NormalizedFile, UploadFile } from '../../types/form-builder.types';
import type { ResponseError } from '../../../types/response.types';
declare const useApiUploadFile: () => {
    mutate: (variables: NormalizedFile[], callbacks?: import("../../../lib/async-hooks").MutationCallbacks<UploadFile[], AxiosError<ResponseError, any>>) => void;
    mutateAsync: (variables: NormalizedFile[], callbacks?: import("../../../lib/async-hooks").MutationCallbacks<UploadFile[], AxiosError<ResponseError, any>>) => Promise<UploadFile[]>;
    isPending: boolean;
    error: AxiosError<ResponseError, any>;
};
export default useApiUploadFile;
//# sourceMappingURL=use-api-upload-file.d.ts.map