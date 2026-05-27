'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, LogOut, Eye, EyeOff, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Car, Settings, BadgeStatus } from '@/lib/supabase/types'
import { BADGE_LABELS } from '@/lib/supabase/types'
import CarFormModal from './CarFormModal'
import styles from './admin.module.css'

export default function AdminDashboard({ cars: initialCars, settings }: { cars: Car[]; settings: Settings | null }) {
  const [cars, setCars] = useState(initialCars)
  const [previewMode, setPreviewMode] = useState(settings?.preview_mode ?? false)
  const [formOpen, setFormOpen] = useState(false)
  const [editCar, setEditCar] = useState<Car | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function logout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  async function togglePreview() {
    const next = !previewMode
    setPreviewMode(next)
    await supabase.from('settings').update({ preview_mode: next }).eq('id', 1)
  }

  async function toggleVisible(car: Car) {
    const next = !car.is_visible
    await supabase.from('cars').update({ is_visible: next }).eq('id', car.id)
    setCars(cars.map(c => c.id === car.id ? { ...c, is_visible: next } : c))
  }

  async function setBadge(car: Car, status: BadgeStatus) {
    await supabase.from('cars').update({ badge_status: status }).eq('id', car.id)
    setCars(cars.map(c => c.id === car.id ? { ...c, badge_status: status } : c))
  }

  async function deleteCar(id: string) {
    if (!confirm('Auto verwijderen?')) return
    await supabase.from('cars').delete().eq('id', id)
    setCars(cars.filter(c => c.id !== id))
  }

  function openNew() { setEditCar(null); setFormOpen(true) }
  function openEdit(car: Car) { setEditCar(car); setFormOpen(true) }

  function onSaved(car: Car, isNew: boolean) {
    setCars(isNew ? [car, ...cars] : cars.map(c => c.id === car.id ? car : c))
    setFormOpen(false)
  }

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <Image src="/uploads/logo-concept-navigatie.png" alt="VDSO" width={80} height={24} className={styles.sidebarLogo} />
        <nav className={styles.sidebarNav}>
          <span className={styles.navItem + ' ' + styles.navActive}>Auto&apos;s</span>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.previewToggle} onClick={togglePreview}>
            {previewMode ? <EyeOff size={14} /> : <Eye size={14} />}
            Preview {previewMode ? 'aan' : 'uit'}
            {previewMode ? <ToggleRight size={16} style={{ color: 'var(--vdso-blue)' }} /> : <ToggleLeft size={16} />}
          </button>
          <button className={styles.logoutBtn} onClick={logout}>
            <LogOut size={14} /> Uitloggen
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Auto&apos;s</h1>
            <p className={styles.pageCount}>{cars.length} voertuigen</p>
          </div>
          <button className="btn-primary" onClick={openNew}>
            <Plus size={14} /> Auto toevoegen
          </button>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Voertuig</span>
            <span>Status</span>
            <span>Prijs</span>
            <span>Zichtbaar</span>
            <span></span>
          </div>
          {cars.map(car => (
            <div key={car.id} className={`${styles.tableRow} ${!car.is_visible ? styles.rowHidden : ''}`}>
              <div className={styles.carInfo}>
                {car.fotos?.[0] ? (
                  <Image src={car.fotos[0]} alt="" width={56} height={42} className={styles.thumb} />
                ) : (
                  <div className={styles.thumbPlaceholder} />
                )}
                <div>
                  <p className={styles.carName}>{car.merk} {car.model}</p>
                  <p className={styles.carMeta}>{car.jaar} · {car.pk} pk · {car.kmstand.toLocaleString('nl')} km</p>
                </div>
              </div>
              <select
                className={styles.badgeSelect}
                value={car.badge_status}
                onChange={e => setBadge(car, e.target.value as BadgeStatus)}
              >
                {(Object.keys(BADGE_LABELS) as BadgeStatus[]).map(k => (
                  <option key={k} value={k}>{BADGE_LABELS[k]}</option>
                ))}
              </select>
              <p className={styles.price}>€{car.prijs.toLocaleString('nl')}</p>
              <button className={styles.visibleBtn} onClick={() => toggleVisible(car)} title={car.is_visible ? 'Verbergen' : 'Zichtbaar maken'}>
                {car.is_visible ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
              <div className={styles.rowActions}>
                <button className={styles.iconBtn} onClick={() => openEdit(car)} title="Bewerken"><Pencil size={14} /></button>
                <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={() => deleteCar(car.id)} title="Verwijderen"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {formOpen && (
        <CarFormModal
          car={editCar}
          onClose={() => setFormOpen(false)}
          onSaved={onSaved}
        />
      )}
    </div>
  )
}
