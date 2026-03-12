import { AxiosError } from 'axios';
import type { NormalizedFile, UploadFile } from '../../types/form-builder.types';
import type { ResponseError } from '../../../types/response.types';
declare const useApiUploadFile: () => import("@tanstack/react-query").UseMutationResult<UploadFile[], AxiosError<ResponseError, any>, NormalizedFile[], unknown>;
export default useApiUploadFile;
//# sourceMappingURL=use-api-upload-file.d.ts.map