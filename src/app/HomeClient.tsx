'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShieldCheck, MapPin, ArrowRight,
  ClipboardCheck, History, Award,
  RefreshCw, TrendingUp, FileText,
  Camera, Users, Hand,
  Phone, Clock, Building2,
} from 'lucide-react'
import Nav from '@/components/Nav'
import ProefritModal from '@/components/ProefritModal'
import PreviewGate from '@/components/PreviewGate'
import type { Car as CarType } from '@/lib/supabase/types'
import styles from './HomeClient.module.css'

export default function HomeClient({ cars, showGate, totalPk }: { cars: CarType[]; showGate: boolean; totalPk: number }) {
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
            <p className={styles.specLabel}>Vermogen</p>
            <p className={styles.specValue}>{totalPk}</p>
            <p className={styles.specSub}>Pk op voorraad</p>
          </div>
          <div className={styles.specItem}>
            <p className={styles.specLabel}>Passie</p>
            <p className={styles.specValue}>100<span className={styles.specUnit}>%</span></p>
            <p className={styles.specSub}>Voor performance auto&apos;s</p>
          </div>
          <div className={styles.specItem}>
            <p className={styles.specLabel}>Gecertificeerd</p>
            <p className={styles.specValue}>RDW</p>
            <p className={styles.specSub}>Erkend autobedrijf</p>
          </div>
        </div>
      </div>

      {/* ── OCCASIONS (samengevoegd met voormalig "Aanbod"-blok) ──── */}
      <section id="occasions" className={`${styles.feature}`}>
        <div className={styles.featureLayout}>
          <div className={styles.featureVisual} style={{ backgroundImage: `linear-gradient(to bottom, rgba(5,6,8,0.25) 0%, rgba(5,6,8,0.65) 100%), url('/uploads/sectie-occassions.jpg')` }}>
          </div>
          <div>
            <p className="section-label">Curated selectie</p>
            <h2 className="section-title">Alleen de beste.<br />Altijd.</h2>
            <p className="section-body">Elk voertuig doorloopt een uitgebreide inspectie. Rijhistorie, technische staat en interieur-conditie worden persoonlijk beoordeeld voor opname in ons bestand.</p>
            <div className={styles.pillars}>
              <Pillar icon={<ClipboardCheck size={17} />} label="Inspectie" value="Grondige meerpuntscheck" />
              <Pillar icon={<History size={17} />} label="Rijhistorie" value="Geverifieerd" />
              <Pillar icon={<Award size={17} />} label="Certificering" value="RDW erkend" />
              <Pillar icon={<FileText size={17} />} label="Documentatie" value="Volledig transparant" />
            </div>
            <div className={styles.showroomCtas} style={{ marginTop: 28 }}>
              <Link href="/aanbod" className="btn-primary">
                Bekijk aanbod <ArrowRight size={13} />
              </Link>
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

      {/* ── AUTO VERKOPEN ─────────────────────────────── */}
      <section id="verkoop-auto" className={styles.feature}>
        <div className={styles.featureLayout}>
          <div className={`${styles.featureVisual} ${styles.featureVisualFinance}`}>
            <div className={styles.financeWidget}>
              <p className={styles.financeLabel}>Reactie op uw aanbod</p>
              <p className={styles.financeAmount}>24<span className={styles.financeUnit}> uur</span></p>
              <div className={styles.financeRows}>
                <div className={styles.financeRow}>
                  <span className={styles.financeKey}>Advertentiekosten</span>
                  <span className={styles.financeVal}>€ 0</span>
                </div>
                <div className={styles.financeRow}>
                  <span className={styles.financeKey}>Onderhandelen</span>
                  <span className={styles.financeVal}>Niet nodig</span>
                </div>
                <div className={styles.financeRow}>
                  <span className={styles.financeKey}>Overname</span>
                  <span className={styles.financeVal}>Bij u thuis mogelijk</span>
                </div>
                <div className={styles.financeRow}>
                  <span className={styles.financeKey}>Betaling</span>
                  <span className={styles.financeValBlue}>Direct</span>
                </div>
              </div>
              <p className={styles.financeDisclaimer}>Vrijblijvend · Geen verplichtingen</p>
            </div>
          </div>
          <div>
            <p className="section-label">Auto verkopen</p>
            <h2 className="section-title">Geen advertentie.<br />Geen gedoe.</h2>
            <p className="section-body">Geen foto&apos;s maken, geen kijkdagen plannen, geen onderhandelen met vreemden. Bied uw auto rechtstreeks aan bij VDSO en ontvang snel een eerlijk, vrijblijvend bod.</p>
            <div className={styles.pillars}>
              <Pillar icon={<Clock size={17} />} label="Reactietijd" value="Binnen 24 uur" />
              <Pillar icon={<ShieldCheck size={17} />} label="Zekerheid" value="Vaste prijs" />
              <Pillar icon={<Hand size={17} />} label="Betaling" value="Direct" />
              <Pillar icon={<FileText size={17} />} label="Administratie" value="Wij regelen het" />
            </div>
            <div className={styles.showroomCtas} style={{ marginTop: 28 }}>
              <a href="mailto:inkoop@vdso.nl" className="btn-primary">
                Bied uw auto aan <ArrowRight size={13} />
              </a>
              <a href="mailto:inkoop@vdso.nl" className="btn-secondary">inkoop@vdso.nl</a>
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
        <div className={`${styles.featureLayout} ${styles.featureLayoutTight}`}>
          <div className={styles.showroomImg}>
            <Image src="/uploads/pand-vdso-afbeelding.jpg" alt="VDSO" fill style={{ objectFit: 'cover', filter: 'grayscale(15%) brightness(0.88)' }} />
            <div className={styles.showroomImgOverlay} />
          </div>
          <div>
            <p className="section-label">Op afspraak</p>
            <h2 className="section-title">Maak kennis<br />in persoon.</h2>
            <p className="section-body">Mijn naam is Stijn, 32 jaar, en auto&apos;s vormen al mijn hele leven een passie. Ik ben opgegroeid in een automotive gezin. Opgeleid aan de IVA en afgestudeerd met een International Sales Bachelor in de Verenigde Staten, heb ik een sterke combinatie van vakkennis en commerciële ervaring opgebouwd.</p>
            <p className="section-body">Na jarenlang werkzaam te zijn geweest in diverse sales- en accountmanagementfuncties, heb ik besloten mijn passie te volgen. Vandaag de dag richt ik mij volledig op het aanbieden van zorgvuldig geselecteerde, luxe occasions. Betrouwbaarheid, kwaliteit en persoonlijk contact staan daarbij altijd centraal.</p>
            <div className={styles.showroomCtas}>
              <button className="btn-primary" onClick={() => setModalOpen(true)}>
                Plan een proefrit <ArrowRight size={13} />
              </button>
              <a href="mailto:info@vdso.nl" className="btn-secondary">Contact</a>
            </div>
            <p className={`section-body ${styles.showroomNote}`}>Wij ontvangen u uitsluitend op afspraak. Plan een proefrit, bespreek uw configuratie of maak kennis met het VDSO-team.</p>
          </div>
        </div>
        <div className={styles.showroomDetailsOuter}>
          <div className={styles.showroomDetails}>
            <ShowroomDetail icon={<MapPin size={16} />} label="Adres" value="Wiegershof 9, 5751 XJ Deurne" />
            <ShowroomDetail icon={<Clock size={16} />} label="Openingstijden" value="Uitsluitend op afspraak" />
            <ShowroomDetail icon={<Phone size={16} />} label="Contact" value="+31 6 22580038 · info@vdso.nl" />
            <ShowroomDetail icon={<Building2 size={16} />} label="KvK" value="42015299" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <Link href="/">
                <Image src="/uploads/logo-vdso-web.png" alt="VDSO" width={80} height={15} />
              </Link>
              <p className={styles.footerTagline}>Precision. Performance. Minimalist Luxury.</p>
            </div>
            <div className={styles.footerCols}>
              <div>
                <p className={styles.footerColTitle}>Aanbod</p>
                <ul className={styles.footerLinks}>
                  <li><Link href="/aanbod">Alle occasions</Link></li>
                  <li><Link href="/diensten">Diensten</Link></li>
                </ul>
              </div>
              <div>
                <p className={styles.footerColTitle}>Services</p>
                <ul className={styles.footerLinks}>
                  <li><a href="#inkoop">Inkoop &amp; taxatie</a></li>
                  <li><a href="#verkoop-auto">Auto verkopen</a></li>
                  <li><a href="#consignatie">Consignatie</a></li>
                  <li><a href="#op-afspraak">Proefrit plannen</a></li>
                </ul>
              </div>
              <div>
                <p className={styles.footerColTitle}>Over VDSO</p>
                <ul className={styles.footerLinks}>
                  <li><a href="#op-afspraak">Ons verhaal</a></li>
                  <li><a href="#occasions">RDW erkenning</a></li>
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
