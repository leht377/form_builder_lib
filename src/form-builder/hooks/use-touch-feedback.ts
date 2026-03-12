/**
 * Hook para mejorar la experiencia táctil en drag and drop
 * Proporciona feedback visual al usuario durante eventos táctiles
 */

import { useEffect, useRef } from 'react'

export const useTouchFeedback = (elementRef: React.RefObject<HTMLElement>) => {
  const feedbackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleTouchStart = () => {
      element.style.opacity = '0.8'
      element.style.transform = 'scale(1.02)'
    }

    const handleTouchEnd = () => {
      element.style.opacity = '1'
      element.style.transform = 'scale(1)'
    }

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [elementRef])

  return feedbackRef
}
