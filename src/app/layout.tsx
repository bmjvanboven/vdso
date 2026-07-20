import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import NavigationProgress from '@/components/NavigationProgress'
import PageLoader from '@/components/PageLoader'

const SITE_URL = 'https://vdso.nl'
const TITLE = 'VDSO — Premium Occasions Deurne'
const DESCRIPTION = 'Handpicked premium occasions: RS-modellen, M-series en AMG, zorgvuldig geselecteerd. RDW erkend autobedrijf in Deurne.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s · VDSO' },
  description: DESCRIPTION,
  keywords: ['occasions Deurne', 'premium occasions', 'BMW M', 'Mercedes-AMG', 'tweedehands auto kopen', 'VDSO'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: SITE_URL,
    siteName: 'VDSO',
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/uploads/logo-seo-afbeelding.jpg', width: 1080, height: 1080, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/uploads/logo-seo-afbeelding.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" data-theme="dark">
      <body>
        <PageLoader />
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
