import styles from './ToolTipModule.module.css';

export default function ToolTipModule({ name, content, address, lat, lng }) {
  return (
    <div className={`${styles.ToolTipModuleContainer}`}>
      <div className={`${styles.ToolContainer}`}>
        <div className={`${styles.ToolTipModuleTitle}`}>{name}</div>
        <div className={`${styles.ToolTipModuleContent}`}>{content}</div>
        
        {/* 주소와 좌표 정보 */}
        {(address || (lat && lng)) && (
          <div className={styles.locationInfo}>
            {address && (
              <div className={styles.address}>
                📍 {address}
              </div>
            )}
            {lat && lng && (
              <div className={styles.coordinates}>
                🗺️ {lat.toFixed(6)}, {lng.toFixed(6)}
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`${styles.TipContainer}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 8L12 0H0L6 8Z" fill="#342961" />
        </svg>
      </div>
    </div>
  );
}
