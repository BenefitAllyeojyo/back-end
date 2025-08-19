import styles from './AboutTextModule.module.css'

export default function AboutTextModule({
    Content="캠퍼스 혜택, 전부 모았다!",
  }) {

                
    return (
      <div className={styles.AboutTextModule}>
        <div className={styles.Title}>ABOUT</div>
        <div className={styles.Content}>{`${Content}`}</div>
      </div>
    )
  }
  