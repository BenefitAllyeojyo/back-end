import styles from './MiniTagBtn.module.css'

export default function MiniTagBtn({
  label, onClick, disabled = false
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles.miniTagButton}
    >
      <span className={styles.label}>{label}</span>
    </button>
  )
}
