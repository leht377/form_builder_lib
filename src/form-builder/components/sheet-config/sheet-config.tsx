import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '../../../components/ui/sheet'

interface Props {
  visible: boolean
  close: () => void
  title: string // <-- obligatorio
  description?: string // <-- opcional
  children?: React.ReactNode
}

const SheetConfig = ({ visible, close, title, description, children }: Props) => {
  return (
    <Sheet open={visible} onOpenChange={(open) => !open && close()}>
      <SheetContent className='overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>

          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        {/* Contenido dinámico */}
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default SheetConfig
