'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft, ArrowRight,
  RefreshCw, TrendingUp, Hand, FileText,
  Clock, ShieldCheck, Camera, Users,
} from 'lucide-react'
import Nav from '@/components/Nav'
import ProefritModal from '@/components/ProefritModal'
import styles from './diensten.module.css'

export default function DienstenClient() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Nav onProefrit={() => setModalOpen(true)} />
      <ProefritModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── HEADER ───────────────────────────────────── */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>VDSO · Diensten</p>
        <h1 className={styles.title}>Onze diensten.</h1>
        <p className={styles.sub}>
          Of u nu een auto zoekt, verkoopt of laat verkopen — VDSO regelt het persoonlijk,
          zonder tussenpersonen en zonder gedoe.
        </p>
      </div>

      {/* ── INKOOP ────────────────────────────────────── */}
      <section id="inkoop" className={styles.feature}>
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
            <div className={styles.showroomCtas}>
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
      <section id="verkoop-auto" className={styles.featureAlt}>
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
            <div className={styles.showroomCtas}>
              <a href="mailto:inkoop@vdso.nl" className="btn-primary">
                Bied uw auto aan <ArrowRight size={13} />
              </a>
              <a href="mailto:inkoop@vdso.nl" className="btn-secondary">inkoop@vdso.nl</a>
            </div>
            <Link href="/verkopen" className={styles.moreLink}>
              Meer over het verkoopproces <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONSIGNATIE ───────────────────────────────── */}
      <section id="consignatie" className={styles.feature}>
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
            <div className={styles.showroomCtas}>
              <a href="mailto:info@vdso.nl" className="btn-primary">
                Meer informatie <ArrowRight size={13} />
              </a>
              <a href="mailto:info@vdso.nl" className="btn-secondary">info@vdso.nl</a>
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

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className={styles.footer}>
        <Link href="/" className={styles.back}><ArrowLeft size={12} /> Terug naar home</Link>
        <Image src="/uploads/logo-vdso-web.png" alt="VDSO" width={80} height={15} style={{ opacity: 0.5 }} />
        <p className={styles.legal}>© 2026 VDSO B.V. · RDW erkend</p>
      </footer>
    </>
  )
}

function Pillar({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className={styles.pillar}>
      <div className={styles.pillarIcon}>{icon}</div>
      <p className={styles.pillarLabel}>{label}</p>
      <p className={styles.pillarValue}>{value}</p>
    </div>
  )
}
