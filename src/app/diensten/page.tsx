import type { Metadata } from 'next'
import DienstenClient from './DienstenClient'

export const metadata: Metadata = {
  title: 'Diensten',
  description: 'Inkoop, verkoop en consignatie bij VDSO in Deurne — eerlijke taxatie, snelle afhandeling en volledig verzorgde overdracht.',
  alternates: { canonical: '/diensten' },
}

export default function DienstenPage() {
  return <DienstenClient />
}
