'use client'
import { useState, useRef } from 'react'
import { X, Upload, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import type { Car, BadgeStatus } from '@/lib/supabase/types'
import { BADGE_LABELS } from '@/lib/supabase/types'
import SpecsEditor from './SpecsEditor'
import styles from './carFormModal.module.css'

interface Props {
  car: Car | null
  newSortOrder: number
  onClose: () => void
  onSaved: (car: Car, isNew: boolean) => void
}

type FormState = Omit<Car, 'id' | 'created_at' | 'sort_order' | 'jaar' | 'pk' | 'kmstand' | 'prijs'> & {
  jaar: number | ''
  pk: number | ''
  kmstand: number | ''
  prijs: number | ''
}

const EMPTY: FormState = {
  merk: '', model: '', jaar: new Date().getFullYear(), pk: 0,
  kmstand: 0, prijs: 0, badge_status: 'net_binnen',
  fotos: [], omschrijving: null, specs: null, is_visible: true,
}

const MAX_UPLOAD_MB = 20
const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024
const MAX_DIMENSION = 1920
const JPEG_QUALITY = 0.82

// Resize + hercomprimeer foto's client-side vóór upload, zodat grote camera/telefoonfoto's
// (vaak 5-15MB) niet ongewijzigd de storage in gaan.
async function compressImage(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
    const w = Math.round(bitmap.width * scale)
    const h = Math.round(bitmap.height * scale)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return file
    ctx.drawImage(bitmap, 0, 0, w, h)
    const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY))
    if (!blob || blob.size >= file.size) return file
    return new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' })
  } catch {
    return file
  }
}


export default function CarFormModal({ car, newSortOrder, onClose, onSaved }: Props) {
  const isNew = !car
  const [form, setForm] = useState<FormState>(isNew ? EMPTY : {
    merk: car.merk, model: car.model, jaar: car.jaar, pk: car.pk,
    kmstand: car.kmstand, prijs: car.prijs, badge_status: car.badge_status,
    fotos: car.fotos ?? [], omschrijving: car.omschrijving,
    specs: car.specs ?? null, is_visible: car.is_visible,
  })
  const [specsValue, setSpecsValue] = useState<Car['specs']>(() => isNew ? null : (car?.specs ?? null))
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  function set<K extends keyof typeof form>(key: K, val: (typeof form)[K]) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function uploadPhoto(file: File) {
    setUploading(true)
    if (file.size > MAX_UPLOAD_BYTES) {
      setError(`Foto te groot (max ${MAX_UPLOAD_MB}MB): ${file.name}`)
      setUploading(false)
      return
    }
    const toUpload = await compressImage(file)
    const ext = toUpload.name.split('.').pop()
    const path = `cars/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error: upErr } = await supabase.storage.from('car-photos').upload(path, toUpload)
    if (upErr) { setError('Upload mislukt: ' + upErr.message); setUploading(false); return }
    const { data } = supabase.storage.from('car-photos').getPublicUrl(path)
    set('fotos', [...form.fotos, data.publicUrl])
    setUploading(false)
  }

  function removePhoto(url: string) {
    set('fotos', form.fotos.filter(f => f !== url))
  }

  function handleDragOver(e: React.DragEvent, i: number) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === i) return
    const next = [...form.fotos]
    const [moved] = next.splice(dragIndex, 1)
    next.splice(i, 0, moved)
    setDragIndex(i)
    set('fotos', next)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setError('')
    const payload = {
      merk: form.merk.trim(), model: form.model.trim(),
      jaar: Number(form.jaar) || 0, pk: Number(form.pk) || 0,
      kmstand: Number(form.kmstand) || 0, prijs: Number(form.prijs) || 0,
      badge_status: form.badge_status, fotos: form.fotos,
      omschrijving: form.omschrijving || null,
      specs: specsValue,
      is_visible: form.is_visible,
      sort_order: isNew ? newSortOrder : car!.sort_order,
    }
    if (isNew) {
      const { data, error: err } = await supabase.from('cars').insert(payload).select().single()
      if (err || !data) { setError(err?.message ?? 'Onbekende fout'); setSaving(false); return }
      onSaved(data as Car, true)
    } else {
      const { data, error: err } = await supabase.from('cars').update(payload).eq('id', car.id).select().single()
      if (err || !data) { setError(err?.message ?? 'Onbekende fout'); setSaving(false); return }
      onSaved(data as Car, false)
    }
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{isNew ? 'Auto toevoegen' : 'Auto bewerken'}</h2>
          <button className={styles.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Fotos */}
          <div className={styles.section}>
            <p className={styles.sectionLabel}>
              Foto&apos;s{form.fotos.length > 1 && <span className={styles.labelHint}> — sleep om volgorde te wijzigen, eerste foto is de hoofdfoto</span>}
              <span className={styles.labelHint}> · wordt automatisch gecomprimeerd, max {MAX_UPLOAD_MB}MB per foto</span>
            </p>
            <div className={styles.photoGrid}>
              {form.fotos.map((url, i) => (
                <div
                  key={url}
                  className={`${styles.photoThumb} ${dragIndex === i ? styles.photoThumbDragging : ''}`}
                  draggable
                  onDragStart={() => setDragIndex(i)}
                  onDragOver={e => handleDragOver(e, i)}
                  onDragEnd={() => setDragIndex(null)}
                  onDrop={e => e.preventDefault()}
                >
                  <Image src={url} alt="" fill style={{ objectFit: 'cover' }} />
                  <button type="button" className={styles.photoRemove} onClick={() => removePhoto(url)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className={styles.uploadBtn}
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
              >
                <Upload size={16} />
                <span>{uploading ? 'Laden…' : 'Upload'}</span>
              </button>
            </div>
            <input
              ref={fileRef} type="file" accept="image/*" multiple hidden
              onChange={e => { Array.from(e.target.files ?? []).forEach(uploadPhoto); e.target.value = '' }}
            />
          </div>

          {/* Basis */}
          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Merk</label>
              <input className={styles.input} value={form.merk} onChange={e => set('merk', e.target.value)} required placeholder="Mercedes-Benz" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Model</label>
              <input className={styles.input} value={form.model} onChange={e => set('model', e.target.value)} required placeholder="GLE 580" />
            </div>
          </div>

          <div className={styles.row3}>
            <div className={styles.field}>
              <label className={styles.label}>Jaar</label>
              <input className={styles.input} type="number" value={form.jaar} onChange={e => set('jaar', e.target.value === '' ? '' : Number(e.target.value))} required min={1990} max={2030} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>PK</label>
              <input className={styles.input} type="number" value={form.pk} onChange={e => set('pk', e.target.value === '' ? '' : Number(e.target.value))} required min={0} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Kilometerstand</label>
              <input className={styles.input} type="number" value={form.kmstand} onChange={e => set('kmstand', e.target.value === '' ? '' : Number(e.target.value))} required min={0} />
            </div>
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Vraagprijs (€)</label>
              <input className={styles.input} type="number" value={form.prijs} onChange={e => set('prijs', e.target.value === '' ? '' : Number(e.target.value))} required min={0} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <select className={styles.select} value={form.badge_status} onChange={e => set('badge_status', e.target.value as BadgeStatus)}>
                {(Object.keys(BADGE_LABELS) as BadgeStatus[]).map(k => (
                  <option key={k} value={k}>{BADGE_LABELS[k]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Omschrijving</label>
            <textarea className={styles.textarea} value={form.omschrijving ?? ''} onChange={e => set('omschrijving', e.target.value || null)} rows={3} placeholder="Optionele beschrijving…" />
          </div>

          <div className={styles.section}>
            <p className={styles.sectionLabel}>Extra specificaties</p>
            <SpecsEditor value={specsValue} onChange={setSpecsValue} />
          </div>

          <label className={styles.checkRow}>
            <input type="checkbox" checked={form.is_visible} onChange={e => set('is_visible', e.target.checked)} />
            <span>Direct zichtbaar op de website</span>
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.actions}>
            <button type="button" className="btn-ghost" onClick={onClose}>Annuleren</button>
            <button type="submit" className="btn-primary" disabled={saving || uploading}>
              {saving ? 'Opslaan…' : isNew ? 'Auto toevoegen' : 'Wijzigingen opslaan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
