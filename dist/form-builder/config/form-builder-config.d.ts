import { type PropsWithChildren } from 'react';
export interface FormBuilderConfig {
    apiBaseUrl: string;
    userId: string;
}
export declare const configureFormBuilder: (config: Partial<FormBuilderConfig>) => void;
export declare const getFormBuilderConfig: () => FormBuilderConfig;
interface FormBuilderConfigProviderProps extends PropsWithChildren {
    config: Partial<FormBuilderConfig>;
}
export declare const FormBuilderConfigProvider: ({ config, children }: FormBuilderConfigProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare const useFormBuilderConfig: () => FormBuilderConfig;
export {};
//# sourceMappingURL=form-builder-config.d.ts.map