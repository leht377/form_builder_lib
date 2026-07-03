import RenderForm from './render-form';
import type { ComponentProps } from 'react';
type DynamicFormRenderProps = Omit<ComponentProps<typeof RenderForm>, 'formSchema' | 'onSubmit' | 'isSending' | 'initialValues'>;
interface Props extends DynamicFormRenderProps {
    formId: string;
    formResponseId: string;
}
declare const DynamicForm: ({ formId, formResponseId, ...renderFormProps }: Props) => import("react").JSX.Element;
export default DynamicForm;
//# sourceMappingURL=dynamic-form.d.ts.map