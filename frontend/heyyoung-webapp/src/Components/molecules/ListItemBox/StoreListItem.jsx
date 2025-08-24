import React from 'react';
import PropTypes from 'prop-types';
import styles from './StoreListItem.module.css';

const StoreListItem = ({ 
  store, 
  onItemClick,
  showDistance = true,
  showCategory = true,
  showPhone = true
}) => {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick(store);
    }
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      'cafe': '☕',
      'beauty': '💄',
      'convenience': '🏪',
      'restaurant': '🍽️',
      'shopping': '🛍️'
    };
    return categoryIcons[category] || '🏷️';
  };

  const getCategoryName = (category) => {
    const categoryNames = {
      'cafe': '카페',
      'beauty': '뷰티',
      'convenience': '편의점',
      'restaurant': '음식점',
      'shopping': '쇼핑'
    };
    return categoryNames[category] || category;
  };

  return (
    <div 
      className={styles.listItem} 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className={styles.storeHeader}>
        <h4 className={styles.storeName}>{store.name}</h4>
        {showDistance && store.distance && (
          <span className={styles.distanceBadge}>
            {formatDistance(store.distance)}
          </span>
        )}
      </div>
      
      <div className={styles.storeDetails}>
        {showCategory && store.category && (
          <p className={styles.category}>
            {getCategoryIcon(store.category)} {getCategoryName(store.category)}
          </p>
        )}
        
        <p className={styles.address}>{store.address}</p>
        
        {showPhone && store.phone && (
          <p className={styles.phone}>📞 {store.phone}</p>
        )}
        
        {store.discountRate && (
          <p className={styles.discount}>
            💰 {store.discountRate}% 할인
          </p>
        )}
        
        {store.terms && (
          <p className={styles.terms}>{store.terms}</p>
        )}
      </div>
      
      {store.businessHours && (
        <div className={styles.businessHours}>
          <p className={styles.hoursTitle}>🕒 영업시간</p>
          <div className={styles.hoursContent}>
            {Object.entries(store.businessHours).map(([day, hours]) => (
              <span key={day} className={styles.hourItem}>
                {day}: {hours}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

StoreListItem.propTypes = {
  store: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    category: PropTypes.string,
    phone: PropTypes.string,
    distance: PropTypes.number,
    discountRate: PropTypes.number,
    terms: PropTypes.string,
    businessHours: PropTypes.object
  }).isRequired,
  onItemClick: PropTypes.func,
  showDistance: PropTypes.bool,
  showCategory: PropTypes.bool,
  showPhone: PropTypes.bool
};

StoreListItem.defaultProps = {
  showDistance: true,
  showCategory: true,
  showPhone: true
};

export default StoreListItem;
