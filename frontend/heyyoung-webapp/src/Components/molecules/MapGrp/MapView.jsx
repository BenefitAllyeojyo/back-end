import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import styles from './MapView.module.css';
import ToolTipModule from '../../molecules/TextGrp/ToolTipModule';

const MapView = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // 성신여대 근처 가게 데이터
  const testMarkers = [
    {
      id: 1,
      lat: 37.5925,
      lng: 127.0163,
      name: '성신여자대학교',
      content: '🏫 학생증 제시 시 10% 할인\n📚 교재 구매 시 5% 추가 할인\n🎓 졸업생 할인 혜택 제공',
      isSchool: true
    },
    {
      id: 2,
      lat: 37.5928,
      lng: 127.0168,
      name: '스타벅스 성신여대점',
      content: '☕ 학생증 제시 시 음료 10% 할인\n🍰 케이크 구매 시 음료 무료 업그레이드\n📱 모바일 주문 시 포인트 2배 적립',
      isSchool: false
    },
    {
      id: 3,
      lat: 37.5922,
      lng: 127.0158,
      name: '맥도날드 성신여대점',
      content: '🍔 학생증 제시 시 세트메뉴 15% 할인\n🍟 사이드 메뉴 무료 업그레이드\n🎫 생일자 할인 쿠폰 제공',
      isSchool: false
    },
    {
      id: 4,
      lat: 37.5930,
      lng: 127.0170,
      name: '올리브영 성신여대점',
      content: '💄 학생증 제시 시 전체 상품 20% 할인\n🧴 화장품 샘플 무료 증정\n🎁 3만원 이상 구매 시 선물세트 증정',
      isSchool: false
    },
    {
      id: 5,
      lat: 37.5920,
      lng: 127.0160,
      name: 'GS25 성신여대점',
      content: '🏪 학생증 제시 시 즉석식품 30% 할인\n🥤 음료 2+1 이벤트\n📱 모바일 결제 시 포인트 3배 적립',
      isSchool: false
    },
    {
      id: 6,
      lat: 37.5932,
      lng: 127.0172,
      name: '교보문고 성신여대점',
      content: '📚 학생증 제시 시 교재 25% 할인\n📖 일반 도서 15% 할인\n🎓 졸업생 할인 혜택 추가 제공',
      isSchool: false
    }
  ];

  useEffect(() => {
    // 카카오지도 API가 로드되었는지 확인
    if (typeof kakao !== 'undefined' && kakao.maps) {
      initializeMap();
    } else {
      // API가 로드되지 않았으면 대기
      const timer = setInterval(() => {
        if (typeof kakao !== 'undefined' && kakao.maps) {
          clearInterval(timer);
          initializeMap();
        }
      }, 100);
      
      return () => clearInterval(timer);
    }
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;
    
    try {
      // 지도를 담을 영역의 DOM 레퍼런스
      var mapContainer = mapRef.current;
      
      // 지도를 생성할 때 필요한 기본 옵션 (성신여대 중심)
      var mapOption = {
        center: new kakao.maps.LatLng(37.5925, 127.0163), // 지도의 중심좌표 (성신여대)
        level: 3 // 지도의 확대 레벨
      };

      // 지도를 생성 및 객체 리턴
      var map = new kakao.maps.Map(mapContainer, mapOption);
      mapInstanceRef.current = map;
      
      console.log('지도 생성 완료! (성신여대 중심)');
      setMapLoaded(true);
      
      // ToolTipModule 오버레이만 추가 (기본 마커 없음)
      addTooltipOverlays(map);
      
      // 지도 이벤트 리스너 추가 (확대/축소 시 tooltip 크기 조절)
      addMapEventListeners(map);
      
    } catch (error) {
      console.error('지도 초기화 실패:', error);
    }
  };

  const addTooltipOverlays = (map) => {
    testMarkers.forEach((markerData) => {
      // ToolTipModule을 커스텀 오버레이로 추가
      addTooltipOverlay(map, markerData);
    });
  };

  const addMapEventListeners = (map) => {
    // 지도 확대/축소 이벤트
    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      console.log('지도 확대/축소 변경됨');
      updateTooltipSizes(map);
    });

    // 지도 이동 이벤트
    kakao.maps.event.addListener(map, 'dragend', () => {
      console.log('지도 이동 완료');
      updateTooltipSizes(map);
    });

    // 지도 중심 변경 이벤트
    kakao.maps.event.addListener(map, 'center_changed', () => {
      console.log('지도 중심 변경됨');
      updateTooltipSizes(map);
    });
  };

  const updateTooltipSizes = (map) => {
    const currentLevel = map.getLevel();
    const zoomFactor = Math.max(0.5, Math.min(2.0, currentLevel / 3)); // 레벨 3을 기준으로 크기 조절
    
    // 모든 tooltip의 크기를 조절
    const tooltips = document.querySelectorAll(`.${styles.tooltipOverlay}`);
    tooltips.forEach((tooltip) => {
      tooltip.style.transform = `scale(${zoomFactor})`;
      tooltip.style.transformOrigin = 'bottom center';
    });
    
    console.log(`지도 레벨: ${currentLevel}, 툴팁 크기: ${zoomFactor}`);
  };

  const addTooltipOverlay = (map, markerData) => {
    // ToolTipModule을 담을 div 생성
    const tooltipDiv = document.createElement('div');
    tooltipDiv.className = styles.tooltipOverlay;
    
    // 성신여대인 경우 특별한 학교 툴팁 생성
    if (markerData.isSchool) {
      const root = createRoot(tooltipDiv);
      root.render(
        <div className={styles.schoolTooltip}>
          <div className={styles.schoolIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" fill="#2196f3"/>
            </svg>
          </div>
          <div className={styles.schoolInfo}>
            <div className={styles.schoolName}>{markerData.name}</div>
            <div className={styles.schoolContent}>{markerData.content}</div>
          </div>
        </div>
      );
    } else {
      // 일반 가게는 기존 ToolTipModule 사용
      const root = createRoot(tooltipDiv);
      root.render(
        <ToolTipModule 
          name={markerData.name}
          content={markerData.content}
        />
      );
    }
    
    // 커스텀 오버레이 생성 (기본 마커 없이)
    var customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: new kakao.maps.LatLng(markerData.lat, markerData.lng),
      content: tooltipDiv,
      yAnchor: 1.2 // 위치 위에 표시
    });
    
    console.log(`${markerData.name} ToolTipModule 오버레이 추가 완료`);
  };

  return (
    <div className={styles.mapContainer}>
      <div 
        ref={mapRef}
        id="map"
        className={styles.map}
        style={{ width: '600px', height: '500px' }}
      />
      
      {/* 지도 위에 추가 정보 표시 */}
      {mapLoaded && (
        <div className={styles.mapInfo}>
          <h3>🏫 성신여자대학교 주변 지도</h3>
          <p>성신여대 주변의 다양한 가게들과 편의시설을 확인할 수 있습니다!</p>
          
          {/* 위치 목록 표시 */}
          <div className={styles.locationList}>
            <h4>📍 표시된 위치들:</h4>
            <ul>
              {testMarkers.map((marker) => (
                <li key={marker.id} className={marker.isSchool ? styles.schoolItem : ''}>
                  <strong>{marker.name}</strong>
                  {marker.isSchool && <span className={styles.schoolBadge}>🏫 학교</span>}
                  <div className={styles.benefitInfo}>
                    {marker.content.split('\n').map((line, index) => (
                      <div key={index} className={styles.benefitLine}>{line}</div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
