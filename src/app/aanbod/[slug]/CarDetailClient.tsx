'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, X, Images,
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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const photos = car.fotos?.length ? car.fotos : []
  const isSold = car.badge_status === 'verkocht'
  const isMosaic = photos.length >= 6

  function prev() { setActivePhoto(i => (i - 1 + photos.length) % photos.length) }
  function next() { setActivePhoto(i => (i + 1) % photos.length) }
  function openLightbox(i: number) { setActivePhoto(i); setLightboxOpen(true) }

  useEffect(() => {
    if (!lightboxOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, photos.length])

  return (
    <>
      <Nav onProefrit={() => setModalOpen(true)} />
      <ProefritModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cars={[car, ...related]}
        preselect={car.id}
      />

      {/* ── HEADER: breadcrumb + titel + prijs ────────── */}
      <section className={styles.detailHeader}>
        <div className={styles.detailHeaderInner}>
          <nav className={styles.breadcrumb}>
            <Link href="/aanbod" className={styles.breadcrumbBack}>
              <ArrowLeft size={14} /> Terug naar aanbod
            </Link>
          </nav>
          <div className={styles.detailHeaderRow}>
            <div>
              <p className={styles.headerEyebrow}>{car.merk} · {car.jaar}</p>
              <h1 className={styles.headerTitle}>{car.model}</h1>
            </div>
            <div className={styles.detailHeaderPrice}>
              <p className={styles.priceLabel}>Vraagprijs</p>
              <p className={styles.priceCompact}>
                <span className={styles.priceCurrency}>€</span>{car.prijs.toLocaleString('nl')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────── */}
      <section className={styles.gallery}>
        {isMosaic ? (
          <div className={styles.mosaic}>
            <button className={`${styles.mosaicTile} ${styles.mosaicLeft1}`} onClick={() => openLightbox(0)}>
              <Image src={photos[0]} alt="" fill sizes="18vw" className={styles.mosaicImg} />
            </button>
            <button className={`${styles.mosaicTile} ${styles.mosaicLeft2}`} onClick={() => openLightbox(1)}>
              <Image src={photos[1]} alt="" fill sizes="18vw" className={styles.mosaicImg} />
            </button>
            <button className={`${styles.mosaicTile} ${styles.mosaicLeft3}`} onClick={() => openLightbox(2)}>
              <Image src={photos[2]} alt="" fill sizes="18vw" className={styles.mosaicImg} />
            </button>

            <div className={styles.mosaicMain}>
              <Image
                key={activePhoto}
                src={photos[activePhoto]}
                alt={`${car.merk} ${car.model}`}
                fill
                sizes="45vw"
                className={styles.galleryImg}
                priority
                onClick={() => openLightbox(activePhoto)}
              />
              <div className={styles.galleryOverlay} />
              <span className={styles.galleryBadge} style={{ color: BADGE_COLOR[car.badge_status] }}>
                <span className={styles.galleryBadgeDot} />
                {BADGE_LABELS[car.badge_status]}
              </span>
              <button className={`${styles.galleryArrow} ${styles.galleryArrowPrev}`} onClick={prev}>
                <ChevronLeft size={20} />
              </button>
              <button className={`${styles.galleryArrow} ${styles.galleryArrowNext}`} onClick={next}>
                <ChevronRight size={20} />
              </button>
              <div className={styles.galleryCounter}>{activePhoto + 1} / {photos.length}</div>
            </div>

            <button className={`${styles.mosaicTile} ${styles.mosaicRight1}`} onClick={() => openLightbox(3)}>
              <Image src={photos[3]} alt="" fill sizes="18vw" className={styles.mosaicImg} />
            </button>
            <button className={`${styles.mosaicTile} ${styles.mosaicRight2}`} onClick={() => openLightbox(4)}>
              <Image src={photos[4]} alt="" fill sizes="18vw" className={styles.mosaicImg} />
            </button>
            <button className={`${styles.mosaicTile} ${styles.mosaicOverflow}`} onClick={() => openLightbox(5)}>
              <Image src={photos[5]} alt="" fill sizes="18vw" className={styles.mosaicImg} style={{ filter: 'blur(2px) brightness(0.5)' }} />
              <span className={styles.mosaicOverflowLabel}><Images size={16} /> Alle foto&apos;s ({photos.length})</span>
            </button>
          </div>
        ) : (
          <>
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
                    onClick={() => openLightbox(activePhoto)}
                  />
                ) : (
                  <div className={styles.galleryPlaceholder} />
                )}
                <div className={styles.galleryOverlay} />

                <span className={styles.galleryBadge} style={{ color: BADGE_COLOR[car.badge_status] }}>
                  <span className={styles.galleryBadgeDot} />
                  {BADGE_LABELS[car.badge_status]}
                </span>

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
            </div>

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
          </>
        )}
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────── */}
      {lightboxOpen && photos.length > 0 && (
        <div className={styles.lightbox} onClick={e => e.target === e.currentTarget && setLightboxOpen(false)}>
          <button className={styles.lightboxClose} onClick={() => setLightboxOpen(false)}>
            <X size={22} />
          </button>
          <div className={styles.lightboxMain}>
            <Image
              key={activePhoto}
              src={photos[activePhoto]}
              alt={`${car.merk} ${car.model}`}
              fill
              sizes="100vw"
              className={styles.lightboxImg}
            />
            {photos.length > 1 && (
              <>
                <button className={`${styles.galleryArrow} ${styles.galleryArrowPrev}`} onClick={prev}>
                  <ChevronLeft size={20} />
                </button>
                <button className={`${styles.galleryArrow} ${styles.galleryArrowNext}`} onClick={next}>
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          <div className={styles.lightboxCounter}>{activePhoto + 1} / {photos.length}</div>
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
        </div>
      )}

      {/* ── CONTENT ──────────────────────────────────── */}
      <div className={styles.content}>

        <div className={styles.contentLayout}>

          {/* ── LEFT: main info ────────────────────── */}
          <div className={styles.mainCol}>
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
          <p className={styles.footerLegal}>© 2026 VDSO B.V. · RDW erkend · KvK 42015299</p>
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
