import styles from './ToolTipModule.module.css';

export default function ToolTipModule({ name, content }) {
  return (
    <div className={`${styles.ToolTipModuleContainer}`}>
      <div className={`${styles.ToolContainer}`}>
        <div className={`${styles.ToolTipModuleTitle}`}>{name}</div>
        <div className={`${styles.ToolTipModuleContent}`}>{content}</div>
      </div>
      <div className={`${styles.TipContainer}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path d="M6 8L12 0H0L6 8Z" fill="#342961" />
        </svg>
      </div>
    </div>
  );
}
