import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './StoreListItem.module.css';
import RegularButton from '@/Components/atoms/Button/RegularButton';

// 카테고리 아이콘 반환 함수
const getCategoryIcon = (category) => {
  const categoryIcons = {
    'CAFE': '☕',
    'RESTAURANT': '🍽️',
    'SHOP': '🛍️',
    'SERVICE': '🔧',
    'EDUCATION': '📚',
    'HEALTH': '🏥',
    'BEAUTY': '💄',
    'ENTERTAINMENT': '🎮',
    'SPORTS': '⚽',
    'OTHER': '🏢'
  };
  return categoryIcons[category] || '🏢';
};

// 카테고리 이름 반환 함수
const getCategoryName = (category) => {
  const categoryNames = {
    'CAFE': '카페',
    'RESTAURANT': '음식점',
    'SHOP': '쇼핑',
    'SERVICE': '서비스',
    'EDUCATION': '교육',
    'HEALTH': '건강',
    'BEAUTY': '뷰티',
    'ENTERTAINMENT': '엔터테인먼트',
    'SPORTS': '스포츠',
    'OTHER': '기타'
  };
  return categoryNames[category] || '기타';
};

// 거리 포맷팅 함수
const formatDistance = (distance) => {
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  } else {
    return `${(distance / 1000).toFixed(1)}km`;
  }
};

const StoreListItem = ({
  store,
  onItemClick,
  showDistance = true,
  showCategory = true,
  showPhone = true,
}) => {
  const navigate = useNavigate();
  const [todayDay, setTodayDay] = useState({ day: 0, dayName: '일' });
  const [currentTime, setCurrentTime] = useState('');

  // 오늘 요일 가져오기 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const getTodayDay = () => {
    const today = new Date();
    const day = today.getDay();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    return { day, dayName: dayNames[day] };
  };

  // 현재 시간 가져오기 (HH:MM 형식)
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 오늘 영업시간 가져오기
  const getTodayBusinessHours = () => {
    if (!store.businessHours) return [];
    
    const { day, dayName } = getTodayDay();
    
    // businessHours에서 오늘 요일의 영업시간 찾기
    let todayHours = store.businessHours[dayName] || store.businessHours[day];
    
    // 만약 위에서 찾지 못했다면, businessHours의 첫 번째 항목 사용
    if (!todayHours && Object.keys(store.businessHours).length > 0) {
      todayHours = Object.values(store.businessHours)[0];
    }
    
    if (!todayHours) return [];
    
    // 영업시간이 배열인 경우 그대로 반환, 문자열인 경우 배열로 변환
    if (Array.isArray(todayHours)) {
      return todayHours;
    } else if (typeof todayHours === 'string') {
      return [todayHours];
    }
    
    return [];
  };

  // 영업시간 파싱 및 영업 상태 확인
  const getBusinessStatus = () => {
    const todayHours = getTodayBusinessHours();
    if (todayHours.length === 0) return 'closed';
    
    const timeMatch = todayHours[0].match(/(\d{1,2}):(\d{2})~(\d{1,2}):(\d{2})/);
    if (!timeMatch) return 'closed';
    
    const [, openHour, openMin, closeHour, closeMin] = timeMatch;
    const openTime = `${openHour}:${openMin}`;
    const closeTime = `${closeHour}:${closeMin}`;
    
    const now = new Date();
    const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    if (openTime <= currentTimeStr && currentTimeStr <= closeTime) {
      return 'open';
    } else {
      return 'closed';
    }
  };

  const handleDetailClick = (e) => {
    e.stopPropagation(); // 부모 요소의 onClick 이벤트 전파 방지
    if (store.partnershipBranchDto?.id) {
      navigate(`/store-detail/${store.partnershipBranchDto.id}`);
    }
  };

  const handleClick = () => {
    if (onItemClick) {
      onItemClick(store);
    }
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
        <div className={styles.tagGroup}>
          {showDistance && store.distance && (
            <span className={styles.distanceBadge}>{formatDistance(store.distance)}</span>
          )}
          {showCategory && store.category && (
            <span className={styles.categoryBadge}>
              {getCategoryIcon(store.category)} {getCategoryName(store.category)}
            </span>
          )}
        </div>
      </div>

      <div className={styles.storeDetails}>
        {/* <p className={styles.address}>{store.address}</p> */}

        {/* {showPhone && store.phone && (
          <p className={styles.phone}>📞 {store.phone}</p>
        )} */}

        {store.discountRate && <p className={styles.discount}>💰 {store.discountRate}% 할인</p>}

        {store.terms && <p className={styles.terms}>{store.terms}</p>}
      </div>

      {store.businessHours && (
        <div className={styles.businessHours}>
          <div className={styles.hoursHeader}>
            <p className={styles.hoursTitle}>🕒 오늘 영업시간</p>
            <span
              className={`${styles.statusTag} ${getBusinessStatus() === 'open' ? styles.open : styles.closed}`}
            >
              {getBusinessStatus() === 'open' ? '영업중' : '영업종료'}
            </span>
          </div>
          <div className={styles.hoursContent}>
            {getTodayBusinessHours().map((hour, index) => (
              <span key={index} className={styles.hourItem}>{hour}</span>
            ))}
          </div>
        </div>
      )}

      {/* 상세보기 버튼 */}
      <div className={styles.detailButtonContainer} >
        <RegularButton onClick={handleDetailClick} label="상세보기"/>
      </div>
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
    businessHours: PropTypes.object,
    partnershipBranchDto: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  }).isRequired,
  onItemClick: PropTypes.func,
  showDistance: PropTypes.bool,
  showCategory: PropTypes.bool,
  showPhone: PropTypes.bool,
};

StoreListItem.defaultProps = {
  showDistance: true,
  showCategory: true,
  showPhone: true,
};

export default StoreListItem;
