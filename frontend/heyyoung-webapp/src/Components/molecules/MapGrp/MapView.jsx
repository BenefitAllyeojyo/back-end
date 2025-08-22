import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import styles from './MapView.module.css';
import ToolTipModule from '../../molecules/TextGrp/ToolTipModule';
import { mapMarkers, mapCenter, mapConfig } from '../../../../public/mock/mapMarkers';

const MapView = ({schoolName, schoolColor}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // mock 데이터에서 가게 정보 가져오기
  const testMarkers = mapMarkers;

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
        center: new kakao.maps.LatLng(mapCenter.lat, mapCenter.lng), // 지도의 중심좌표 (성신여대)
        level: mapConfig.level // 지도의 확대 레벨
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

    // 지도 로드 완료 이벤트
    kakao.maps.event.addListener(map, 'tilesloaded', () => {
      console.log('지도 타일 로드 완료');
      updateTooltipSizes(map);
    });

    // 지도 클릭 이벤트 (테스트용)
    kakao.maps.event.addListener(map, 'click', () => {
      console.log('지도 클릭됨');
      // 클릭 시 현재 레벨과 크기 정보 표시
      const currentLevel = map.getLevel();
      console.log(`현재 지도 레벨: ${currentLevel}`);
    });

    // 지도 이동 완료 이벤트
    kakao.maps.event.addListener(map, 'dragend', () => {
      console.log('지도 드래그 완료');
      updateTooltipSizes(map);
    });

    // 지도 확대/축소 완료 이벤트
    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      console.log('지도 확대/축소 완료');
      updateTooltipSizes(map);
    });
  };

  const updateTooltipSizes = (map) => {
    const currentLevel = map.getLevel();
    
    // 지도 레벨에 따른 크기 조절 로직 (레벨 1-14)
    // 레벨 1(가장 확대) → 마커 작게, 레벨 14(가장 축소) → 마커 크게
    let scaleFactor;
    let fontSize;

    if (currentLevel >= 12) {
      scaleFactor = 0.4;
      fontSize = '10px';
    } else if (currentLevel >= 10) {
      scaleFactor = 0.5;
      fontSize = '11px';
    } else if (currentLevel >= 8) {
      scaleFactor = 0.6;
      fontSize = '12px';
    } else if (currentLevel >= 6) {
      scaleFactor = 0.7;
      fontSize = '13px';
    } else if (currentLevel >= 4) {
      scaleFactor = 0.8;
      fontSize = '14px';
    } else if (currentLevel >= 2) {
      scaleFactor = 0.9;
      fontSize = '15px';
    } else {
      scaleFactor = 1.0;
      fontSize = '16px';
    }

    // if (currentLevel <= 2) {
    //   scaleFactor = 0.4;
    //   fontSize = '10px';
    // } else if (currentLevel <= 4) {
    //   scaleFactor = 0.6;
    //   fontSize = '11px';
    // } else if (currentLevel <= 6) {
    //   scaleFactor = 0.8;
    //   fontSize = '12px';
    // } else if (currentLevel <= 8) {
    //   scaleFactor = 1.0;
    //   fontSize = '13px';
    // } else if (currentLevel <= 10) {
    //   scaleFactor = 1.3;
    //   fontSize = '14px';
    // } else if (currentLevel <= 12) {
    //   scaleFactor = 1.6;
    //   fontSize = '15px';
    // } else {
    //   scaleFactor = 2.0;
    //   fontSize = '16px';
    // }
    
    // 모든 tooltip의 크기와 글자 크기를 조절
    const tooltips = document.querySelectorAll(`.${styles.tooltipOverlay}`);
    tooltips.forEach((tooltip) => {
      tooltip.style.transform = `scale(${scaleFactor})`;
      tooltip.style.transformOrigin = 'bottom center';
      tooltip.style.transition = 'transform 0.3s ease-in-out';
      
      // 글자 크기도 조절
      const titleElements = tooltip.querySelectorAll('.ToolTipModuleTitle');
      const contentElements = tooltip.querySelectorAll('.ToolTipModuleContent');
      
      titleElements.forEach((title) => {
        title.style.fontSize = fontSize;
        title.style.transition = 'font-size 0.3s ease-in-out';
      });
      
      contentElements.forEach((content) => {
        content.style.fontSize = `calc(${fontSize} - 2px)`;
        content.style.transition = 'font-size 0.3s ease-in-out';
      });
    });
    
    console.log(`지도 레벨: ${currentLevel}, 툴팁 크기: ${scaleFactor.toFixed(2)}, 글자 크기: ${fontSize}`);
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
    
    // 마커 클릭 이벤트 추가
    tooltipDiv.addEventListener('click', () => {
      console.log(`${markerData.name} 마커 클릭됨!`);
      
      // 시각적 피드백 추가
      tooltipDiv.classList.add(styles.clicked);
      setTimeout(() => {
        tooltipDiv.classList.remove(styles.clicked);
      }, 300);
      
      // 해당 마커 위치로 지도 중심 이동 (더 확실한 방법)
      const markerPosition = new kakao.maps.LatLng(markerData.lat, markerData.lng);
      
      try {
        // 방법 1: setCenter 사용 (즉시 이동)
        map.setCenter(markerPosition);
        console.log(`setCenter 완료: ${markerData.lat}, ${markerData.lng}`);
        
        // 방법 2: panTo 사용 (부드러운 이동)
        map.panTo(markerPosition);
        console.log(`panTo 완료: ${markerData.lat}, ${markerData.lng}`);
        
        // 지도 레벨을 4로 설정 (확대)
        map.setLevel(4);
        console.log(`지도 레벨 4로 설정 완료`);
        
        // 지도 이동 완료 후 크기 업데이트 (더 긴 지연)
        setTimeout(() => {
          // 툴팁 크기 업데이트
          updateTooltipSizes(map);
          
          // 지도 상태 확인
          const currentCenter = map.getCenter();
          const currentLevel = map.getLevel();
          console.log(`지도 이동 완료 - 중심: ${currentCenter.getLat()}, ${currentCenter.getLng()}, 레벨: ${currentLevel}`);
          
          // 추가로 한 번 더 중심 설정 (확실하게)
          if (Math.abs(currentCenter.getLat() - markerData.lat) > 0.0001 || 
              Math.abs(currentCenter.getLng() - markerData.lng) > 0.0001) {
            console.log('위치가 정확하지 않아 재설정합니다');
            map.setCenter(markerPosition);
          }
        }, 800);
        
        console.log(`${markerData.name} 위치로 지도 이동 및 레벨 4로 확대 시작`);
      } catch (error) {
        console.error('지도 이동 중 오류 발생:', error);
      }
    });
    
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
        style={{ width: `${mapConfig.width}px`, height: `${mapConfig.height}px` }}
      />
      
      {/* 지도 위에 추가 정보 표시 */}
      {mapLoaded && (
        <div className={styles.mapInfo}>
          <h3>🏫 {schoolName} 주변 지도</h3>
          <p>{schoolName} 주변의 다양한 가게들과 편의시설을 확인할 수 있습니다!</p>
          
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
