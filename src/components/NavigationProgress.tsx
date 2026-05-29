'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function NavigationProgress() {
  const pathname = usePathname()
  const [opacity, setOpacity] = useState(1)
  const navigating = useRef(false)

  useEffect(() => {
    if (navigating.current) {
      // Pagina geladen — fade in
      setOpacity(1)
      navigating.current = false
    }
  }, [pathname])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
      if (anchor.target === '_blank') return
      try {
        const url = new URL(href, window.location.origin)
        if (url.origin !== window.location.origin) return
        if (url.pathname === pathname) return
      } catch {
        return
      }
      navigating.current = true
      setOpacity(0.3)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  // Body-fade uitgeschakeld — PageLoader doet de navigatietransitie
  useEffect(() => {
    document.body.style.opacity = '1'
    document.body.style.transition = ''
  }, [])

  return null
}
