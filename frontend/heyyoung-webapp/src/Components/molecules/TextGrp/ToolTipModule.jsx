import styles from './ToolTipModule.module.css';

export default function ToolTipModule({ name, content, address, lat, lng, phone, businessHours, startDate, endDate, status, partnershipId, images, partnerships }) {
  // 파트너십 정보에서 할인율 찾기
  const partnership = partnerships?.find(p => p.partnershipId === partnershipId);
  const discountInfo = partnership ? `${partnership.discountRate}% 할인` : '할인 정보 없음';

  return (
    <div className={`${styles.ToolTipModuleContainer}`}>
      {/* 툴팁 내용과 SVG 화살표를 함께 배치 */}
      <div className={`${styles.ToolContainer}`}>
        <div className={`${styles.ToolTipModuleTitle}`}>{name}</div>
        <div className={`${styles.ToolTipModuleContent}`}>
          {content}
          {partnership && (
            <div className={styles.partnershipInfo}>
              <strong>🎉 {discountInfo}</strong>
              <div>{partnership.terms}</div>
            </div>
          )}
        </div>
        
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
            {phone && (
              <div className={styles.phone}>
                📞 {phone}
              </div>
            )}
            {businessHours && (
              <div className={styles.businessHours}>
                🕒 영업시간: {businessHours.mon || '정보 없음'}
              </div>
            )}
            {startDate && endDate && (
              <div className={styles.period}>
                📅 {startDate} ~ {endDate}
              </div>
            )}
          </div>
        )}
        
        {/* SVG 화살표를 툴팁 왼쪽 아래 모서리에 배치 */}
        <div className={`${styles.TipContainer}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M0 6L12 18L24 6H0Z" fill="#342961" />
          </svg>
        </div>
      </div>
    </div>
  );
}
