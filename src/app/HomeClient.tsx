'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShieldCheck, MapPin, ArrowRight,
  ClipboardCheck, History, Award,
  RefreshCw, TrendingUp, FileText,
  Car, Briefcase, Percent, Calculator,
  Camera, Users, Hand,
  Phone, Clock,
} from 'lucide-react'
import Nav from '@/components/Nav'
import CarCard from '@/components/CarCard'
import ProefritModal from '@/components/ProefritModal'
import PreviewGate from '@/components/PreviewGate'
import type { Car as CarType } from '@/lib/supabase/types'
import styles from './HomeClient.module.css'

export default function HomeClient({ cars, showGate }: { cars: CarType[]; showGate: boolean }) {
  const [modalOpen, setModalOpen] = useState(false)
  const heroBgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => heroBgRef.current?.classList.add(styles.loaded), 80)
    return () => clearTimeout(t)
  }, [])

  if (showGate) return <PreviewGate />

  return (
    <>
      <Nav onProefrit={() => setModalOpen(true)} />
      <ProefritModal isOpen={modalOpen} onClose={() => setModalOpen(false)} cars={cars} />

      {/* ── HERO ──────────────────────────────────────── */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroBg} ref={heroBgRef} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>VDSO · Deurne · Premium Occasions</p>
          <h1 className={styles.heroTitle}>De auto die<br />u verdient.</h1>
          <p className={styles.heroSub}>
            Handpicked premium occasions, zorgvuldig geselecteerd en direct leverbaar.
          </p>
          <div className={styles.heroTrust}>
            <span className={styles.trustItem}><ShieldCheck size={13} /> RDW erkend</span>
            <span className={styles.trustDot} />
            <span className={styles.trustItem}><MapPin size={13} /> Deurne</span>
          </div>
          <div className={styles.heroCtas}>
            <Link href="/aanbod" className="btn-primary btn-primary--lg">
              Bekijk aanbod <ArrowRight size={14} />
            </Link>
            <button className="btn-secondary btn-secondary--lg" onClick={() => setModalOpen(true)}>
              Plan proefrit
            </button>
          </div>
        </div>
      </section>

      {/* ── SPECS STRIP ───────────────────────────────── */}
      <div className={styles.specsStrip}>
        <div className={styles.specsInner}>
          <div className={styles.specItem}>
            <p className={styles.specLabel}>Ervaring</p>
            <p className={styles.specValue}>10<span className={styles.specUnit}>+</span></p>
            <p className={styles.specSub}>Jaar in de branche</p>
          </div>
          <div className={styles.specItem}>
            <p className={styles.specLabel}>Merken</p>
            <p className={styles.specValue}>12<span className={styles.specUnit}>+</span></p>
            <p className={styles.specSub}>Premium selectie</p>
          </div>
          <div className={styles.specItem}>
            <p className={styles.specLabel}>Gecertificeerd</p>
            <p className={styles.specValue}>RDW</p>
            <p className={styles.specSub}>Erkend autobedrijf</p>
          </div>
        </div>
      </div>

      {/* ── AANBOD ────────────────────────────────────── */}
      <section id="aanbod" className={styles.aanbodSection}>
        <div className="section-wrap">
          <p className="section-label">Uitgelicht aanbod</p>
          <h2 className="section-title">Handpicked.<br />Direct leverbaar.</h2>
          <p className="section-body">Elke auto in ons aanbod is persoonlijk beoordeeld op rijhistorie, conditie en afkomst. Geen compromis.</p>
          <div className={styles.grid}>
            {cars.map(car => (
              <CarCard key={car.id} car={car} onProefrit={() => setModalOpen(true)} />
            ))}
          </div>
          <div className={styles.gridCta}>
            <Link href="/aanbod" className="btn-secondary btn-secondary--lg">
              Bekijk alle occasions <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── OCCASIONS ─────────────────────────────────── */}
      <section id="occasions" className={`${styles.feature}`}>
        <div className={styles.featureLayout}>
          <div className={styles.featureVisual} style={{ backgroundImage: `linear-gradient(to bottom, rgba(5,6,8,0.25) 0%, rgba(5,6,8,0.65) 100%), url('/uploads/sectie-occassions.jpg')` }}>
          </div>
          <div>
            <p className="section-label">Curated selectie</p>
            <h2 className="section-title">Alleen de beste.<br />Altijd.</h2>
            <p className="section-body">Elk voertuig doorloopt een uitgebreide inspectie. Rijhistorie, technische staat en interieur-conditie worden persoonlijk beoordeeld voor opname in ons bestand.</p>
            <div className={styles.pillars}>
              <Pillar icon={<ClipboardCheck size={17} />} label="Inspectie" value="Grondig gecontroleerd" />
              <Pillar icon={<History size={17} />} label="Rijhistorie" value="Geverifieerd" />
              <Pillar icon={<Award size={17} />} label="Certificering" value="RDW erkend" />
            </div>
          </div>
        </div>
      </section>

      {/* ── INKOOP ────────────────────────────────────── */}
      <section id="inkoop" className={`${styles.feature} ${styles.featureAlt}`}>
        <div className={styles.featureLayout}>
          <div>
            <p className="section-label">Inkoop</p>
            <h2 className="section-title">Wij kopen<br />uw auto in.</h2>
            <p className="section-body">Breng uw huidige auto mee. Onze taxateurs bepalen een eerlijke marktwaarde, zonder verrassingen en zonder onnodige onderhandelingen. Direct verrekend bij uw aankoop.</p>
            <div className={styles.pillars}>
              <Pillar icon={<RefreshCw size={17} />} label="Taxatie" value="Zelfde dag" />
              <Pillar icon={<TrendingUp size={17} />} label="Waardering" value="Marktconform" />
              <Pillar icon={<Hand size={17} />} label="Verrekening" value="Direct" />
              <Pillar icon={<FileText size={17} />} label="Papierwerk" value="Wij regelen het" />
            </div>
            <div className={styles.showroomCtas} style={{ marginTop: 28 }}>
              <a href="mailto:inkoop@vdso.nl" className="btn-primary">
                Bied uw auto aan <ArrowRight size={13} />
              </a>
              <a href="mailto:inkoop@vdso.nl" className="btn-secondary">inkoop@vdso.nl</a>
            </div>
          </div>
          <div className={styles.featureVisual} style={{ backgroundImage: `linear-gradient(to bottom, rgba(5,6,8,0.25) 0%, rgba(5,6,8,0.65) 100%), url('/uploads/extra-optie-foto-2.jpg')` }}>
            <div className={`${styles.featureCallout} ${styles.featureCalloutTop}`}>
              <p className={styles.featureCalloutLabel}>Taxatie</p>
              <p className={`${styles.featureCalloutValue} ${styles.featureCalloutValueSm}`}>Zelfde dag.<br />Eerlijk geprijsd.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINANCIERING ──────────────────────────────── */}
      <section id="financiering" className={styles.feature}>
        <div className={styles.featureLayout}>
          <div className={`${styles.featureVisual} ${styles.featureVisualFinance}`}>
            <div className={styles.financeWidget}>
              <p className={styles.financeLabel}>Maandbedrag vanaf</p>
              <p className={styles.financeAmount}>€ 489<span className={styles.financeUnit}>/mnd</span></p>
              <div className={styles.financeRows}>
                <div className={styles.financeRow}>
                  <span className={styles.financeKey}>Looptijd</span>
                  <span className={styles.financeVal}>60 mnd</span>
                </div>
                <div className={styles.financeRow}>
                  <span className={styles.financeKey}>Rente</span>
                  <span className={styles.financeVal}>4,9%</span>
                </div>
                <div className={styles.financeRow}>
                  <span className={styles.financeKey}>Aanbetaling</span>
                  <span className={styles.financeVal}>€ 0</span>
                </div>
                <div className={styles.financeRow}>
                  <span className={styles.financeKey}>Offerte</span>
                  <span className={styles.financeValBlue}>Binnen 24 uur</span>
                </div>
              </div>
              <p className={styles.financeDisclaimer}>Indicatief · Op basis van Mercedes GLE 580 · €94.500</p>
            </div>
          </div>
          <div>
            <p className="section-label">Financiering</p>
            <h2 className="section-title">Flexibel rijden.<br />Uw keuze.</h2>
            <p className="section-body">Private lease, financial lease of directe aankoop: wij bieden alle opties. Samen met onze financieringspartners vinden wij de constructie die past bij uw situatie.</p>
            <div className={styles.pillars}>
              <Pillar icon={<Car size={17} />} label="Private Lease" value="Alles inbegrepen" />
              <Pillar icon={<Briefcase size={17} />} label="Financial Lease" value="Fiscaal voordelig" />
              <Pillar icon={<Percent size={17} />} label="Rente" value="Scherp tarief" />
              <Pillar icon={<Calculator size={17} />} label="Offerte" value="Binnen 24 uur" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONSIGNATIE ───────────────────────────────── */}
      <section id="consignatie" className={`${styles.feature} ${styles.featureAlt}`}>
        <div className={styles.featureLayout}>
          <div>
            <p className="section-label">Consignatie</p>
            <h2 className="section-title">Wij verkopen<br />uw auto.</h2>
            <p className="section-body">Wilt u uw premium occasion verkopen zonder gedoe? VDSO verzorgt de volledige verkoop in uw opdracht, van professionele fotografie en presentatie tot bezichtigingen en overdracht.</p>
            <div className={styles.pillars}>
              <Pillar icon={<Camera size={17} />} label="Fotografie" value="Professioneel" />
              <Pillar icon={<Users size={17} />} label="Bezichtigingen" value="Wij regelen het" />
              <Pillar icon={<TrendingUp size={17} />} label="Prijsstrategie" value="Maximale opbrengst" />
              <Pillar icon={<Hand size={17} />} label="Overdracht" value="Volledig verzorgd" />
            </div>
          </div>
          <div className={styles.featureVisual} style={{ backgroundImage: `linear-gradient(to bottom, rgba(5,6,8,0.25) 0%, rgba(5,6,8,0.65) 100%), url('/uploads/consignatie-image.jpg')` }}>
            <div className={`${styles.featureCallout} ${styles.featureCalloutTop}`}>
              <p className={styles.featureCalloutLabel}>Consignatie</p>
              <p className={`${styles.featureCalloutValue} ${styles.featureCalloutValueSm}`}>Zorgeloos.<br />Vakkundig.<br />Maximaal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OP AFSPRAAK ───────────────────────────────── */}
      <section id="op-afspraak" className={styles.feature}>
        <div className={styles.featureLayout}>
          <div className={styles.showroomImg}>
            <Image src="/uploads/pand-vdso-afbeelding.jpg" alt="VDSO" fill style={{ objectFit: 'cover', filter: 'grayscale(15%) brightness(0.88)' }} />
            <div className={styles.showroomImgOverlay} />
          </div>
          <div>
            <p className="section-label">Op afspraak</p>
            <h2 className="section-title">Maak kennis<br />in persoon.</h2>
            <p className="section-body">Wij ontvangen u uitsluitend op afspraak. Plan een proefrit, bespreek uw configuratie of maak kennis met het VDSO-team.</p>
            <div className={styles.showroomDetails}>
              <ShowroomDetail icon={<MapPin size={15} />} label="Adres" value="VDSO — Deurne" />
              <ShowroomDetail icon={<Clock size={15} />} label="Openingstijden" value="Uitsluitend op afspraak" />
              <ShowroomDetail icon={<Phone size={15} />} label="Contact" value="+31 6 22580038 · info@vdso.nl" />
            </div>
            <div className={styles.showroomCtas}>
              <button className="btn-primary" onClick={() => setModalOpen(true)}>
                Plan een proefrit <ArrowRight size={13} />
              </button>
              <a href="mailto:info@vdso.nl" className="btn-secondary">Contact</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Link href="/">
                <Image src="/uploads/logo-concept-navigatie.png" alt="VDSO" width={80} height={24} />
              </Link>
              <p className={styles.footerTagline}>Precision. Performance. Minimalist Luxury.</p>
            </div>
            <div className={styles.footerCols}>
              <div>
                <p className={styles.footerColTitle}>Aanbod</p>
                <ul className={styles.footerLinks}>
                  <li><Link href="/aanbod">Alle occasions</Link></li>
                  <li><Link href="/aanbod">Mercedes</Link></li>
                  <li><Link href="/aanbod">BMW M-series</Link></li>
                  <li><Link href="/aanbod">Porsche</Link></li>
                </ul>
              </div>
              <div>
                <p className={styles.footerColTitle}>Services</p>
                <ul className={styles.footerLinks}>
                  <li><a href="#inkoop">Inkoop &amp; taxatie</a></li>
                  <li><a href="#financiering">Financiering</a></li>
                  <li><a href="#consignatie">Consignatie</a></li>
                  <li><a href="#op-afspraak">Proefrit plannen</a></li>
                </ul>
              </div>
              <div>
                <p className={styles.footerColTitle}>Informatie</p>
                <ul className={styles.footerLinks}>
                  <li><a href="#">Garantie</a></li>
                  <li><a href="#">RDW erkenning</a></li>
                  <li><a href="#">Veelgestelde vragen</a></li>
                  <li><a href="#">Nieuws</a></li>
                </ul>
              </div>
              <div>
                <p className={styles.footerColTitle}>Over VDSO</p>
                <ul className={styles.footerLinks}>
                  <li><a href="#">Ons verhaal</a></li>
                  <li><a href="#">Carrière</a></li>
                  <li><a href="#">Pers</a></li>
                  <li><a href="#op-afspraak">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p className={styles.footerLegal}>
              © 2026 VDSO · <a href="#">Privacybeleid</a> · <a href="#">Voorwaarden</a> · <a href="#">Cookies</a>
            </p>
            <p className={`${styles.footerLegal} ${styles.footerLegalRight}`}>
              Alle vermelde specificaties zijn indicatief. Bevestig via uw VDSO-adviseur.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

/* ── Sub-components ──────────────────────────────────── */
function Pillar({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className={styles.pillar}>
      <div className={styles.pillarIcon}>{icon}</div>
      <p className={styles.pillarLabel}>{label}</p>
      <p className={styles.pillarValue}>{value}</p>
    </div>
  )
}

function ShowroomDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className={styles.showroomDetail}>
      <div className={styles.showroomDetailIcon}>{icon}</div>
      <div>
        <p className={styles.showroomDetailLabel}>{label}</p>
        <p className={styles.showroomDetailValue}>{value}</p>
      </div>
    </div>
  )
}
