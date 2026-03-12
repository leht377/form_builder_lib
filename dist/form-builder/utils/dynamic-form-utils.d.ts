import { type ZodTypeAny, z } from 'zod/v3';
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import type { FormDynamicSchema, InputFieldDefinition, SpecialFormConfig } from '../types/dynamic-form.types';
import type { AnswersQuestion, Form, FormResponse } from '../types/form-builder.types';
export declare function getFieldError(error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined): FieldError | undefined;
export declare const buildInitialValues: (inputDefinitions: InputFieldDefinition[], initialVal?: Record<string, any>) => Record<string, any>;
export declare const buildZodSchema: (inputDefinitions: InputFieldDefinition[], SpecialFormConfig?: SpecialFormConfig) => z.ZodEffects<z.ZodObject<Record<string, ZodTypeAny>, "strip", ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}>, {
    [x: string]: any;
}, {
    [x: string]: any;
}>;
export declare const mapDynamicFormAnswerToFormAnswer: (data: Record<string, string>) => AnswersQuestion[];
type modeSchema = 'strict' | 'optional';
export declare const formBuilderSchema: (form: Form, isAllOptional?: modeSchema) => FormDynamicSchema;
export declare const extractInitialValues: (formResponse?: FormResponse) => Record<string, any> | undefined;
export declare function mapperAnwserValueSaveProgress(value: any): any;
export {};
//# sourceMappingURL=dynamic-form-utils.d.ts.map