import styles from './RegularButton.module.css'

export default function RegularButton({
  label, onClick, disabled = false
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles.regularButton}
    >
      <span className={styles.label}>{label}</span>
    </button>
  )
}
