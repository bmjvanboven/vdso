'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    if (raf.current) cancelAnimationFrame(raf.current)

    // Pagina is geladen — balk snel naar 100% en dan wegfaden
    setProgress(100)
    timer.current = setTimeout(() => setVisible(false), 400)

    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [pathname, searchParams])

  // Start balk bij mount (eerste load)
  useEffect(() => {
    setVisible(true)
    setProgress(30)
    const t1 = setTimeout(() => setProgress(60), 100)
    const t2 = setTimeout(() => setProgress(80), 300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: '2px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #2E6BFF, #5B8DFF)',
          boxShadow: '0 0 8px rgba(46,107,255,0.7)',
          transition: progress === 100
            ? 'width 200ms ease-out, opacity 200ms ease-out'
            : 'width 400ms cubic-bezier(0.2,0.8,0.2,1)',
          opacity: progress === 100 ? 0 : 1,
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  )
}
