'use client'
import { useEffect, useRef, useState } from 'react'
import { X, ArrowRight, Check } from 'lucide-react'
import type { Car } from '@/lib/supabase/types'
import styles from './ProefritModal.module.css'

interface Props {
  isOpen: boolean
  onClose: () => void
  cars?: Car[]
  preselect?: string
}

export default function ProefritModal({ isOpen, onClose, cars = [], preselect }: Props) {
  const [success, setSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 320)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    await fetch('/api/proefrit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(fd)),
    })
    setSuccess(true)
    setTimeout(() => { onClose(); setTimeout(() => setSuccess(false), 400) }, 3000)
  }

  return (
    <div
      className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Sluiten">
          <X size={14} />
        </button>

        {!success ? (
          <>
            <p className={styles.eyebrow}>VDSO · Deurne</p>
            <h2 className={styles.title}>Plan een proefrit.</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pf-naam">Naam</label>
                  <input ref={inputRef} className={styles.input} id="pf-naam" name="naam" type="text" placeholder="Uw naam" required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pf-tel">Telefoon</label>
                  <input className={styles.input} id="pf-tel" name="telefoon" type="tel" placeholder="+31 6 …" required />
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="pf-auto">Interesse in</label>
                <select className={styles.select} id="pf-auto" name="auto" defaultValue={preselect ?? ''}>
                  <option value="">Kies een voertuig…</option>
                  {cars.map(c => (
                    <option key={c.id} value={`${c.merk} ${c.model}`}>
                      {c.merk} {c.model} ({c.jaar}) — €{c.prijs.toLocaleString('nl')}
                    </option>
                  ))}
                  <option value="Nog niet zeker">Nog niet zeker</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="pf-datum">Gewenste datum</label>
                <input className={styles.input} id="pf-datum" name="datum" type="date" />
              </div>
              <button type="submit" className={`btn-primary ${styles.submit}`}>
                Verstuur aanvraag <ArrowRight size={13} />
              </button>
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <div className={styles.successIcon}><Check size={22} /></div>
            <p className={styles.successTitle}>Aanvraag ontvangen.</p>
            <p className={styles.successBody}>Wij nemen binnen één werkdag contact met u op om de proefrit in te plannen.</p>
          </div>
        )}
      </div>
    </div>
  )
}
