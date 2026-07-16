'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight,
  Zap, Navigation, Calendar, ShieldCheck, Phone, CheckCircle,
  Palette, Armchair, Fuel, Settings2, Car as CarIcon, Receipt
} from 'lucide-react'
import Nav from '@/components/Nav'
import ProefritModal from '@/components/ProefritModal'
import CarCard from '@/components/CarCard'
import type { Car, BadgeStatus } from '@/lib/supabase/types'
import { BADGE_LABELS } from '@/lib/supabase/types'
import styles from './carDetail.module.css'

const BADGE_COLOR: Record<BadgeStatus, string> = {
  wordt_verwacht: '#4FC3D9',
  net_binnen:   'var(--vdso-blue)',
  beschikbaar:  'var(--vdso-success)',
  bijna_weg:    'var(--vdso-warning)',
  gereserveerd: '#8B7FFF',
  verkocht:     'rgba(255,255,255,0.30)',
}

export default function CarDetailClient({
  car, related, phone
}: {
  car: Car
  related: Car[]
  phone: string
}) {
  const [activePhoto, setActivePhoto] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const photos = car.fotos?.length ? car.fotos : []
  const isSold = car.badge_status === 'verkocht'

  function prev() { setActivePhoto(i => (i - 1 + photos.length) % photos.length) }
  function next() { setActivePhoto(i => (i + 1) % photos.length) }

  return (
    <>
      <Nav onProefrit={() => setModalOpen(true)} />
      <ProefritModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cars={[car, ...related]}
        preselect={car.id}
      />

      {/* ── GALLERY ──────────────────────────────────── */}
      <section className={styles.gallery}>
        <div className={styles.galleryInner}>
        <div className={styles.galleryMain}>
          {photos.length > 0 ? (
            <Image
              key={activePhoto}
              src={photos[activePhoto]}
              alt={`${car.merk} ${car.model}`}
              fill
              sizes="100vw"
              className={styles.galleryImg}
              priority
            />
          ) : (
            <div className={styles.galleryPlaceholder} />
          )}
          <div className={styles.galleryOverlay} />

          {/* Badge */}
          <span className={styles.galleryBadge} style={{ color: BADGE_COLOR[car.badge_status] }}>
            <span className={styles.galleryBadgeDot} />
            {BADGE_LABELS[car.badge_status]}
          </span>

          {/* Arrows */}
          {photos.length > 1 && (
            <>
              <button className={`${styles.galleryArrow} ${styles.galleryArrowPrev}`} onClick={prev}>
                <ChevronLeft size={20} />
              </button>
              <button className={`${styles.galleryArrow} ${styles.galleryArrowNext}`} onClick={next}>
                <ChevronRight size={20} />
              </button>
              <div className={styles.galleryCounter}>
                {activePhoto + 1} / {photos.length}
              </div>
            </>
          )}
        </div>

        </div>{/* /galleryInner */}

        {/* Thumbnails */}
        {photos.length > 1 && (
          <div className={styles.thumbStrip}>
            {photos.map((url, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${i === activePhoto ? styles.thumbActive : ''}`}
                onClick={() => setActivePhoto(i)}
              >
                <Image src={url} alt="" fill sizes="120px" className={styles.thumbImg} />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ── CONTENT ──────────────────────────────────── */}
      <div className={styles.content}>

        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/aanbod" className={styles.breadcrumbBack}>
            <ArrowLeft size={14} /> Terug naar aanbod
          </Link>
        </nav>

        <div className={styles.contentLayout}>

          {/* ── LEFT: main info ────────────────────── */}
          <div className={styles.mainCol}>
            <p className={styles.eyebrow}>{car.merk} · {car.jaar}</p>
            <h1 className={styles.title}>{car.model}</h1>

            {/* Specs grid */}
            <div className={styles.specsGrid}>
              <SpecBlock icon={<Zap size={16} />} label="Vermogen" value={`${car.pk} pk`} />
              <SpecBlock icon={<Navigation size={16} />} label="Kilometerstand" value={`${car.kmstand.toLocaleString('nl')} km`} />
              <SpecBlock icon={<Calendar size={16} />} label="Bouwjaar" value={`${car.jaar}${car.specs?.datum ? ` · ${car.specs.datum}` : ''}`} />
              {car.specs?.carrosserie && <SpecBlock icon={<CarIcon size={16} />} label="Carrosserie" value={car.specs.carrosserie} />}
              {car.specs?.brandstof && <SpecBlock icon={<Fuel size={16} />} label="Brandstof" value={car.specs.brandstof} />}
              {car.specs?.transmissie && <SpecBlock icon={<Settings2 size={16} />} label="Transmissie" value={car.specs.transmissie} />}
              {car.specs?.kleur && <SpecBlock icon={<Palette size={16} />} label="Kleur" value={car.specs.kleur} />}
              {car.specs?.interieur && <SpecBlock icon={<Armchair size={16} />} label="Interieur" value={car.specs.interieur} />}
              {car.specs?.btw_verrekenbaar != null && <SpecBlock icon={<Receipt size={16} />} label="BTW" value={car.specs.btw_verrekenbaar ? 'Verrekenbaar' : 'Niet verrekenbaar'} />}
            </div>

            {/* Description */}
            {car.omschrijving && (
              <div className={styles.description}>
                <p className={styles.descriptionLabel}>Omschrijving</p>
                <p className={styles.descriptionText}>{car.omschrijving}</p>
              </div>
            )}

            {/* Kenmerken — uit specs.kenmerken of fallback */}
            {car.specs?.kenmerken && Object.keys(car.specs.kenmerken).length > 0 ? (
              <div className={styles.highlights}>
                {Object.entries(car.specs.kenmerken).map(([categorie, items]) => (
                  <div key={categorie} className={styles.kenmerkenGroep}>
                    <p className={styles.highlightsLabel}>{categorie}</p>
                    <ul className={styles.highlightList}>
                      {items.map(item => (
                        <li key={item} className={styles.highlightItem}>
                          <CheckCircle size={13} className={styles.highlightIcon} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.highlights}>
                <p className={styles.highlightsLabel}>Standaard kenmerken</p>
                <ul className={styles.highlightList}>
                  {['RDW erkend','Volledig dealer onderhouden','NAP-gekeurd','Inruil mogelijk','Financiering beschikbaar'].map(h => (
                    <li key={h} className={styles.highlightItem}>
                      <CheckCircle size={13} className={styles.highlightIcon} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── RIGHT: sticky price card ────────────── */}
          <aside className={styles.sideCol}>
            <div className={styles.priceCard}>
              <p className={styles.priceLabel}>Vraagprijs</p>
              <p className={styles.price}>
                <span className={styles.priceCurrency}>€</span>
                {car.prijs.toLocaleString('nl')}
              </p>
              <p className={styles.priceSub}>Inclusief BTW · Prijzen onder voorbehoud</p>

              <div className={styles.cardDivider} />

              {!isSold ? (
                <>
                  <button
                    className={`btn-primary ${styles.cardCta}`}
                    onClick={() => setModalOpen(true)}
                  >
                    Plan een proefrit <ArrowRight size={14} />
                  </button>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className={`btn-secondary ${styles.cardCta}`}>
                    <Phone size={14} /> {phone}
                  </a>
                </>
              ) : (
                <div className={styles.soldNotice}>
                  <p>Deze auto is verkocht.</p>
                  <Link href="/aanbod" className={`btn-secondary ${styles.cardCta}`}>
                    Bekijk ander aanbod <ArrowRight size={14} />
                  </Link>
                </div>
              )}

              <div className={styles.cardDivider} />

              <div className={styles.cardTrust}>
                <TrustItem icon={<ShieldCheck size={13} />} text="RDW erkend" />
                <TrustItem icon={<CheckCircle size={13} />} text="Inruil mogelijk" />
              </div>
            </div>
          </aside>

        </div>

        {/* ── RELATED ────────────────────────────────── */}
        {related.length > 0 && (
          <div className={styles.related}>
            <p className={styles.relatedLabel}>Meer aanbod</p>
            <h2 className={styles.relatedTitle}>Bekijk ook</h2>
            <div className={styles.relatedGrid}>
              {related.map(r => (
                <CarCard key={r.id} car={r} onProefrit={() => setModalOpen(true)} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerLegal}>© 2026 VDSO B.V. · RDW erkend · KvK 00000000</p>
        </div>
      </footer>
    </>
  )
}

function SpecBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className={styles.specBlock}>
      <div className={styles.specIcon}>{icon}</div>
      <p className={styles.specLabel}>{label}</p>
      <p className={styles.specValue}>{value}</p>
    </div>
  )
}

function TrustItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className={styles.trustItem}>
      {icon}
      <span>{text}</span>
    </div>
  )
}
