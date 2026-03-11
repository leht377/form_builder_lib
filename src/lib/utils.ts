import { clsx, type ClassValue } from "clsx"
import type { Path, UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import type { NormalizedFile } from "../form-builder/types/form-builder.types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



type ValidationError<T> = {
  [K in keyof T]?: string
}

export const renderValidationErrors = <T extends Record<string, unknown>>(
  err: ValidationError<T>,
  setError: UseFormSetError<T>
) => {
  Object.entries(err).forEach(([field, messages]) => {
    if (Array.isArray(messages) && messages.length > 0) {
      setError(field as Path<T>, {
        type: 'server',
        message: messages[0]
      })
    }
  })
}


export const mapFileToNormalizedFile = (file: File): NormalizedFile => {
  // const objectUrl = URL.createObjectURL(file)
  return {
    url: undefined,
    name: file.name,
    type: file.type,
    size: file.size,
    file
  }
}
