import { type PropsWithChildren } from 'react';
import { type FormBuilderConfig } from '../config/form-builder-config';
interface FormBuilderProviderProps extends PropsWithChildren {
    config: Partial<FormBuilderConfig>;
    queryClient?: unknown;
    queryClientConfig?: unknown;
}
export declare const FormBuilderProvider: ({ config, children }: FormBuilderProviderProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=form-builder-provider.d.ts.map