'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import AdminSidebar from '../AdminSidebar'
import adminStyles from '../admin.module.css'
import styles from '../templateViewer.module.css'
import { elementsToPdf } from '@/lib/pdfExport'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'var(--vdso-chrome)',
}

export default function BriefpapierClient() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState(false)
  const datumRef = useRef<HTMLSpanElement>(null)
  const referentieRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const today = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
    if (datumRef.current) datumRef.current.textContent = today
    if (referentieRef.current) referentieRef.current.textContent = `VDSO-${new Date().getFullYear()}-001`
  }, [])

  function downloadWord() {
    const today = datumRef.current?.textContent ?? ''
    const referentie = referentieRef.current?.textContent ?? ''
    const onderwerp = document.getElementById('fld-onderwerp')?.textContent ?? ''
    const bodyHtml = document.getElementById('fld-body')?.innerHTML ?? ''
    const html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">'
      + '<head><meta charset="utf-8"><style>'
      + 'body{font-family:Calibri,Arial,sans-serif;color:#0A1628;font-size:11pt;margin:2.5cm}'
      + '.hdr{display:table;width:100%;border-bottom:1px solid #ccc;padding-bottom:14pt;margin-bottom:20pt}'
      + '.hdr td{vertical-align:top}'
      + '.addr{text-align:right;font-size:9pt;color:#666;line-height:1.6}'
      + '.lbl{font-size:8pt;letter-spacing:1px;text-transform:uppercase;color:#888}'
      + '.ftr{border-top:1px solid #ccc;margin-top:40pt;padding-top:10pt;text-align:center;font-size:8pt;color:#888}'
      + '</style></head><body>'
      + '<table class="hdr"><tr><td><b style="font-size:16pt;letter-spacing:2px">VDSO</b></td>'
      + '<td class="addr">Wiegershof 9, 5751 XJ<br>info@vdso.nl<br>+31 6 22580038</td></tr></table>'
      + '<table style="width:100%;margin-bottom:24pt"><tr>'
      + '<td>T.a.v. de heer/mevrouw<br>Straatnaam 123<br>1234 AB Plaatsnaam</td>'
      + '<td style="text-align:right"><span class="lbl">Datum</span> ' + today + '<br><span class="lbl">Referentie</span> ' + referentie + '</td>'
      + '</tr></table>'
      + '<p class="lbl">Betreft</p><p style="font-size:13pt;font-weight:bold">' + onderwerp + '</p>'
      + bodyHtml
      + '<div class="ftr">KVK 42015299 &middot; BTW NL869302140B0 &middot; NL36 RABO 0173 3874 89</div>'
      + '</body></html>'
    const blob = new Blob(['﻿', html], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'VDSO-briefpapier.doc'
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  async function handleExportPdf() {
    if (!pageRef.current || exporting) return
    setExporting(true)
    try {
      await elementsToPdf([{ element: pageRef.current, widthMm: 210, heightMm: 297 }], 'VDSO-briefpapier.pdf')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className={adminStyles.page}>
      <AdminSidebar />
      <main className={adminStyles.main} style={{ padding: 0 }}>
      <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <Link href="/admin" className={styles.backBtn}><ArrowLeft size={14} /> Terug</Link>
        <div className={styles.toolbarActions}>
          <button className={styles.wordBtn} onClick={downloadWord}>Opslaan als Word</button>
          <button className={styles.printBtn} onClick={handleExportPdf} disabled={exporting}>{exporting ? 'Bezig…' : 'Opslaan als PDF'}</button>
        </div>
      </div>

      <div ref={pageRef} className={styles.page}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(10,22,40,0.12)', paddingBottom: '28px' }}>
          <Image src="/uploads/logo-vdso-drukwerk.png" alt="VDSO" width={216} height={40} unoptimized priority style={{ height: '40px', width: 'auto', display: 'block' }} />
          <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '11px', lineHeight: 1.6, color: 'var(--vdso-iron)', letterSpacing: '0.02em' }}>
            <div>Wiegershof 9, 5751 XJ</div>
            <div>info@vdso.nl</div>
            <div>+31 6 22580038</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '44px' }}>
          <div contentEditable suppressContentEditableWarning className={styles.editable} style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--vdso-navy)' }}>
            <div>T.a.v. de heer/mevrouw</div>
            <div>Straatnaam 123</div>
            <div>1234 AB Plaatsnaam</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '14px', lineHeight: 1.9, color: 'var(--vdso-navy)' }}>
            <div><span style={labelStyle}>Datum</span>&nbsp;&nbsp;<span ref={datumRef} contentEditable suppressContentEditableWarning className={styles.editable} id="fld-datum">20 juli 2026</span></div>
            <div><span style={labelStyle}>Referentie</span>&nbsp;&nbsp;<span ref={referentieRef} contentEditable suppressContentEditableWarning className={styles.editable} id="fld-referentie">VDSO-2026-001</span></div>
          </div>
        </div>

        <div style={{ marginTop: '48px', fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--vdso-chrome)' }}>Betreft</div>
        <div contentEditable suppressContentEditableWarning className={styles.editable} id="fld-onderwerp" style={{ fontSize: '20px', fontWeight: 500, color: 'var(--vdso-navy)', marginTop: '6px', letterSpacing: '-0.01em' }}>Onderwerp van deze brief</div>

        <div contentEditable suppressContentEditableWarning className={styles.editable} id="fld-body" style={{ marginTop: '32px', fontSize: '15px', lineHeight: 1.7, color: 'var(--vdso-navy)', flex: 1 }}>
          <p style={{ margin: '0 0 18px' }}>Geachte heer/mevrouw,</p>
          <p style={{ margin: '0 0 18px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p style={{ margin: '0 0 18px' }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p style={{ margin: '0 0 18px' }}>Voor vragen staan wij u graag persoonlijk te woord.</p>
          <p style={{ margin: '40px 0 0' }}>Met vriendelijke groet,</p>
          <p style={{ margin: '32px 0 0', fontWeight: 500 }}>Team VDSO</p>
        </div>

        <div style={{ borderTop: '1px solid rgba(10,22,40,0.12)', padding: '18px 0 22px', display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.02em', color: 'var(--vdso-chrome)' }}>
          <span>KVK 42015299</span><span>&middot;</span><span>BTW NL869302140B0</span><span>&middot;</span><span>NL36 RABO 0173 3874 89</span>
        </div>
      </div>
      </div>
      </main>
    </div>
  )
}
