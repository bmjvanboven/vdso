'use client'
import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import styles from './PreviewGate.module.css'

export default function PreviewGate() {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_PREVIEW_EMAIL ?? 'preview@vdso.nl',
      password: code,
    })
    if (authError) {
      setError(true)
      setCode('')
      setLoading(false)
      setTimeout(() => setError(false), 1200)
    } else {
      window.location.reload()
    }
  }

  return (
    <div className={styles.gate}>
      <Image src="/uploads/logo-vdso-web.png" alt="VDSO" width={120} height={22} className={styles.logo} priority />
      <p className={styles.eyebrow}>Private Preview</p>
      <h2 className={styles.title}>Toegang vereist.</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={`${styles.input} ${error ? styles.error : ''}`}
          type="password"
          placeholder={error ? 'Onjuiste code — probeer opnieuw' : 'Toegangscode'}
          value={code}
          onChange={e => setCode(e.target.value)}
          autoFocus
        />
        <button type="submit" className={`btn-primary ${styles.btn}`} disabled={loading}>
          {loading ? 'Laden…' : 'Toegang'}
        </button>
      </form>
      <p className={styles.footer}>VDSO B.V. · Besloten preview · Niet voor distributie</p>
    </div>
  )
}
