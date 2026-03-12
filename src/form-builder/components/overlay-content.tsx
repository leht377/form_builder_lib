import type { IconName } from "@/components/base-icon"
import BaseIcon from "@/components/base-icon"

export default function OverlayContent({
  type,
  label,
  icon
}: {
  type: string
  label: string
  icon?: IconName
}) {
  const iconName = icon ? icon : null
  const isSectionDrag = type === 'section'
  const isSectionCreator = type === 'section-creator'

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border shadow-lg scale-105 ${
        isSectionDrag ? 'bg-orange-100 border-orange-400' : 'bg-white'
      }`}
    >
      {/* Icono */}
      {iconName && (
        <BaseIcon
          name={iconName}
          className={`size-4 ${isSectionDrag ? 'text-orange-600' : 'text-blue-500'}`}
        />
      )}

      {/* Label */}
      <span className={`font-medium ${isSectionDrag ? 'text-orange-700' : 'text-gray-700'}`}>
        {isSectionCreator ? 'Nueva sección' : label}
      </span>
    </div>
  )
}