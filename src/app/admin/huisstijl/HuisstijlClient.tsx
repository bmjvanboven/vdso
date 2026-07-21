import Image from 'next/image'
import AdminSidebar from '../AdminSidebar'
import adminStyles from '../admin.module.css'
import styles from './huisstijl.module.css'

const LOGOS = [
  { name: 'Logo — web', hint: '490 × 91 · header/scherm-formaat', src: '/uploads/logo-vdso-web.png', width: 200, height: 37, dark: true },
  { name: 'Logo — drukwerk', hint: '2042 × 376 · print/hoge resolutie', src: '/uploads/logo-vdso-drukwerk.png', width: 200, height: 37, dark: true },
]

const SWATCHES = [
  { name: 'Navy', hex: '#0A1628' },
  { name: 'Signal Blue', hex: '#2E6BFF' },
  { name: 'Platinum', hex: '#E4E6EC' },
  { name: 'Ivory', hex: '#F4F4F1' },
  { name: 'Chrome', hex: '#7E8699' },
]

export default function HuisstijlClient() {
  return (
    <div className={adminStyles.page}>
      <AdminSidebar />
      <main className={adminStyles.main}>
        <div className={adminStyles.topBar}>
          <div>
            <h1 className={adminStyles.pageTitle}>Logo &amp; Huisstijl</h1>
            <p className={adminStyles.pageCount}>Definitieve logobestanden en merkstijl van VDSO</p>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Logo</p>
          <div className={styles.logoGrid}>
            {LOGOS.map(logo => (
              <div key={logo.src} className={`${styles.logoCard} ${logo.dark ? styles.logoCardDark : ''}`}>
                <div className={styles.logoPreview}>
                  <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} />
                </div>
                <div className={styles.logoMeta}>
                  <span className={styles.logoName}>{logo.name}</span>
                  <span className={styles.logoHint}>{logo.hint}</span>
                  <a className={styles.downloadLink} href={logo.src} download>Downloaden</a>
                </div>
              </div>
            ))}
            <div className={`${styles.logoCard} ${styles.logoCardLight}`}>
              <div className={styles.logoPreview}>
                <Image src="/huisstijl/logo-vector.svg" alt="Logo vector" width={200} height={37} />
              </div>
              <div className={styles.logoMeta}>
                <span className={styles.logoName}>Logo — vector</span>
                <span className={styles.logoHint}>SVG · schaalbaar, voor print/drukwerk</span>
                <a className={styles.downloadLink} href="/huisstijl/logo-vector.svg" download>Downloaden</a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Sfeerbeeld</p>
          <Image className={styles.moodImage} src="/uploads/vdso-logo-kleur-blauw.jpg" alt="VDSO logo sfeerbeeld" width={2416} height={1728} />
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Kleuren</p>
          <div className={styles.swatchGrid}>
            {SWATCHES.map(s => (
              <div key={s.hex} className={styles.swatch}>
                <div className={styles.swatchColor} style={{ background: s.hex }} />
                <div className={styles.swatchMeta}>
                  <div className={styles.swatchName}>{s.name}</div>
                  <div className={styles.swatchHex}>{s.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionLabel}>Typografie</p>
          <div className={styles.typeSample}>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>Saira</span>
              <span className={styles.typeDisplay}>VDSO Premium Occasions</span>
            </div>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>Geist</span>
              <span className={styles.typeBody}>Premium occasions, zorgvuldig geselecteerd. Elke auto grondig gecontroleerd.</span>
            </div>
            <div className={styles.typeRow}>
              <span className={styles.typeLabel}>Geist Mono</span>
              <span className={styles.typeMono}>KVK 42015299 · BTW NL869302140B0</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
