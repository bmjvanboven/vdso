'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import AdminSidebar from '../AdminSidebar'
import adminStyles from '../admin.module.css'
import styles from '../templateViewer.module.css'

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.14em',
  textTransform: 'uppercase', color: 'var(--vdso-chrome)',
}
const thStyle: React.CSSProperties = {
  padding: '0 0 10px', fontFamily: 'var(--font-display)', fontSize: '10.5px',
  letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--vdso-chrome)', fontWeight: 600,
}
const rowBorder = '1px solid rgba(10,22,40,0.08)'

function newRowHtml() {
  return '<td style="padding:10px 0">Nieuwe regel</td>'
    + '<td style="text-align:right;padding:10px 0">1</td>'
    + '<td style="text-align:right;padding:10px 0">€ 0,00</td>'
    + '<td style="text-align:right;padding:10px 0">21%</td>'
    + '<td style="text-align:right;padding:10px 0">€ 0,00</td>'
}

export default function FactuurClient() {
  const tbodyRef = useRef<HTMLTableSectionElement>(null)
  const klantRef = useRef<HTMLDivElement>(null)
  const factuurnrRef = useRef<HTMLSpanElement>(null)
  const factuurdatumRef = useRef<HTMLSpanElement>(null)
  const vervaldatumRef = useRef<HTMLSpanElement>(null)
  const termijnRef = useRef<HTMLSpanElement>(null)
  const ponrRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const today = new Date()
    const fmt = (d: Date) => d.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
    const vervaldatum = new Date(today)
    vervaldatum.setDate(vervaldatum.getDate() + 14)
    if (factuurdatumRef.current) factuurdatumRef.current.textContent = fmt(today)
    if (vervaldatumRef.current) vervaldatumRef.current.textContent = fmt(vervaldatum)
    if (factuurnrRef.current) factuurnrRef.current.textContent = `VDSO-${today.getFullYear()}-`
  }, [])

  function addRow() {
    const tbody = tbodyRef.current
    if (!tbody) return
    const tr = document.createElement('tr')
    tr.style.borderBottom = rowBorder
    tr.innerHTML = newRowHtml()
    tbody.appendChild(tr)
  }

  function removeRow() {
    const tbody = tbodyRef.current
    if (tbody?.lastElementChild) tbody.removeChild(tbody.lastElementChild)
  }

  function downloadWord() {
    const klant = klantRef.current?.innerHTML ?? ''
    const factuurnr = factuurnrRef.current?.textContent ?? ''
    const factuurdatum = factuurdatumRef.current?.textContent ?? ''
    const vervaldatum = vervaldatumRef.current?.textContent ?? ''
    const termijn = termijnRef.current?.textContent ?? ''
    const ponr = ponrRef.current?.textContent ?? ''
    const regelsHtml = tbodyRef.current?.innerHTML ?? ''
    const html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">'
      + '<head><meta charset="utf-8"><style>'
      + 'body{font-family:Calibri,Arial,sans-serif;color:#0A1628;font-size:11pt;margin:2.5cm}'
      + '.hdr{display:table;width:100%;border-bottom:1px solid #ccc;padding-bottom:14pt;margin-bottom:20pt}'
      + '.hdr td{vertical-align:top}'
      + '.addr{text-align:right;font-size:9pt;color:#666;line-height:1.6}'
      + '.lbl{font-size:8pt;letter-spacing:1px;text-transform:uppercase;color:#888}'
      + 'table.items{width:100%;border-collapse:collapse;margin-top:20pt}'
      + 'table.items th{text-align:left;font-size:8pt;text-transform:uppercase;color:#888;border-bottom:1px solid #333;padding-bottom:6pt}'
      + 'table.items td{padding:6pt 0;border-bottom:1px solid #eee}'
      + '.totals{width:260pt;float:right;margin-top:10pt;font-size:10pt}'
      + '.totals td{padding:4pt 0}'
      + '.pay{clear:both;margin-top:30pt;padding:12pt;background:#f2f5fb;font-size:9.5pt;line-height:1.6}'
      + '.ftr{border-top:1px solid #ccc;margin-top:40pt;padding-top:10pt;text-align:center;font-size:8pt;color:#888}'
      + '</style></head><body>'
      + '<table class="hdr"><tr><td><b style="font-size:16pt;letter-spacing:2px">VDSO</b></td>'
      + '<td class="addr">Wiegershof 9, 5751 XJ<br>info@vdso.nl<br>+31 6 22580038</td></tr></table>'
      + '<table style="width:100%;margin-bottom:20pt"><tr>'
      + '<td><b style="font-size:20pt">FACTUUR</b><br><br>' + klant + '</td>'
      + '<td style="text-align:right;font-size:9.5pt;line-height:2">'
      + '<span class="lbl">Factuurnummer</span> ' + factuurnr + '<br>'
      + '<span class="lbl">Factuurdatum</span> ' + factuurdatum + '<br>'
      + '<span class="lbl">Vervaldatum</span> ' + vervaldatum + '<br>'
      + '<span class="lbl">Betalingstermijn</span> ' + termijn + '<br>'
      + '<span class="lbl">PO/ordernr.</span> ' + ponr
      + '</td></tr></table>'
      + '<table class="items"><thead><tr><th>Omschrijving</th><th style="text-align:right">Aantal</th><th style="text-align:right">Prijs p/st</th><th style="text-align:right">BTW%</th><th style="text-align:right">Totaal</th></tr></thead>'
      + '<tbody>' + regelsHtml + '</tbody></table>'
      + '<table class="totals"><tr><td>Subtotaal</td><td style="text-align:right">€ 1.705,00</td></tr>'
      + '<tr><td>BTW (21%)</td><td style="text-align:right">€ 358,05</td></tr>'
      + '<tr><td><b>Totaal</b></td><td style="text-align:right"><b>€ 2.063,05</b></td></tr></table>'
      + '<div class="pay"><b>Betaalinstructies</b><br>Gelieve het totaalbedrag binnen ' + termijn + ' na factuurdatum over te maken naar <b>NL36 RABO 0173 3874 89</b> t.n.v. VDSO, onder vermelding van factuurnummer <b>' + factuurnr + '</b>.</div>'
      + '<div class="ftr">Wiegershof 9, 5751 XJ &middot; info@vdso.nl &middot; +31 6 22580038 &middot; KVK 42015299 &middot; BTW NL869302140B0 &middot; NL36 RABO 0173 3874 89</div>'
      + '</body></html>'
    const blob = new Blob(['﻿', html], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'VDSO-factuur.doc'
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
          <button className={styles.printBtn} onClick={() => window.print()}>Opslaan als PDF</button>
        </div>
      </div>

      <div className={styles.page}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(10,22,40,0.12)', paddingBottom: '28px' }}>
          <Image src="/uploads/logo-vdso-webversie-klein.png" alt="VDSO" width={216} height={40} priority style={{ height: '40px', width: 'auto', display: 'block' }} />
          <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '11px', lineHeight: 1.6, color: 'var(--vdso-iron)', letterSpacing: '0.02em' }}>
            <div>Wiegershof 9, 5751 XJ</div>
            <div>info@vdso.nl</div>
            <div>+31 6 22580038</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '44px' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, letterSpacing: '0.04em', color: 'var(--vdso-navy)' }}>FACTUUR</div>
            <div ref={klantRef} contentEditable suppressContentEditableWarning className={styles.editable} style={{ marginTop: '18px', fontSize: '14px', lineHeight: 1.6, color: 'var(--vdso-navy)' }}>
              <div>T.a.v. de heer/mevrouw</div>
              <div>Straatnaam 123</div>
              <div>1234 AB Plaatsnaam</div>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '13px', lineHeight: 2, color: 'var(--vdso-navy)', whiteSpace: 'nowrap' }}>
            <div><span style={labelStyle}>Factuurnummer</span>&nbsp;&nbsp;<span ref={factuurnrRef} contentEditable suppressContentEditableWarning className={styles.editable}>VDSO-2026-0142</span></div>
            <div><span style={labelStyle}>Factuurdatum</span>&nbsp;&nbsp;<span ref={factuurdatumRef} contentEditable suppressContentEditableWarning className={styles.editable}>20 juli 2026</span></div>
            <div><span style={labelStyle}>Vervaldatum</span>&nbsp;&nbsp;<span ref={vervaldatumRef} contentEditable suppressContentEditableWarning className={styles.editable}>3 augustus 2026</span></div>
            <div><span style={labelStyle}>Betalingstermijn</span>&nbsp;&nbsp;<span ref={termijnRef} contentEditable suppressContentEditableWarning className={styles.editable}>14 dagen</span></div>
            <div><span style={labelStyle}>PO/ordernr.</span>&nbsp;&nbsp;<span ref={ponrRef} contentEditable suppressContentEditableWarning className={styles.editable}>PO-8831</span></div>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '40px', fontSize: '13.5px', color: 'var(--vdso-navy)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--vdso-navy)' }}>
              <th style={{ ...thStyle, textAlign: 'left' }}>Omschrijving</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Aantal</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Prijs p/st</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>BTW%</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Totaal</th>
            </tr>
          </thead>
          <tbody ref={tbodyRef} contentEditable suppressContentEditableWarning className={styles.editable}>
            <tr style={{ borderBottom: rowBorder }}>
              <td style={{ padding: '10px 0' }}>Lamborghini Huracán EVO &mdash; bouwjaar 2022, 18.400 km</td>
              <td style={{ textAlign: 'right', padding: '10px 0' }}>1</td>
              <td style={{ textAlign: 'right', padding: '10px 0' }}>€ 189.500,00</td>
              <td style={{ textAlign: 'right', padding: '10px 0' }}>21%</td>
              <td style={{ textAlign: 'right', padding: '10px 0' }}>€ 189.500,00</td>
            </tr>
            <tr style={{ borderBottom: rowBorder }}>
              <td style={{ padding: '10px 0' }}>Inruil &amp; overname documentatie</td>
              <td style={{ textAlign: 'right', padding: '10px 0' }}>1</td>
              <td style={{ textAlign: 'right', padding: '10px 0' }}>€ 0,00</td>
              <td style={{ textAlign: 'right', padding: '10px 0' }}>21%</td>
              <td style={{ textAlign: 'right', padding: '10px 0' }}>€ 0,00</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.rowActions}>
          <button type="button" className={styles.rowBtn} onClick={addRow}>+ Regel toevoegen</button>
          <button type="button" className={styles.rowBtnGhost} onClick={removeRow}>&minus; Laatste regel verwijderen</button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <div contentEditable suppressContentEditableWarning className={styles.editable} style={{ width: '260px', fontSize: '13.5px', color: 'var(--vdso-navy)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: rowBorder }}><span>Subtotaal</span><span>€ 1.705,00</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: rowBorder }}><span>BTW (21%)</span><span>€ 358,05</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0', marginTop: '4px', fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 700, color: 'var(--vdso-blue)' }}><span>Totaal</span><span>€ 2.063,05</span></div>
          </div>
        </div>

        <div style={{ marginTop: '36px', padding: '18px 22px', background: 'rgba(46,107,255,0.06)', border: '1px solid rgba(46,107,255,0.18)', borderRadius: 'var(--r-md)', fontSize: '13px', lineHeight: 1.8, color: 'var(--vdso-navy)' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '10.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--vdso-chrome)', marginBottom: '4px' }}>Betaalinstructies</div>
          Gelieve het totaalbedrag binnen <span contentEditable suppressContentEditableWarning className={styles.editable}>14 dagen</span> na factuurdatum over te maken naar <b>NL36 RABO 0173 3874 89</b> t.n.v. VDSO, onder vermelding van factuurnummer <b>VDSO-2026-0142</b>.
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ borderTop: '1px solid rgba(10,22,40,0.12)', padding: '18px 0 22px', display: 'flex', justifyContent: 'center', gap: '18px', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '10.5px', letterSpacing: '0.02em', color: 'var(--vdso-chrome)' }}>
          <span>KVK 42015299</span><span>&middot;</span><span>BTW NL869302140B0</span><span>&middot;</span><span>NL36 RABO 0173 3874 89</span>
        </div>
      </div>
      </div>
      </main>
    </div>
  )
}
