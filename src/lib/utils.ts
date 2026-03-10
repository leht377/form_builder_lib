import { clsx, type ClassValue } from 'clsx'
import { Path, UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { formatDate as f, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { TemplateCategory } from '../types/template-category'
import { Answers, NormalizedFile } from '../types/form-builder-types'
import { mapperAnwserValueSaveProgress } from '../components/dynamic-form/utils/dynamic-form-utils'
import DOMPurify from 'dompurify'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

export const mapResponseToAnswers = (
  response: Record<string, any>,
  getId: (key: number) => number | null
): Answers[] =>
  Object.entries(response).map(([key, value]) => ({
    id: getId(Number(key)),
    form_question_id: Number(key),
    value: {
      key: mapperAnwserValueSaveProgress(value)
    }
  }))

export function getInitials(label: string) {
  return label
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
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

export const sentenceCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const lowerCase = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1).toLowerCase()
}

type DateFormat =
  | 'yyyy-MM-dd'
  | 'dd/MM/yyyy'
  | 'MM/dd/yyyy'
  | 'dd MMMM yyyy'
  | 'EEEE, dd MMM yyyy'
  | 'HH:mm'
  | 'HH:mm:ss'
  | "yyyy-MM-dd'T'HH:mm:ssXXX" // formato ISO con zona horaria
  | 'MMMM dd, yyyy HH:mm aaa'

export const formatDate = (date: string, format: DateFormat) => {
  return f(parseISO(date), format, { locale: es })
}

export function flattenCategories(nodes: TemplateCategory[]): TemplateCategory[] {
  const result: TemplateCategory[] = []

  for (const node of nodes) {
    result.push(node)

    if (node.relationships?.childs?.length) {
      result.push(...flattenCategories(node.relationships.childs))
    }
  }

  return result
}

export function tryParseJSON(value: any) {
  if (typeof value !== 'string') return value
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

/**
 * Sanitiza y limpia texto HTML
 * @param html - El texto HTML a sanitizar
 * @returns Texto limpio sin etiquetas HTML
 */
export function sanitizeHtmlToText(html: string): string {
  if (!html) return ''

  // Sanitizar HTML usando DOMPurify para seguridad
  const cleanHtml = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [] // No permitir ninguna etiqueta, solo texto
  })

  return cleanHtml
    .replace(/\n/g, ' ') // Reemplazar saltos de línea con espacio
    .replace(/\s+/g, ' ') // Reemplazar múltiples espacios con uno solo
    .trim()
}

/**
 * Trunca texto a una longitud específica y agrega puntos suspensivos
 * @param text - El texto a truncar
 * @param maxLength - Longitud máxima (default: 100)
 * @returns Texto truncado con "..." si es necesario
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (!text) return ''

  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, maxLength)}...`
}

/**
 * Sanitiza HTML y trunca el texto resultante
 * @param html - El texto HTML a procesar
 * @param maxLength - Longitud máxima del texto (default: 100)
 * @returns Texto limpio y truncado
 */
export function sanitizeAndTruncate(html: string, maxLength: number = 100): string {
  const cleanText = sanitizeHtmlToText(html)
  return truncateText(cleanText, maxLength)
}


export default function formatCompactNumber(value: number): string {
  if(isNaN(value)) return "NaN"

  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'
  }

  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  }

  if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  }

  return value.toString()
}