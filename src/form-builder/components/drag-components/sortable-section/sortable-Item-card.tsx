import BaseIcon from '@/src/components/ui/base-icon'
import { Button } from '@/src/components/ui/button'
import RenderTemplateInput from '../../inputs/render-template-input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/src/components/ui/dropdown-menu'
import { Label } from '@/src/components/ui/label'
import { cn } from '@/src/lib/utils'

interface Props {
  item: any
  onRemove: () => void
  onLock: () => void
  onOpenSettings: () => void
}

const Options = ({ item, onLock, onOpenSettings, onRemove }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' type='button'>
          <BaseIcon name='EllipsisVertical' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start'>
        <DropdownMenuItem onClick={onOpenSettings} className='cursor-pointer'>
          <BaseIcon name='Settings' />
          Configurar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLock} className='cursor-pointer'>
          <BaseIcon name={item.isLock ? 'Lock' : 'LockOpen'} />
          {item.isLock ? 'Desbloquear' : 'Bloquear'}
        </DropdownMenuItem>
        {!item.isLock && (
          <DropdownMenuItem
            onClick={onRemove}
            className='text-destructive hover:text-destructive cursor-pointer'
          >
            <BaseIcon name='Trash2' className='text-destructive' />
            Eliminar
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function SortableItemCard({ item, onRemove, onLock, onOpenSettings }: Props) {
  return (
    <div className='flex flex-col'>
      <Label className='my-2'>
        {item?.label}
        <span
          className={cn(item?.required ? 'block text-destructive text-xs font-medium' : 'hidden')}
        >
          (obligatorio)
        </span>
      </Label>
      <div className='flex gap-2'>
        <div className='flex-1'>
          <RenderTemplateInput {...item} label={undefined} onClick={(e) => e.stopPropagation()} />
        </div>
        <Options item={item} onLock={onLock} onOpenSettings={onOpenSettings} onRemove={onRemove} />
      </div>
    </div>
  )
}
