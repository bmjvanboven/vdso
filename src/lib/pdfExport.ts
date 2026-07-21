// Rendert DOM-elementen naar een downloadbare PDF (client-side), zonder de
// browser-printdialoog te gebruiken — zo kiest de gebruiker geen printer meer,
// en blijven achtergrondkleuren/gradients altijd zichtbaar in het resultaat.
export type PdfPage = { element: HTMLElement; widthMm: number; heightMm: number }

export async function elementsToPdf(pages: PdfPage[], filename: string) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  let pdf: InstanceType<typeof jsPDF> | null = null

  for (const { element, widthMm, heightMm } of pages) {
    const canvas = await html2canvas(element, { scale: 3, backgroundColor: null, useCORS: true })
    const imgData = canvas.toDataURL('image/png')
    const orientation = widthMm >= heightMm ? 'landscape' : 'portrait'

    if (!pdf) {
      pdf = new jsPDF({ unit: 'mm', format: [widthMm, heightMm], orientation })
    } else {
      pdf.addPage([widthMm, heightMm], orientation)
    }
    pdf.addImage(imgData, 'PNG', 0, 0, widthMm, heightMm)
  }

  pdf?.save(filename)
}
