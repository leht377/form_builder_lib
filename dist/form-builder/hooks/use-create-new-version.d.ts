import type { Form } from '../types/form-builder.types';
import type { DuplicateFormPayload } from '../../types/response.types';
declare const useCreateNewVersion: () => {
    createNewVersion: (data: DuplicateFormPayload, onCreateNewVersion?: (data: Form) => void) => void;
    isPending: boolean;
};
export default useCreateNewVersion;
//# sourceMappingURL=use-create-new-version.d.ts.map