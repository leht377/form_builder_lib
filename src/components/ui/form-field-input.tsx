import React from 'react'
import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues
} from 'react-hook-form'
import { Input } from './input'
import { Textarea } from './textarea'
import { Switch } from './switch'
import { Field, FieldDescription, FieldError, FieldLabel } from './field'
import { Checkbox } from './checkbox'
import { FileInput } from './file-input'
import MultiSelect, { type MultiValue, type StylesConfig } from 'react-select'

export type InputType =
  | 'text'
  | 'text-area'
  | 'switch'
  | 'checkbox'
  | 'select'
  | 'datetime-local'
  | 'date'
  | 'number'
  | 'file'

export type OptionType = {
  value: string | number
  label: string
}

export const ReactSelectCustomStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    backgroundColor: 'white',
    borderColor: state.isFocused ? '#2f53eb' : '#D1D5DB', // indigo-600 o gray-300
    boxShadow: state.isFocused
      ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '&:hover': {
      borderColor: '#D1D5DB'
    },
    borderRadius: '0.375rem', // rounded-md
    minHeight: '1rem', //
    padding: '0 0.25rem',
    cursor: 'pointer',
    border: '2 #D1D5DB',
    fontSize: '0.875rem'
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0 0.5rem'
  }),
  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? '#9CA3AF' : '#9CA3AF'
  }),
  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? '#9CA3AF' : 'black'
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#E5E7EB', // bg-gray-200
    borderRadius: '0.375rem', // rounded-md
    padding: '0 0.25rem'
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#111827'
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#6B7280',
    '&:hover': {
      backgroundColor: '#D1D5DB',
      color: '#111827'
    }
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#9CA3AF'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '0.375rem',
    // boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderColor: 'black',
    border: '10px',
    padding: 5,
    zIndex: 50
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#D1D5DB' : state.isFocused ? 'white' : 'white',
    '&:hover': {
      backgroundColor: 'rgba(209, 213, 219, 0.5)'
    },
    gap: 0,
    borderRadius: 5,
    color: state.isSelected ? 'black' : '#111827',

    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.875rem'
  })
}

interface Props<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  label?: string
  isRequired?: boolean
  placeholder?: string
  description?: string
  type: InputType
  className?: string
  isMultiSelect?: boolean
  isSelectClearable?: boolean
  options?: OptionType[]
  step?: string | number
  disabled?: boolean
  readOnly?: boolean
  min?: number | string
  max?: number | string
  isLoading?: boolean
  multiple?: boolean
  accept?: string
  ref?: React.Ref<any>
  editorClassName?: string
  height?: number
  width?: number
  valid?: boolean
  formatThousands?: boolean
}

type FormFieldInputRenderProps<T extends FieldValues> = {
  type: InputType
  placeholder?: string
  field: ControllerRenderProps<T, FieldPath<T>>
  label?: string
  isRequired?: boolean
  disabled?: boolean
  readOnly?: boolean
  isMultiSelect?: boolean
  multiple?: boolean
  accept?: string
  isSelectClearable?: boolean
  options?: OptionType[]
  step?: string | number
  min?: number | string
  max?: number | string
  isLoading?: boolean
  ref?: React.Ref<any>
  editorClassName?: string
  height?: number
  width?: number
  invalid?: boolean
  formatThousands?: boolean
}

const FormFieldInputRender = <T extends FieldValues>({
  type,
  placeholder,
  field,
  label,
  isRequired,
  disabled,
  readOnly,
  isMultiSelect,
  isSelectClearable,
  options,
  step,
  min = 0,
  max,
  isLoading,
  multiple,
  accept,
  ref,
  invalid,
  formatThousands = false
}: FormFieldInputRenderProps<T>) => {
  switch (type) {
    case 'text':
    case 'datetime-local':
    case 'date':
      return (
        <Input
          placeholder={placeholder}
          {...field}
          ref={ref}
          min={min}
          max={max}
          disabled={disabled}
          readOnly={readOnly}
          type={type}
          step={step}
          data-invalid={invalid}
        />
      )

    case 'number': {
      const rawNumberValue =
        field.value === undefined || field.value === null ? '' : String(field.value)
      const numericOnlyValue = rawNumberValue.replace(/\D/g, '')
      const displayValue =
        formatThousands && numericOnlyValue
          ? Number(numericOnlyValue).toLocaleString('en-US')
          : numericOnlyValue

      return (
        <Input
          placeholder={placeholder}
          {...field}
          value={displayValue}
          onChange={(e) => {
            const nextNumericValue = e.target.value.replace(/\D/g, '')
            field.onChange(nextNumericValue)
          }}
          disabled={disabled}
          readOnly={readOnly}
          type='text'
          inputMode='numeric'
          pattern={formatThousands ? '[0-9,]*' : '[0-9]*'}
          step={step}
          data-invalid={invalid}
        />
      )
    }
    case 'text-area':
      return (
        <Textarea
          placeholder={placeholder}
          {...field}
          disabled={disabled}
          readOnly={readOnly}
          className='min-h-[100px]'
          data-invalid={invalid}
        />
      )
    case 'switch':
      return (
        <div className='flex gap-2 items-center'>
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            aria-readonly
            disabled={disabled || readOnly}
            data-invalid={invalid}
          />
          <FieldLabel>
            {label}
            {isRequired && <span className='text-destructive'> *</span>}
          </FieldLabel>
        </div>
      )
    case 'checkbox':
      return (
        <div className='flex gap-2 items-center'>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled || readOnly}
            data-invalid={invalid}
          />
          <FieldLabel>
            {label}
            {isRequired && <span className='text-destructive'> *</span>}
          </FieldLabel>
        </div>
      )
    case 'select':
      return (
        <MultiSelect
          isDisabled={disabled || readOnly || isLoading}
          defaultValue={field.value}
          value={
            isMultiSelect
              ? (options?.filter((option) => field.value?.includes(option.value)) ?? [])
              : (options?.find((c) => c.value === field.value) ?? null)
          }
          menuPlacement='auto'
          onChange={(item) => {
            if (isMultiSelect) {
              // Para multi-select, extraer array de valores
              const selectedValues =
                (item as MultiValue<OptionType>)?.map((option) => option.value) ?? []
              field.onChange(selectedValues)
            } else {
              // Para single select, extraer un solo valor
              field.onChange((item as OptionType)?.value)
            }
          }}
          options={options ?? []}
          isMulti={isMultiSelect}
          noOptionsMessage={() => <label>Sin resultados</label>}
          className='border-gray-400 focus:border-gray-400 '
          isSearchable
          styles={ReactSelectCustomStyles}
          isClearable={isSelectClearable}
          placeholder={placeholder}
        />
      )
    case 'file':
      return (
        <FileInput
          {...field}
          multiple={multiple}
          readOnly={readOnly}
          disabled={disabled}
          maxFiles={5}
          accept={accept}
          data-invalid={invalid}
        />
      )

    default:
      return null
  }
}

const FormFieldInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  type,
  className,
  isRequired,
  isMultiSelect,
  isSelectClearable,
  options,
  step,
  disabled,
  readOnly,
  isLoading,
  multiple,
  accept,
  max,
  min,
  ref,
  editorClassName,
  height,
  width,
  formatThousands = false
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={className} data-invalid={fieldState.invalid}>
          {label && !['switch', 'checkbox'].includes(type) && (
            <FieldLabel>
              {label}
              {isRequired && <span className='text-destructive'> *</span>}
            </FieldLabel>
          )}
          <FormFieldInputRender
            ref={ref}
            type={type}
            placeholder={placeholder}
            field={field}
            label={label}
            isRequired={isRequired}
            disabled={disabled}
            readOnly={readOnly}
            isMultiSelect={isMultiSelect}
            accept={accept}
            multiple={multiple}
            isLoading={isLoading}
            isSelectClearable={isSelectClearable}
            options={options}
            max={max}
            min={min}
            step={step}
            editorClassName={editorClassName}
            height={height}
            invalid={fieldState.invalid}
            width={width}
            formatThousands={formatThousands}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default FormFieldInput
