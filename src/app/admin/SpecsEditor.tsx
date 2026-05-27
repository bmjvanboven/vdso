'use client'
import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import type { CarSpecs } from '@/lib/supabase/types'
import styles from './specsEditor.module.css'

interface Props {
  value: CarSpecs | null
  onChange: (specs: CarSpecs | null) => void
}

type KenmerkenRij = { categorie: string; items: string[] }

function specsToState(specs: CarSpecs | null) {
  return {
    kleur:            specs?.kleur ?? '',
    interieur:        specs?.interieur ?? '',
    brandstof:        specs?.brandstof ?? '',
    transmissie:      specs?.transmissie ?? '',
    carrosserie:      specs?.carrosserie ?? '',
    datum:            specs?.datum ?? '',
    btw_verrekenbaar: specs?.btw_verrekenbaar ?? false,
    kenmerken: specs?.kenmerken
      ? Object.entries(specs.kenmerken).map(([categorie, items]) => ({ categorie, items: [...items] }))
      : [] as KenmerkenRij[],
  }
}

export default function SpecsEditor({ value, onChange }: Props) {
  const [s, setS] = useState(() => specsToState(value))

  function update(patch: Partial<typeof s>) {
    const next = { ...s, ...patch }
    setS(next)
    // Schrijf terug als CarSpecs
    const kenmerken: Record<string, string[]> = {}
    next.kenmerken.forEach(r => {
      if (r.categorie.trim()) kenmerken[r.categorie.trim()] = r.items.filter(Boolean)
    })
    const specs: CarSpecs = {
      ...(next.kleur           && { kleur: next.kleur }),
      ...(next.interieur       && { interieur: next.interieur }),
      ...(next.brandstof       && { brandstof: next.brandstof }),
      ...(next.transmissie     && { transmissie: next.transmissie }),
      ...(next.carrosserie     && { carrosserie: next.carrosserie }),
      ...(next.datum           && { datum: next.datum }),
      ...(next.btw_verrekenbaar !== false && { btw_verrekenbaar: next.btw_verrekenbaar }),
      ...(Object.keys(kenmerken).length  && { kenmerken }),
    }
    onChange(Object.keys(specs).length ? specs : null)
  }

  // ── Kenmerken helpers ──────────────────────────────────
  function addCategorie() {
    update({ kenmerken: [...s.kenmerken, { categorie: '', items: [''] }] })
  }

  function removeCategorie(ci: number) {
    update({ kenmerken: s.kenmerken.filter((_, i) => i !== ci) })
  }

  function setCategorieNaam(ci: number, naam: string) {
    const k = s.kenmerken.map((r, i) => i === ci ? { ...r, categorie: naam } : r)
    update({ kenmerken: k })
  }

  function addItem(ci: number) {
    const k = s.kenmerken.map((r, i) => i === ci ? { ...r, items: [...r.items, ''] } : r)
    update({ kenmerken: k })
  }

  function setItem(ci: number, ii: number, val: string) {
    const k = s.kenmerken.map((r, i) =>
      i === ci ? { ...r, items: r.items.map((item, j) => j === ii ? val : item) } : r
    )
    update({ kenmerken: k })
  }

  function removeItem(ci: number, ii: number) {
    const k = s.kenmerken.map((r, i) =>
      i === ci ? { ...r, items: r.items.filter((_, j) => j !== ii) } : r
    )
    update({ kenmerken: k })
  }

  return (
    <div className={styles.root}>

      {/* ── Basisvelden ──────────────────────────────── */}
      <div className={styles.basicGrid}>
        <Field label="Kleur exterieur">
          <input className={styles.input} value={s.kleur} placeholder="Selenite Grey" onChange={e => update({ kleur: e.target.value })} />
        </Field>
        <Field label="Interieur">
          <input className={styles.input} value={s.interieur} placeholder="Bruin Nappa Leder" onChange={e => update({ interieur: e.target.value })} />
        </Field>
        <Field label="Brandstof">
          <select className={styles.select} value={s.brandstof} onChange={e => update({ brandstof: e.target.value })}>
            <option value="">— kies —</option>
            {['Benzine','Diesel','Elektrisch','Hybride (Benzine)','Hybride (Diesel)','Plug-in Hybride','LPG','Waterstof'].map(o =>
              <option key={o} value={o}>{o}</option>
            )}
          </select>
        </Field>
        <Field label="Transmissie">
          <select className={styles.select} value={s.transmissie} onChange={e => update({ transmissie: e.target.value })}>
            <option value="">— kies —</option>
            <option value="Automatisch">Automatisch</option>
            <option value="Handgeschakeld">Handgeschakeld</option>
            <option value="Semi-automatisch">Semi-automatisch</option>
          </select>
        </Field>
        <Field label="Carrosserie">
          <select className={styles.select} value={s.carrosserie} onChange={e => update({ carrosserie: e.target.value })}>
            <option value="">— kies —</option>
            {['Sedan','SUV / Crossover','Coupé','Cabrio','Stationwagon','Hatchback','MPV','Pick-up'].map(o =>
              <option key={o} value={o}>{o}</option>
            )}
          </select>
        </Field>
        <Field label="Datum (bijv. maart 2022)">
          <input className={styles.input} value={s.datum} placeholder="maart 2022" onChange={e => update({ datum: e.target.value })} />
        </Field>
      </div>

      <label className={styles.checkRow}>
        <input type="checkbox" checked={s.btw_verrekenbaar} onChange={e => update({ btw_verrekenbaar: e.target.checked })} />
        <span>BTW verrekenbaar</span>
      </label>

      {/* ── Kenmerken ────────────────────────────────── */}
      <div className={styles.kenmerkenHeader}>
        <p className={styles.sectionLabel}>Kenmerken</p>
        <button type="button" className={styles.addCatBtn} onClick={addCategorie}>
          <Plus size={12} /> Categorie
        </button>
      </div>

      {s.kenmerken.length === 0 && (
        <p className={styles.empty}>Nog geen categorieën. Klik op &ldquo;+ Categorie&rdquo; om te beginnen.</p>
      )}

      {s.kenmerken.map((rij, ci) => (
        <div key={ci} className={styles.categorie}>
          <div className={styles.categorieHeader}>
            <input
              className={styles.categorieNaam}
              value={rij.categorie}
              placeholder="Bijv. Exterieur"
              onChange={e => setCategorieNaam(ci, e.target.value)}
            />
            <button type="button" className={styles.removeBtn} onClick={() => removeCategorie(ci)}>
              <X size={14} />
            </button>
          </div>
          <div className={styles.items}>
            {rij.items.map((item, ii) => (
              <div key={ii} className={styles.itemRow}>
                <input
                  className={styles.itemInput}
                  value={item}
                  placeholder="Bijv. Panoramisch schuifdak"
                  onChange={e => setItem(ci, ii, e.target.value)}
                />
                <button type="button" className={styles.removeItemBtn} onClick={() => removeItem(ci, ii)}>
                  <X size={12} />
                </button>
              </div>
            ))}
            <button type="button" className={styles.addItemBtn} onClick={() => addItem(ci)}>
              <Plus size={12} /> Kenmerk toevoegen
            </button>
          </div>
        </div>
      ))}

    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  )
}
