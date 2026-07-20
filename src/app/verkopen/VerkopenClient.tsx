'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft, ArrowRight, Phone, Mail,
  MessageSquare, ClipboardCheck, Handshake, BadgeCheck,
  Clock, ShieldCheck, Hand, FileText,
} from 'lucide-react'
import Nav from '@/components/Nav'
import ProefritModal from '@/components/ProefritModal'
import styles from './verkopen.module.css'

const STEPS = [
  { icon: <MessageSquare size={18} />, label: 'Neem contact op', body: 'Bel of mail ons de gegevens van uw auto: merk, model, bouwjaar en kilometerstand.' },
  { icon: <ClipboardCheck size={18} />, label: 'Persoonlijke taxatie', body: 'Wij beoordelen uw auto en doen binnen 24 uur een eerlijk, vrijblijvend bod.' },
  { icon: <Handshake size={18} />, label: 'Akkoord', body: 'Geen onderhandelingen achteraf. De prijs die we noemen, is de prijs die u krijgt.' },
  { icon: <BadgeCheck size={18} />, label: 'Direct geregeld', body: 'Betaling en overdracht regelen we vaak dezelfde week, inclusief alle administratie.' },
]

export default function VerkopenClient({ phone }: { phone: string }) {
  const [modalOpen, setModalOpen] = useState(false)
  const telHref = `tel:${phone.replace(/\s/g, '')}`

  return (
    <>
      <Nav onProefrit={() => setModalOpen(true)} />
      <ProefritModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── HEADER ───────────────────────────────────── */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>VDSO · Verkoop uw auto</p>
        <h1 className={styles.title}>Verkoop uw auto aan VDSO.</h1>
        <p className={styles.sub}>
          Geen advertentie, geen kijkdagen, geen onderhandelen met vreemden. Wij nemen uw auto
          rechtstreeks over — snel, eerlijk en zonder gedoe.
        </p>
        <div className={styles.headerCtas}>
          <a href="mailto:inkoop@vdso.nl" className="btn-primary btn-primary--lg">
            Bied uw auto aan <ArrowRight size={14} />
          </a>
          <a href={telHref} className="btn-secondary btn-secondary--lg">
            <Phone size={14} /> {phone}
          </a>
        </div>
      </div>

      {/* ── ZO WERKT HET ─────────────────────────────── */}
      <section className={styles.stepsSection}>
        <div className={styles.stepsInner}>
          <p className="section-label">Zo werkt het</p>
          <h2 className="section-title">Van eerste contact<br />tot overdracht.</h2>
          <div className={styles.stepsGrid}>
            {STEPS.map((s, i) => (
              <div key={s.label} className={styles.step}>
                <div className={styles.stepTop}>
                  <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.stepIcon}>{s.icon}</div>
                </div>
                <p className={styles.stepLabel}>{s.label}</p>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAAROM VDSO ──────────────────────────────── */}
      <section className={styles.feature}>
        <div className={styles.featureLayout}>
          <div className={styles.featureVisual} style={{ backgroundImage: `linear-gradient(to bottom, rgba(5,6,8,0.25) 0%, rgba(5,6,8,0.65) 100%), url('/uploads/extra-optie-foto-2.jpg')` }} />
          <div>
            <p className="section-label">Waarom VDSO</p>
            <h2 className="section-title">Zekerheid,<br />zonder gedoe.</h2>
            <p className="section-body">
              Als erkend autobedrijf kopen wij rechtstreeks in, zonder tussenpersonen. Dat betekent
              een eerlijk bod, snelle afhandeling en geen verrassingen achteraf.
            </p>
            <div className={styles.pillars}>
              <Pillar icon={<Clock size={17} />} label="Reactietijd" value="Binnen 24 uur" />
              <Pillar icon={<ShieldCheck size={17} />} label="Zekerheid" value="Vaste prijs" />
              <Pillar icon={<Hand size={17} />} label="Betaling" value="Direct" />
              <Pillar icon={<FileText size={17} />} label="Administratie" value="Wij regelen het" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SLUITENDE CTA ────────────────────────────── */}
      <section className={styles.closingCta}>
        <p className="section-label">Klaar om te verkopen?</p>
        <h2 className={styles.closingTitle}>Bied uw auto vandaag nog aan.</h2>
        <div className={styles.closingCtas}>
          <a href="mailto:inkoop@vdso.nl" className="btn-primary btn-primary--lg">
            <Mail size={14} /> inkoop@vdso.nl
          </a>
          <a href={telHref} className="btn-secondary btn-secondary--lg">
            <Phone size={14} /> {phone}
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className={styles.footer}>
        <Link href="/" className={styles.back}><ArrowLeft size={12} /> Terug naar home</Link>
        <Image src="/uploads/logo-vdso-webversie-klein.png" alt="VDSO" width={80} height={15} style={{ opacity: 0.5 }} />
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
