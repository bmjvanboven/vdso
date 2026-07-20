'use client'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import AdminSidebar from '../AdminSidebar'
import adminStyles from '../admin.module.css'
import tv from '../templateViewer.module.css'
import styles from './visitekaartje.module.css'

const CUTMARK_CORNERS: [number, number, number, number][] = [
  [0, 3, 2, 0.3], [3, 0, 0.3, 2], [89, 3, 2, 0.3], [88, 0, 0.3, 2],
  [0, 58, 2, 0.3], [3, 59, 0.3, 2], [89, 58, 2, 0.3], [88, 59, 0.3, 2],
]

export default function VisitekaartjeClient() {
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const printRootRef = useRef<HTMLDivElement>(null)

  function printCard(bleed: boolean) {
    const root = printRootRef.current
    const front = frontRef.current
    const back = backRef.current
    if (!root || !front || !back) return

    root.innerHTML = ''
    ;[front, back].forEach(face => {
      const wrap = document.createElement('div')
      wrap.className = styles.printCard
      const slot = document.createElement('div')
      slot.className = styles.cardSlot
      slot.appendChild(face.cloneNode(true))
      wrap.appendChild(slot)
      if (bleed) {
        CUTMARK_CORNERS.forEach(([l, t, w, h]) => {
          const m = document.createElement('div')
          m.className = styles.cutmark
          m.style.left = `${l}mm`; m.style.top = `${t}mm`; m.style.width = `${w}mm`; m.style.height = `${h}mm`
          wrap.appendChild(m)
        })
      }
      root.appendChild(wrap)
    })

    document.body.setAttribute('data-bleed', bleed ? '1' : '0')
    let styleTag = document.getElementById('dynamic-page-size') as HTMLStyleElement | null
    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = 'dynamic-page-size'
      document.head.appendChild(styleTag)
    }
    styleTag.textContent = `@page{size:${bleed ? '91mm 61mm' : '85mm 55mm'};margin:0}`
    requestAnimationFrame(() => window.print())
  }

  return (
    <div className={adminStyles.page}>
      <AdminSidebar />
      <main className={adminStyles.main} style={{ padding: 0 }}>
    <div className={`${tv.wrap} ${styles.cardsWrap}`}>
      <div className={tv.toolbar}>
        <Link href="/admin" className={tv.backBtn}><ArrowLeft size={14} /> Terug</Link>
        <div className={tv.toolbarActions}>
          <button className={tv.printBtn} onClick={() => printCard(false)}>PDF zonder snijmarge</button>
          <button className={tv.wordBtn} onClick={() => printCard(true)}>PDF met snijmarges (3mm)</button>
        </div>
      </div>

      <div className={styles.cardLabel}>Voorkant</div>
      <div ref={frontRef} className={`${styles.cardFace} ${styles.cardFront}`}>
        <div style={{ position: 'absolute', width: '50mm', height: '50mm', borderRadius: '50%', top: '18mm', left: '52mm', background: 'var(--grad-blue-glow)', opacity: 0.7, filter: 'blur(6mm)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--grad-vignette)' }} />
        <Image
          src="/huisstijl/logo-groot.png" alt="" width={270} height={50} unoptimized
          style={{ position: 'absolute', height: '11mm', width: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.96 }}
        />
      </div>

      <div className={`${styles.cardLabel} ${styles.cardLabelBack}`}>Achterkant</div>
      <div ref={backRef} className={`${styles.cardFace} ${styles.cardBack}`}>
        <div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(0 0, 42% 0, 18% 100%, 0% 100%)', background: 'linear-gradient(160deg, var(--vdso-blue-bright), var(--vdso-blue) 55%, var(--vdso-blue-deep))' }} />
        <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center center' }}>
          <Image src="/huisstijl/logo-vector.svg" alt="VDSO" width={200} height={37} unoptimized style={{ height: '9mm', width: 'auto', filter: 'invert(1)' }} />
        </div>
        <div style={{ position: 'absolute', left: '40mm', right: '6mm', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3.2mm' }}>
          <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-display)', fontSize: '7px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vdso-chrome)', marginBottom: '2mm' }}>Premium Automotive</div>
          <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--vdso-platinum)', lineHeight: 1.05, marginBottom: '2mm' }}>Stijn van der Schoot</div>
          <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.02em', color: 'var(--vdso-platinum)' }}>vdso.nl</div>
          <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.02em', color: 'var(--vdso-platinum)' }}>info@vdso.nl</div>
          <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.02em', color: 'var(--vdso-platinum)' }}>+31 6 22580038</div>
          <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.02em', color: 'var(--vdso-chrome)' }}>Wiegershof 9, 5751 XJ</div>
        </div>
      </div>

      <div ref={printRootRef} className={styles.printSheet} />
    </div>
      </main>
    </div>
  )
}
