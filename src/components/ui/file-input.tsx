'use client'

import * as React from 'react'
import { UploadCloud, X, Eye, Download } from 'lucide-react'
import type { NormalizedFile } from '../../form-builder/types/form-builder.types'
import { useDownloadFile } from '../../hooks/use-download-file'
import { cn, mapFileToNormalizedFile } from '../../lib/utils'


interface FileDropzoneProps {
  value: NormalizedFile[]
  onChange: (files: NormalizedFile[]) => void
  accept?: string
  multiple?: boolean
  maxFiles?: number
  disabled?: boolean
  className?: string
  readOnly?: boolean
}

export function FileInput({
  value = [],
  onChange,
  accept,
  multiple = false,
  maxFiles = 1,
  disabled,
  className,
  readOnly
}: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const { downloadFile, isLoading: isDownloading } = useDownloadFile()
  const addFiles = (files: FileList | null) => {
    if (!files || disabled || readOnly) return

    const normalized = Array.from(files).map(mapFileToNormalizedFile)

    const merged = multiple ? [...value, ...normalized].slice(0, maxFiles) : normalized.slice(0, 1)

    onChange(merged)
  }

  const removeFile = (index: number) => {
    const updated = value.filter((_, i) => i !== index)
    onChange(updated)
  }

  const handleView = (file: NormalizedFile) => {
    if (file.url) {
      // Si tiene URL remota, abrir directamente
      window.open(file.url, '_blank', 'noopener,noreferrer')
    } else if (file.file) {
      // Si es un archivo local, crear URL temporal
      const objectUrl = URL.createObjectURL(file.file)
      window.open(objectUrl, '_blank', 'noopener,noreferrer')
      // Limpiar el URL después de un tiempo
      setTimeout(() => URL.revokeObjectURL(objectUrl), 100)
    }
  }

  const handleDownload = (file: NormalizedFile) => {
    if (file.url) {
      // Si tiene URL remota, descargar desde ahí
      downloadFile({
        url: file.url,
        customFilename: file.name || 'archivo'
      })
    }
  }
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-6 text-center transition-colors',
        isDragging && 'border-primary bg-primary/5',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled && !readOnly) setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragging(false)
        addFiles(e.dataTransfer.files)
      }}
    >
      <input
        ref={inputRef}
        type='file'
        accept={accept}
        multiple={multiple}
        disabled={disabled || readOnly || value?.length >= maxFiles}
        className='hidden'
        onChange={(e) => {
          addFiles(e.target.files)
          e.target.value = ''
        }}
      />

      <UploadCloud className='h-8 w-8 text-muted-foreground' />

      <p className='text-sm'>
        Arrastra archivos aquí o{' '}
        <button
          type='button'
          className='font-medium text-primary hover:underline'
          onClick={() => inputRef.current?.click()}
          disabled={disabled || readOnly}
        >
          selecciónalos
        </button>
      </p>

      <p className='text-xs text-muted-foreground'>
        {accept ?? 'Cualquier tipo'} · {multiple ? `Máx. ${maxFiles}` : '1 archivo'}
      </p>

      {value?.length > 0 && (
        <div className='mt-4 w-full'>
          <p className='text-xs font-medium text-muted-foreground/70 mb-2'>
            Archivos seleccionados:
          </p>
          <div className='flex flex-wrap gap-2'>
            {value?.map((file, index) => {
              const extension = file.name?.split('.').pop()?.toUpperCase() || ''
              return (
                <div
                  key={file.id ?? `${file.name}-${index}`}
                  className='inline-flex items-center gap-1 text-xs group'
                >
                  <button
                    type='button'
                    onClick={() => handleView(file)}
                    disabled={!file.url && !file.file}
                    className='inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 hover:underline disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    <Eye className='size-3' />
                    <span className='truncate max-w-35'>{file.name}</span>
                    {extension && (
                      <span className='text-[10px] px-1 py-0.5 bg-muted rounded text-muted-foreground font-medium'>
                        {extension}
                      </span>
                    )}
                  </button>
                  <button
                    type='button'
                    onClick={() => handleDownload(file)}
                    disabled={
                      (!file.url  && !file.file) || (Boolean(file.url) && isDownloading)
                    }
                    className='p-1 hover:bg-accent rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    title='Descargar archivo'
                  >
                    <Download className='size-3 text-muted-foreground' />
                  </button>
                  {!readOnly && (
                    <button
                      type='button'
                      onClick={() => removeFile(index)}
                      className='p-1 hover:bg-accent rounded transition-colors'
                      title='Eliminar archivo'
                    >
                      <X className='size-3 text-muted-foreground' />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
