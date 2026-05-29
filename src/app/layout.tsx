import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import NavigationProgress from '@/components/NavigationProgress'
import PageLoader from '@/components/PageLoader'

export const metadata: Metadata = {
  title: 'VDSO — Premium Occasions Deurne',
  description: 'Handpicked premium occasions. RS-modellen, M-series, AMG — zorgvuldig geselecteerd.',
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
