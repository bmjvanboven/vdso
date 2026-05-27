import Image from 'next/image'
import Link from 'next/link'
import { Zap, Navigation, ArrowRight } from 'lucide-react'
import type { Car, BadgeStatus } from '@/lib/supabase/types'
import styles from './CarCard.module.css'

const BADGE_COLOR: Record<BadgeStatus, string> = {
  net_binnen:   'var(--vdso-blue)',
  beschikbaar:  'var(--vdso-success)',
  bijna_weg:    'var(--vdso-warning)',
  gereserveerd: '#8B7FFF',
  verkocht:     'rgba(255,255,255,0.30)',
}
const BADGE_LABEL: Record<BadgeStatus, string> = {
  net_binnen:   'Net binnen',
  beschikbaar:  'Beschikbaar',
  bijna_weg:    'Bijna weg',
  gereserveerd: 'Gereserveerd',
  verkocht:     'Verkocht',
}

export default function CarCard({ car, onProefrit }: { car: Car; onProefrit?: () => void }) {
  const isSold = car.badge_status === 'verkocht'
  const color  = BADGE_COLOR[car.badge_status]

  return (
    <article className={`${styles.card} ${isSold ? styles.sold : ''}`}>
      <Link href={`/aanbod/${car.id}`} className={styles.mediaLink}>
      <div className={styles.media}>
        <span className={styles.badge} style={{ color }}>
          <span className={styles.dot} />
          {BADGE_LABEL[car.badge_status]}
        </span>
        {car.fotos?.[0] ? (
          <Image
            src={car.fotos[0]}
            alt={`${car.merk} ${car.model}`}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className={styles.img}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
        {isSold && (
          <div className={styles.soldOverlay}>
            <span className={styles.soldLabel}>Verkocht</span>
          </div>
        )}
      </div>
      </Link>
      <div className={styles.body}>
        <p className={styles.eyebrow}>{car.merk} · {car.jaar}</p>
        <h2 className={styles.name}>{car.model}</h2>
        <div className={styles.specs}>
          <span className={styles.spec}><Zap size={11} /> {car.pk} pk</span>
          <span className={styles.spec}><Navigation size={11} /> {car.kmstand.toLocaleString('nl')} km</span>
        </div>
        <div className={styles.footer}>
          <div>
            <p className={styles.priceLabel}>Vraagprijs</p>
            <p className={styles.price}>
              <span className={styles.currency}>€</span>
              {car.prijs.toLocaleString('nl')}
            </p>
          </div>
          {!isSold && (
            <button className="btn-ghost" onClick={onProefrit}>
              Interesse <ArrowRight size={12} />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
