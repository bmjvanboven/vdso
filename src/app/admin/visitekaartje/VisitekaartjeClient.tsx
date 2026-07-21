'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import AdminSidebar from '../AdminSidebar'
import adminStyles from '../admin.module.css'
import tv from '../templateViewer.module.css'
import styles from './visitekaartje.module.css'
import { elementsToPdf } from '@/lib/pdfExport'

const CUTMARK_CORNERS: [number, number, number, number][] = [
  [0, 3, 2, 0.3], [3, 0, 0.3, 2], [89, 3, 2, 0.3], [88, 0, 0.3, 2],
  [0, 58, 2, 0.3], [3, 59, 0.3, 2], [89, 58, 2, 0.3], [88, 59, 0.3, 2],
]

const eyebrowStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)', fontSize: '5.6px', fontWeight: 600,
  letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--vdso-blue)',
}
const specLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)', fontSize: '5px', fontWeight: 500,
  letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--vdso-chrome)', marginBottom: '0.8mm',
}
const specValueStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'var(--vdso-platinum)',
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={specLabelStyle}>{label}</div>
      <div contentEditable suppressContentEditableWarning className={tv.editable} style={specValueStyle}>{value}</div>
    </div>
  )
}

// Logo-merk, rechtop-gedraaid, als losstaande SVG (i.p.v. een <img> met een
// CSS rotate-transform): html2canvas (gebruikt voor de PDF-export) rendert
// een geroteerde afbeelding onbetrouwbaar/afgeknipt, maar een SVG met de
// rotatie al in de eigen coördinaten "gebakken" gaat wel goed.
function LogoMarkWhite({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 90.02 489.85" style={style}>
      <g transform="rotate(-90) translate(-489.85,0)">
        <path d="m191.5,1.46h-38.64l-15.11,21.17h53.75c15.65,0,25.37,8.24,25.37,21.51,0,14.99-9.01,23.24-25.37,23.24h-30.96v-31.83h-23.73v53h54.69c27.99,0,49.1-19.09,49.1-44.41S220.4,1.46,191.5,1.46Z" fill="#ffffff" />
        <path d="m328.62,36.22h-45.38c-5.86,0-8.83-2.31-8.83-6.86s2.97-6.73,8.83-6.73h57.66l15.11-21.17h-70.78c-22.92,0-34.06,8.69-34.06,26.57,0,16.37,11.28,25.77,30.95,25.77h45c5.94,0,8.83,2.24,8.83,6.86s-2.81,6.73-8.58,6.73h-63.13l-15.11,21.17h77.49c22.52,0,32.56-8.48,32.56-27.5,0-16.25-10.57-24.83-30.58-24.83Z" fill="#ffffff" />
        <path d="m429.94,0c-40.71,0-59.67,14.28-59.67,44.94s18.96,45.08,59.67,45.08,59.91-14.32,59.91-45.08S470.82,0,429.94,0Zm0,68.85c-28.31,0-36.06-5.14-36.06-23.9s7.75-23.77,36.06-23.77,36.18,5.11,36.18,23.77-7.78,23.9-36.18,23.9Z" fill="#ffffff" />
        <polygon points="106.88 1.46 67.17 62.91 28.21 1.46 0 1.46 55.24 88.49 77.51 88.49 134.57 1.46 106.88 1.46" fill="#ffffff" />
      </g>
    </svg>
  )
}

// Bouwt een tijdelijke, onzichtbare 91x61mm variant van de kaart (3mm marge +
// snijmarkeringen) om te fotograferen voor de PDF-met-snijmarges-export.
function buildBleedWrapper(face: HTMLElement): HTMLDivElement {
  const wrap = document.createElement('div')
  wrap.className = styles.exportCardBleed
  wrap.style.position = 'fixed'
  wrap.style.left = '-9999px'
  wrap.style.top = '0'
  const slot = document.createElement('div')
  slot.className = styles.exportSlotBleed
  slot.appendChild(face.cloneNode(true))
  wrap.appendChild(slot)
  CUTMARK_CORNERS.forEach(([l, t, w, h]) => {
    const m = document.createElement('div')
    m.className = styles.exportCutmark
    m.style.left = `${l}mm`; m.style.top = `${t}mm`; m.style.width = `${w}mm`; m.style.height = `${h}mm`
    wrap.appendChild(m)
  })
  document.body.appendChild(wrap)
  return wrap
}

export default function VisitekaartjeClient() {
  const [variant, setVariant] = useState<'glow' | 'website'>('glow')
  const [exporting, setExporting] = useState(false)
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)

  async function exportPdf(bleed: boolean) {
    if (!frontRef.current || !backRef.current || exporting) return
    setExporting(true)
    try {
      if (!bleed) {
        await elementsToPdf([
          { element: frontRef.current, widthMm: 85, heightMm: 55 },
          { element: backRef.current, widthMm: 85, heightMm: 55 },
        ], 'VDSO-visitekaartje.pdf')
      } else {
        const frontWrap = buildBleedWrapper(frontRef.current)
        const backWrap = buildBleedWrapper(backRef.current)
        try {
          await elementsToPdf([
            { element: frontWrap, widthMm: 91, heightMm: 61 },
            { element: backWrap, widthMm: 91, heightMm: 61 },
          ], 'VDSO-visitekaartje-snijmarges.pdf')
        } finally {
          frontWrap.remove()
          backWrap.remove()
        }
      }
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className={adminStyles.page}>
      <AdminSidebar />
      <main className={adminStyles.main} style={{ padding: 0 }}>
    <div className={`${tv.wrap} ${styles.cardsWrap}`}>
      <div className={tv.toolbar}>
        <Link href="/admin" className={tv.backBtn}><ArrowLeft size={14} /> Terug</Link>
        <div className={tv.toolbarActions}>
          <button className={tv.printBtn} onClick={() => exportPdf(false)} disabled={exporting}>{exporting ? 'Bezig…' : 'PDF zonder snijmarge'}</button>
          <button className={tv.wordBtn} onClick={() => exportPdf(true)} disabled={exporting}>{exporting ? 'Bezig…' : 'PDF met snijmarges (3mm)'}</button>
        </div>
      </div>

      <div className={styles.variantRow}>
        <button type="button" className={`${styles.variantBtn} ${variant === 'glow' ? styles.variantBtnActive : ''}`} onClick={() => setVariant('glow')}>Glow</button>
        <button type="button" className={`${styles.variantBtn} ${variant === 'website' ? styles.variantBtnActive : ''}`} onClick={() => setVariant('website')}>Website</button>
      </div>

      <div className={styles.cardLabel}>Voorkant</div>
      {variant === 'glow' ? (
        <div ref={frontRef} className={`${styles.cardFace} ${styles.cardFront}`}>
          <div style={{ position: 'absolute', width: '50mm', height: '50mm', borderRadius: '50%', top: '18mm', left: '52mm', background: 'var(--grad-blue-glow)', opacity: 0.7 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--grad-vignette)' }} />
          <Image
            src="/huisstijl/logo-groot.png" alt="" width={270} height={50} unoptimized
            style={{ position: 'absolute', height: '11mm', width: 'auto', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.96 }}
          />
        </div>
      ) : (
        <div ref={frontRef} className={styles.cardFace} style={{ background: 'var(--grad-navy-hero)' }}>
          <div style={{ position: 'absolute', inset: '1mm', border: '1px solid rgba(190,210,255,0.14)', borderRadius: '1mm' }} />
          <div style={{ position: 'absolute', top: '4mm', right: '5mm', fontFamily: 'var(--font-mono)', fontSize: '5px', letterSpacing: '0.08em', color: 'var(--vdso-iron)' }}>RDW ERKEND</div>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2.4mm' }}>
            <Image src="/huisstijl/logo-groot.png" alt="" width={230} height={43} unoptimized style={{ height: '9mm', width: 'auto', opacity: 0.98 }} />
            <div style={eyebrowStyle}>Premium Occasions &middot; Deurne</div>
            <div style={{ width: '9mm', height: '0.4mm', background: 'var(--vdso-blue)' }} />
          </div>
        </div>
      )}

      <div className={`${styles.cardLabel} ${styles.cardLabelBack}`}>Achterkant</div>
      {variant === 'glow' ? (
        <div ref={backRef} className={`${styles.cardFace} ${styles.cardBack}`}>
          {/* SVG i.p.v. CSS clip-path: html2canvas (gebruikt voor de PDF-export)
              respecteert clip-path niet betrouwbaar, maar rendert SVG-polygonen wel goed. */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="glowStripeGrad" x1="32.9%" y1="3%" x2="67.1%" y2="97%">
                <stop offset="0%" stopColor="#5B8DFF" />
                <stop offset="55%" stopColor="#2E6BFF" />
                <stop offset="100%" stopColor="#1E4FCC" />
              </linearGradient>
            </defs>
            <polygon points="0,0 42,0 18,100 0,100" fill="url(#glowStripeGrad)" />
          </svg>
          <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>
            <LogoMarkWhite style={{ width: '9mm', height: 'auto' }} />
          </div>
          <div style={{ position: 'absolute', left: '40mm', right: '6mm', top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3.2mm' }}>
            <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-display)', fontSize: '7px', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--vdso-chrome)', marginBottom: '2mm' }}>Premium Automotive</div>
            <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.02em', textTransform: 'uppercase', color: 'var(--vdso-platinum)', lineHeight: 1.05, marginBottom: '2mm' }}>Stijnn van der Schoot</div>
            <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.02em', color: 'var(--vdso-platinum)' }}>vdso.nl</div>
            <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.02em', color: 'var(--vdso-platinum)' }}>info@vdso.nl</div>
            <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.02em', color: 'var(--vdso-platinum)' }}>+31 6 22580038</div>
            <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', letterSpacing: '0.02em', color: 'var(--vdso-chrome)' }}>Wiegershof 9, 5751 XJ</div>
          </div>
        </div>
      ) : (
        <div ref={backRef} className={styles.cardFace} style={{ background: 'var(--grad-navy-hero)' }}>
          <div style={{ position: 'absolute', inset: '1mm', border: '1px solid rgba(190,210,255,0.14)', borderRadius: '1mm' }} />
          <div style={{ position: 'absolute', left: '6mm', right: '6mm', top: '5mm', bottom: '5mm', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={eyebrowStyle}>Premium Automotive</div>
              <div contentEditable suppressContentEditableWarning className={tv.editable} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.01em', textTransform: 'uppercase', color: 'var(--vdso-platinum)', lineHeight: 1.05, marginTop: '1.2mm' }}>Stijnn van der Schoot</div>
            </div>
            <div style={{ borderTop: '1px solid rgba(190,210,255,0.14)', paddingTop: '2.4mm', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.4mm 4mm' }}>
              <SpecItem label="Web" value="vdso.nl" />
              <SpecItem label="E-mail" value="info@vdso.nl" />
              <SpecItem label="Telefoon" value="+31 6 22580038" />
              <SpecItem label="Adres" value="Wiegershof 9, Deurne" />
            </div>
          </div>
        </div>
      )}
    </div>
      </main>
    </div>
  )
}
