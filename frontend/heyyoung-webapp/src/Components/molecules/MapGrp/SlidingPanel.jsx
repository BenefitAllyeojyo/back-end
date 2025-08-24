import React, { useState, useRef, useEffect } from 'react';
import styles from './MapView.module.css';
import { fetchStores } from '../../../services/api/stores';

const SlidingPanel = () => {
  const [isSlidingPanelOpen, setIsSlidingPanelOpen] = useState(false);
  const [panelHeight, setPanelHeight] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartHeight, setDragStartHeight] = useState(60);
  const currentPanelHeight = useRef(60);
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  // 가게 정보와 현재 위치 가져오기
  useEffect(() => {
    const loadStoresAndLocation = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 가게 정보 가져오기
        const storesData = await fetchStores();
        setStores(storesData);
        console.log('가게 데이터 로드 완료:', storesData);

        // 현재 위치 가져오기 (더 정확한 옵션)
        if (navigator.geolocation) {
          const options = {
            enableHighAccuracy: true,  // 높은 정확도
            timeout: 10000,           // 10초 타임아웃
            maximumAge: 60000         // 1분 이내의 캐시된 위치 사용
          };
          
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ lat: latitude, lng: longitude });
              console.log('현재 위치 가져오기 완료:', { lat: latitude, lng: longitude });
            },
            (error) => {
              console.error('위치 가져오기 실패:', error);
              // 서울대학교 위치를 기본값으로 설정
              setCurrentLocation({ lat: 37.4592, lng: 126.9517 });
            },
            options
          );
        } else {
          // 서울대학교 위치를 기본값으로 설정
          setCurrentLocation({ lat: 37.4592, lng: 126.9517 });
        }
      } catch (err) {
        setError(err.message);
        console.error('가게 데이터 로드 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoresAndLocation();
  }, []);

  // 두 지점 간의 거리 계산 (Haversine 공식)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    // 입력값 검증
    if (!lat1 || !lng1 || !lat2 || !lng2) {
      console.error('잘못된 좌표값:', { lat1, lng1, lat2, lng2 });
      return 0;
    }
    
    const R = 6371; // 지구의 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    console.log('거리 계산:', {
      from: { lat: lat1, lng: lng1 },
      to: { lat: lat2, lng: lng2 },
      distance: distance
    });
    
    return distance;
  };

  // 거리를 읽기 쉬운 형태로 변환
  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    } else {
      return `${distance.toFixed(1)}km`;
    }
  };

  // 버튼 클릭 시 스르륵 애니메이션
  const handlePanelToggle = () => {
    if (isSlidingPanelOpen) {
      // 열린 상태면 닫기 (60px로 스르륵)
      animatePanelHeight(panelHeight, 60);
      setIsSlidingPanelOpen(false);
    } else {
      // 닫힌 상태면 열기 (460px로 스르륵)
      animatePanelHeight(panelHeight, 460);
      setIsSlidingPanelOpen(true);
    }
  };

  // 패널 높이 애니메이션 함수
  const animatePanelHeight = (fromHeight, toHeight) => {
    const duration = 500; // 0.5초
    const startTime = Date.now();
    const startHeight = fromHeight;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeInOut 효과
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      const currentHeight = startHeight + (toHeight - startHeight) * easeProgress;
      setPanelHeight(currentHeight);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  };

  // 마우스 드래그 이벤트
  const handleMouseDown = (e) => {
    e.preventDefault();
    console.log('마우스 다운 - 드래그 시작');
    setIsDragging(true);
    setDragStartHeight(panelHeight);
    currentPanelHeight.current = panelHeight;
    const startY = e.clientY;
    let hasMoved = false;
    
    const handleMouseMove = (e) => {
      const deltaY = startY - e.clientY;
      if (Math.abs(deltaY) > 5) {
        hasMoved = true;
      }
      const newHeight = Math.max(60, Math.min(460, dragStartHeight + deltaY));
      currentPanelHeight.current = newHeight;
      setPanelHeight(newHeight);
      console.log('드래그 중 - 높이:', newHeight, 'deltaY:', deltaY);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setIsDragging(false);
      
      const finalHeight = currentPanelHeight.current;
      console.log('드래그 완료 - 최종 높이:', finalHeight, 'dragStartHeight:', dragStartHeight, 'hasMoved:', hasMoved);
      
      // 사용자가 의도적으로 드래그한 경우 현재 위치에 고정
      if (hasMoved && Math.abs(finalHeight - dragStartHeight) > 10) {
        // 드래그가 10px 이상 움직였으면 의도적인 드래그로 간주
        // 현재 드래그한 위치에 그대로 고정
        console.log('의도적 드래그 - 현재 위치 유지:', finalHeight);
        setPanelHeight(finalHeight);
        if (finalHeight > 250) {
          setIsSlidingPanelOpen(true);
        } else {
          setIsSlidingPanelOpen(false);
        }
      } else if (!hasMoved) {
        // 드래그가 없었으면 클릭으로 간주하여 토글
        console.log('클릭으로 간주 - 패널 토글');
        handlePanelToggle();
      } else {
        // 드래그가 거의 없었으면 원래 위치로 복귀
        console.log('우발적 터치 - 원래 위치로 복귀:', dragStartHeight);
        setPanelHeight(dragStartHeight);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // 터치 드래그 이벤트
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    console.log('터치 시작 - 드래그 시작');
    setIsDragging(true);
    setDragStartHeight(panelHeight);
    currentPanelHeight.current = panelHeight;
    const startY = touch.clientY;
    let hasMoved = false;
    
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const deltaY = startY - touch.clientY;
      if (Math.abs(deltaY) > 5) {
        hasMoved = true;
      }
      const newHeight = Math.max(60, Math.min(460, dragStartHeight + deltaY));
      currentPanelHeight.current = newHeight;
      setPanelHeight(newHeight);
      console.log('터치 드래그 중 - 높이:', newHeight, 'deltaY:', deltaY);
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      setIsDragging(false);
      
      const finalHeight = currentPanelHeight.current;
      console.log('터치 드래그 완료 - 최종 높이:', finalHeight, 'dragStartHeight:', dragStartHeight, 'hasMoved:', hasMoved);
      
      // 사용자가 의도적으로 드래그한 경우 현재 위치에 고정
      if (hasMoved && Math.abs(finalHeight - dragStartHeight) > 10) {
        // 드래그가 10px 이상 움직였으면 의도적인 드래그로 간주
        // 현재 드래그한 위치에 그대로 고정
        console.log('의도적 터치 드래그 - 현재 위치 유지:', finalHeight);
        setPanelHeight(finalHeight);
        if (finalHeight > 250) {
          setIsSlidingPanelOpen(true);
        } else {
          setIsSlidingPanelOpen(false);
        }
      } else if (!hasMoved) {
        // 드래그가 없었으면 클릭으로 간주하여 토글
        console.log('클릭으로 간주 - 패널 토글');
        handlePanelToggle();
      } else {
        // 드래그가 거의 없었으면 원래 위치로 복귀
        console.log('우발적 터치 - 원래 위치로 복귀:', dragStartHeight);
        setPanelHeight(dragStartHeight);
      }
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div 
      className={styles.slidingPanel} 
      style={{ 
        height: `${panelHeight}px`,
        transition: isDragging ? 'none' : 'none' // 애니메이션은 JavaScript로 처리
      }}
    >
      <div 
        className={styles.slidingPanelHandle} 
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className={styles.handleIcon}>
          {isSlidingPanelOpen ? '▼' : '▲'}
        </div>
      </div>
              {panelHeight > 60 && (
          <div className={styles.slidingPanelContent}>
            <div className={styles.panelHeader}>
              <h3>주변 가게 정보</h3>
            </div>
            <div className={styles.panelList}>
              {isLoading ? (
                <div className={styles.loadingMessage}>로딩 중...</div>
              ) : error ? (
                <div className={styles.errorMessage}>에러: {error}</div>
              ) : stores && stores.length > 0 && currentLocation ? (
                stores
                  .map((store) => {
                    const distance = calculateDistance(
                      currentLocation.lat,
                      currentLocation.lng,
                      store.latitude,
                      store.longitude
                    );
                    return { ...store, distance };
                  })
                  .sort((a, b) => a.distance - b.distance) // 거리순으로 정렬
                  .map((store, index) => (
                    <div key={store.id} className={styles.listItem}>
                      <div className={styles.storeHeader}>
                        <h4>{store.name}</h4>
                        <span className={styles.distanceBadge}>
                          {formatDistance(store.distance)}
                        </span>
                      </div>
                      <div className={styles.storeDetails}>
                        <p className={styles.category}>
                          카테고리: {store.category === 'cafe' ? '☕ 카페' : store.category}
                        </p>
                        <p className={styles.address}>{store.address}</p>
                        {store.phone && (
                          <p className={styles.phone}>📞 {store.phone}</p>
                        )}
                      </div>
                    </div>
                  ))
              ) : (
                <div className={styles.emptyMessage}>가게 정보가 없습니다.</div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default SlidingPanel;
