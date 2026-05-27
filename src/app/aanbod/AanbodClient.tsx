'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import Nav from '@/components/Nav'
import CarCard from '@/components/CarCard'
import ProefritModal from '@/components/ProefritModal'
import PreviewGate from '@/components/PreviewGate'
import type { Car, BadgeStatus } from '@/lib/supabase/types'
import styles from './AanbodClient.module.css'

const FILTERS: { key: BadgeStatus | 'all'; label: string; color?: string }[] = [
  { key: 'all', label: 'Alle' },
  { key: 'net_binnen', label: 'Net binnen', color: 'var(--vdso-blue)' },
  { key: 'beschikbaar', label: 'Beschikbaar', color: 'var(--vdso-success)' },
  { key: 'bijna_weg', label: 'Bijna weg', color: 'var(--vdso-warning)' },
  { key: 'gereserveerd', label: 'Gereserveerd', color: '#8B7FFF' },
  { key: 'verkocht', label: 'Verkocht', color: 'rgba(255,255,255,0.25)' },
]

export default function AanbodClient({ cars, showGate }: { cars: Car[]; showGate: boolean }) {
  const [filter, setFilter] = useState<BadgeStatus | 'all'>('all')
  const [modalOpen, setModalOpen] = useState(false)

  if (showGate) return <PreviewGate />

  const visible = filter === 'all' ? cars : cars.filter(c => c.badge_status === filter)

  return (
    <>
      <Nav onProefrit={() => setModalOpen(true)} />
      <ProefritModal isOpen={modalOpen} onClose={() => setModalOpen(false)} cars={cars} />

      <div className={styles.header}>
        <p className={styles.eyebrow}>VDSO · Deurne</p>
        <h1 className={styles.title}>Ons aanbod.</h1>
        <p className={styles.sub}>Elk voertuig persoonlijk geselecteerd. RS-modellen, M-series, AMG — uitsluitend de beste occasions.</p>
        <p className={styles.count}><span>{visible.length}</span> voertuigen</p>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`${styles.tab} ${filter === f.key ? styles.tabActive : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.color && <span className={styles.dot} style={{ background: f.color }} />}
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.gridWrap}>
        {visible.length === 0 ? (
          <p className={styles.empty}>Geen voertuigen in deze categorie.</p>
        ) : (
          <div className={styles.grid}>
            {visible.map(car => (
              <CarCard key={car.id} car={car} onProefrit={() => setModalOpen(true)} />
            ))}
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <Link href="/" className={styles.back}><ArrowLeft size={12} /> Terug naar home</Link>
        <Image src="/uploads/logo-concept-navigatie.png" alt="VDSO" width={80} height={24} style={{ opacity: 0.5 }} />
        <p className={styles.legal}>© 2026 VDSO B.V. · BOVAG-lid</p>
      </footer>
    </>
  )
}
