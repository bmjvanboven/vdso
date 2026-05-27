'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, ArrowRight, Menu, X } from 'lucide-react'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { href: '/#aanbod',      label: 'Aanbod' },
  { href: '/#occasions',   label: 'Occasions' },
  { href: '/#inruil',      label: 'Inruil' },
  { href: '/#consignatie', label: 'Consignatie' },
  { href: '/#showroom',    label: 'Showroom' },
]

export default function Nav({ onProefrit }: { onProefrit?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Scroll lock wanneer menu open is
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function close() { setMenuOpen(false) }

  function handleProefrit() {
    close()
    onProefrit?.()
  }

  return (
    <>
      <nav className={styles.nav} id="nav">
        <Link href="/" className={styles.logo} onClick={close}>
          <Image src="/uploads/logo-concept-navigatie.png" alt="VDSO" height={28} width={100} priority />
        </Link>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className={styles.actions}>
          <a href="tel:+31200000000" className={styles.phone}>
            <Phone size={13} /> 020 000 00 00
          </a>
          <button className="btn-primary" onClick={onProefrit}>
            Plan proefrit <ArrowRight size={13} />
          </button>
        </div>

        {/* Mobile: hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={styles.mobileLink} onClick={close}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileActions}>
            <a href="tel:+31200000000" className={styles.mobilePhone} onClick={close}>
              <Phone size={15} /> 020 000 00 00
            </a>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} onClick={handleProefrit}>
              Plan proefrit <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
