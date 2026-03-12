import type { FormItem } from '../types/form-builder.types'
import DraggableInput from './drag-components/draggable-Input'
import DraggableSectionCreator from './drag-components/draggable-section-creator'

const NavInputsCreator = ({ paletteItems }: { paletteItems: FormItem[] }) => {
  return (
    <div className='h-fit'>
      <div className='h-full bg-white rounded-2xl p-6 border border-gray-200 shadow-sm transition-all'>
        {/* Paleta de Inputs */}
        <section className='mb-6'>
          <h2 className='text-lg font-semibold text-gray-800 mb-2'>Paleta de Inputs</h2>
          <p className='text-sm text-gray-500 mb-5'>Arrastra estos inputs a las secciones.</p>

          <div className='space-y-2'>
            {paletteItems.map((item) => (
              <DraggableInput
                key={item.id}
                id={item.id}
                type={item.type}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </div>
        </section>

        {/* Crear Sección */}
        <section>
          <h2 className='text-lg font-semibold text-gray-800 mb-2'>Crear Sección</h2>
          <p className='text-sm text-gray-500 mb-5'>Arrastra para crear una nueva sección.</p>

          <DraggableSectionCreator
            id='section-creator'
            label='Nueva Sección'
            icon='LayoutPanelTop'
          />
        </section>
      </div>
    </div>
  )
}

export default NavInputsCreator
