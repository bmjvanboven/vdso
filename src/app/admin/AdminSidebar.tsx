'use client'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import styles from './admin.module.css'

const NAV = [
  { href: '/admin', label: "Auto's" },
  { href: '/admin/briefpapier', label: 'Briefpapier' },
  { href: '/admin/factuur', label: 'Factuur' },
  { href: '/admin/visitekaartje', label: 'Visitekaartje' },
  { href: '/admin/huisstijl', label: 'Logo & Huisstijl' },
]

export default function AdminSidebar({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  async function logout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className={styles.sidebar}>
      <Image src="/uploads/logo-vdso-web.png" alt="VDSO" width={80} height={15} className={styles.sidebarLogo} />
      <nav className={styles.sidebarNav}>
        {NAV.map(item => (
          <Link key={item.href} href={item.href} className={`${styles.navItem} ${pathname === item.href ? styles.navActive : ''}`}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.sidebarFooter}>
        {children}
        <button className={styles.logoutBtn} onClick={logout}>
          <LogOut size={14} /> Uitloggen
        </button>
      </div>
    </aside>
  )
}
