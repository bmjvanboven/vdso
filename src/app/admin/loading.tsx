import styles from './loading.module.css'

export default function AdminLoading() {
  return (
    <div className={styles.wrap}>
      <div className={styles.spinner} />
    </div>
  )
}
