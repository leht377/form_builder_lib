import { QueryClient, type QueryClientConfig } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';
import { type FormBuilderConfig } from '../config/form-builder-config';
interface FormBuilderProviderProps extends PropsWithChildren {
    config: Partial<FormBuilderConfig>;
    queryClient?: QueryClient;
    queryClientConfig?: QueryClientConfig;
}
export declare const FormBuilderProvider: ({ config, queryClient, queryClientConfig, children }: FormBuilderProviderProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=form-builder-provider.d.ts.map