import styles from './LongWhiteBtn.module.css'

export default function LongWhiteBtn({
  label, onClick, disabled = false
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles.longWhiteButton}
    >
      <span className={styles.label}>
        {label}
      </span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="12" 
        height="12" 
        viewBox="0 0 12 12" 
        fill="none"
        className={styles.arrow}
      >
        <path 
          d="M4.5 2L8.5 6L4.5 10" 
          stroke="#542BA8" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}