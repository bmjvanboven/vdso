'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import styles from './Nav.module.css'

export default function Nav({ onProefrit }: { onProefrit?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className={styles.nav} id="nav">
      <Link href="/" className={styles.logo}>
        <Image src="/uploads/logo-concept-navigatie.png" alt="VDSO" height={28} width={100} priority />
      </Link>
      <ul className={styles.links}>
        {[
          { href: '/#aanbod', label: 'Aanbod' },
          { href: '/#occasions', label: 'Occasions' },
          { href: '/#inruil', label: 'Inruil' },
          { href: '/#consignatie', label: 'Consignatie' },
          { href: '/#showroom', label: 'Showroom' },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={pathname === href ? styles.active : ''}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <a href="tel:+31200000000" className={styles.phone}>
          <Phone size={13} />
          020 000 00 00
        </a>
        <button className="btn-primary" onClick={onProefrit}>
          Plan proefrit <ArrowRight size={13} />
        </button>
      </div>
    </nav>
  )
}
