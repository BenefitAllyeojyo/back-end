import styles from './BigCardBtn.module.css'

export default function BigCardBtn({
  title, subtitle, distance, onClick, disabled = false
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styles.bigCardButton}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>
          {title}
        </h3>
        
        <div className={styles.subtitle}>
          <p className={styles.subtitleText}>{subtitle}</p>
          <p className={styles.distanceText}>{distance}</p>
        </div>
      </div>
      
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        className={styles.arrow}
      >
        <path 
          d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" 
          fill="var(--neutral-dark-light)"
        />
      </svg>
    </button>
  )
}
