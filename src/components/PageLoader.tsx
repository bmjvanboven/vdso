'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import styles from './PageLoader.module.css'

export default function PageLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const [logoVisible, setLogoVisible] = useState(false)
  const navigating = useRef(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  function clearTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  function show(fast = false) {
    clearTimers()
    setVisible(true)
    const t = setTimeout(() => setLogoVisible(true), fast ? 20 : 80)
    timers.current.push(t)
  }

  function hide() {
    clearTimers()
    setLogoVisible(false)
    const t1 = setTimeout(() => setVisible(false), 260)
    timers.current.push(t1)
  }

  // Initiële load
  useEffect(() => {
    show()
    const t = setTimeout(hide, 350)
    timers.current.push(t)
    return clearTimers
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Pathname verandert = nieuwe pagina geladen
  useEffect(() => {
    if (!navigating.current) return
    navigating.current = false
    hide()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Klik op interne link = navigatie gestart
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
      } catch { return }
      navigating.current = true
      show(true)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  return (
    <div
      className={`${styles.overlay} ${visible ? '' : styles.hidden}`}
      style={{ pointerEvents: visible ? 'all' : 'none' }}
    >
      <Image
        src="/uploads/logo-vdso-webversie-klein.png"
        alt="VDSO"
        width={400}
        height={74}
        priority
        className={`${styles.logo} ${logoVisible ? styles.visible : ''}`}
      />
    </div>
  )
}
