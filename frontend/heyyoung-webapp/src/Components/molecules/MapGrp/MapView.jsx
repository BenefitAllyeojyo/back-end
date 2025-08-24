import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import styles from './MapView.module.css';
import ToolTipModule from '../../molecules/TextGrp/ToolTipModule';
import LocationPin from '../../atoms/LocationPin';
import { stores, convertStoresToMarkers, mapConfig as defaultMapConfig } from '../../../mocks/stores';
import { useStores } from '../../../hooks/useStores';

const MapView = ({ schoolName = '서울대학교', schoolColor }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const overlaysRef = useRef([]);         // ★ CustomOverlay 인스턴스 보관
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // 커스텀 훅으로 스토어와 파트너십 데이터 가져오기
  const { stores: apiStores, partnerships, isLoading, error } = useStores(1);

  // API 스토어 데이터를 마커 형식으로 변환
  const convertApiStoresToMarkers = (storesData) => {
    return storesData.map(store => ({
      id: store.id,
      position: {
        lat: store.latitude,
        lng: store.longitude
      },
      name: store.name,
      content: `재학생 대상 음료 개당 500원 할인`,
      address: store.address,
      lat: store.latitude,
      lng: store.longitude,
      phone: store.phone,
      businessHours: store.businessHoursJson ? JSON.parse(store.businessHoursJson) : null,
      startDate: store.startDate,
      endDate: store.endDate,
      status: store.status,
      partnershipId: store.partnershipId,
      images: store.images
    }));
  };

  // stores 데이터를 마커 형식으로 변환 (기존 목데이터)
  const testMarkers = apiStores.length > 0 ? convertApiStoresToMarkers(apiStores) : convertStoresToMarkers(stores);

  useEffect(() => {
    let timer;
    const tryInit = () => {
      if (typeof kakao !== 'undefined' && kakao.maps) {
        initializeMap();
      } else {
        timer = setInterval(() => {
          if (typeof kakao !== 'undefined' && kakao.maps) {
            clearInterval(timer);
            initializeMap();
          }
        }, 100);
      }
    };

    tryInit();

    // 언마운트 시 클린업
    return () => {
      if (timer) clearInterval(timer);
      // 오버레이들 해제
      overlaysRef.current.forEach(ov => ov.setMap(null));
      overlaysRef.current = [];
      // 지도 참조 해제
      mapInstanceRef.current = null;
      window.currentMap = null;
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current) return;

    try {
      const mapContainer = mapRef.current;

      // 서울대입구역 중심 좌표 사용
      const centerLat = defaultMapConfig.center.lat;
      const centerLng = defaultMapConfig.center.lng;
      
      const mapOption = {
        center: new kakao.maps.LatLng(centerLat, centerLng),
        level: defaultMapConfig.level, // 서울대입구역에 맞는 줌 레벨
        draggable: true,
        scrollwheel: true,
        disableDoubleClickZoom: false,
        keyboardShortcuts: true
      };

      const map = new kakao.maps.Map(mapContainer, mapOption);
      mapInstanceRef.current = map;
      window.currentMap = map;

      setMapLoaded(true);

              // 타일 로드 1회성 콜백 (중복 등록 방지)
        // 초기 로드 시 마커 즉시 추가 (tilesloaded 이벤트와 별개로)
        console.log('지도 초기화 완료, 마커 추가 시작...');
        addTooltipOverlays(map);
        addMapEventListeners(map);
        
        // tilesloaded 이벤트도 백업으로 추가
        kakao.maps.event.addListener(map, 'tilesloaded', () => {
          console.log('tilesloaded 이벤트 발생 - 마커 재확인');
          // 마커가 없으면 다시 추가
          if (overlaysRef.current.length === 0) {
            console.log('마커가 없어서 다시 추가');
            addTooltipOverlays(map);
          }
        });
        
        // 초기 로드 시 즉시 반응형 크기 적용 (숨겨진 툴팁도 포함)
        setTimeout(() => {
          console.log('초기 로드 후 마커 상태 확인...');
          console.log('총 오버레이 수:', overlaysRef.current.length);
          
          // 마커가 제대로 표시되었는지 확인
          overlaysRef.current.forEach((item, index) => {
            if (item.getMap) {
              console.log(`오버레이 ${index}: 지도에 표시됨:`, item.getMap() !== null);
            }
          });
          
          updateTooltipSizes(map, true); // true = 초기 로드
        }, 500);

    } catch (error) {
      console.error('지도 초기화 실패:', error);
    }
  };

  const addMapEventListeners = (map) => {
    // 줌 변경 시 즉시 반응형 크기 조정
    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      updateTooltipSizes(map);
    });

    // 지도 중심 변경 시 즉시 반응형 크기 조정
    kakao.maps.event.addListener(map, 'center_changed', () => {
      updateTooltipSizes(map);
    });

    // 드래그 중에도 실시간으로 반응형 크기 조정 (성능 최적화)
    let dragTimeout;
    kakao.maps.event.addListener(map, 'drag', () => {
      clearTimeout(dragTimeout);
      dragTimeout = setTimeout(() => {
        updateTooltipSizes(map);
      }, 50); // 드래그 중에는 50ms 딜레이로 제한
    });
    
    // 드래그 종료 시 즉시 업데이트
    kakao.maps.event.addListener(map, 'dragend', () => {
      clearTimeout(dragTimeout);
      updateTooltipSizes(map);
    });

    // 지도 클릭 시 모든 툴팁만 숨김 (마커는 유지)
    kakao.maps.event.addListener(map, 'click', () => {
      const currentLevel = map.getLevel();
      console.log(`현재 지도 레벨: ${currentLevel}`);
      
      // 지도 클릭 시 모든 툴팁만 숨김 (마커는 유지)
      hideAllTooltips();
      
      // 모든 마커를 원래 상태로 복원 (색상만 변경)
      overlaysRef.current.forEach(item => {
        if (item.setImage && item.defaultIcon) {
          item.setImage(item.defaultIcon);
          item.setZIndex(1);
        }
      });
    });
  };

  // === 지도 레벨에 따른 반응형 크기 조정 ===
  const updateTooltipSizes = (map, isInitialLoad = false) => {
    const currentLevel = map.getLevel();
    console.log('지도 레벨 변경:', currentLevel, isInitialLoad ? '(초기 로드)' : '');

    // 레벨에 따른 크기 조정
    let scaleFactor, fontSize;
    
    if (currentLevel <= 3) {
      scaleFactor = 1.2;      // 확대
      fontSize = '16px';      // 큰 글자
    } else if (currentLevel <= 6) {
      scaleFactor = 1.0;      // 기본 크기
      fontSize = '14px';      // 기본 글자
    } else if (currentLevel <= 9) {
      scaleFactor = 0.8;      // 축소
      fontSize = '12px';      // 작은 글자
    } else if (currentLevel <= 12) {
      scaleFactor = 0.6;      // 더 축소
      fontSize = '10px';      // 더 작은 글자
    } else {
      scaleFactor = 0.4;      // 최소 크기
      fontSize = '8px';       // 최소 글자
    }

    // 표시된 툴팁에만 크기와 마진 적용 (애니메이션 효과 없음)
    const tooltips = document.querySelectorAll(`.${styles.tooltipOverlay}`);
    console.log(`툴팁 개수: ${tooltips.length}, 초기 로드: ${isInitialLoad}`);
    
    tooltips.forEach((tooltip, index) => {
      // 초기 로드가 아니면 숨겨진 툴팁은 건드리지 않음
      if (!isInitialLoad && tooltip.style.display === 'none') {
        console.log(`툴팁 ${index}: 숨겨짐 - 건드리지 않음`);
        return;
      }
      
      console.log(`툴팁 ${index}: 처리 중, display: ${tooltip.style.display}`);
      
      tooltip.style.transform = `scale(${scaleFactor})`;
      tooltip.style.transformOrigin = 'top left'; // 왼쪽 위 기준으로 크기 조정
      
      // 툴팁 높이만큼 위로 이동 (핀과 겹치지 않도록)
      const tooltipHeight = tooltip.offsetHeight || 100; // 기본값 설정
      const scaledHeight = tooltipHeight * scaleFactor;
      const dynamicMarginTop = `-${scaledHeight + 10}px`; // 10px 여유 공간 추가
      
      tooltip.style.marginTop = dynamicMarginTop;
      
      // 내부 텍스트 크기도 조정 (애니메이션 효과 없음)
      const titleEls = tooltip.querySelectorAll('.ToolTipModuleTitle');
      const contentEls = tooltip.querySelectorAll('.ToolTipModuleContent');
      
      titleEls.forEach(el => {
        el.style.fontSize = fontSize;
      });
      
      contentEls.forEach(el => {
        el.style.fontSize = `calc(${fontSize} - 2px)`;
      });
      
      // 초기 로드 시 마진 적용 후 툴팁을 다시 숨김
      if (isInitialLoad) {
        tooltip.style.display = 'none';
      }
      
      console.log(`툴팁 ${index}: 마진 적용 완료 - marginTop: ${tooltip.style.marginTop}, transform: ${tooltip.style.transform}`);
    });

    console.log(`레벨 ${currentLevel}: 크기 ${scaleFactor.toFixed(1)}x, 글자 ${fontSize}`);
  };

  // === 마커와 오버레이 관리 ===
  const clearAllOverlays = (map) => {
    console.log('기존 오버레이 제거 중...', overlaysRef.current.length);
    overlaysRef.current.forEach(item => {
      if (item.setMap) {
        item.setMap(null); // 마커나 오버레이 제거
      }
    });
    overlaysRef.current = [];
  };

  // 모든 툴팁을 숨기는 함수
  const hideAllTooltips = () => {
    const tooltips = document.querySelectorAll(`.${styles.tooltipOverlay}`);
    tooltips.forEach(tooltip => {
      tooltip.style.display = 'none';
    });
    console.log('모든 툴팁 숨김');
  };

  // 특정 툴팁을 제외한 다른 모든 툴팁을 숨기는 함수
  const hideOtherTooltips = (currentTooltip) => {
    const tooltips = document.querySelectorAll(`.${styles.tooltipOverlay}`);
    tooltips.forEach(tooltip => {
      if (tooltip !== currentTooltip) {
        tooltip.style.display = 'none';
      }
    });
    console.log('다른 툴팁들 숨김');
  };

  // 핀 오른쪽으로 중심 이동하여 툴팁이 완전히 보이도록 하는 함수
  const centerMapForTooltip = (map, markerPosition) => {
    const currentCenter = map.getCenter();
    const currentLevel = map.getLevel();
    
    // 줌 레벨에 따라 이동 거리 조정 (레벨이 클수록 더 많이 이동)
    let offsetX = 0;
    if (currentLevel <= 3) {
      offsetX = 0.001; // 매우 확대된 상태
    } else if (currentLevel <= 6) {
      offsetX = 0.002; // 확대된 상태
    } else if (currentLevel <= 9) {
      offsetX = 0.003; // 보통 상태
    } else {
      offsetX = 0.004; // 축소된 상태
    }
    
    // 핀 오른쪽으로 중심 이동
    const newCenter = new kakao.maps.LatLng(
      markerPosition.getLat(),
      markerPosition.getLng() + offsetX
    );
    
    console.log('지도 이동 시작...');
    map.panTo(newCenter);
    console.log('지도 이동 명령 완료');
  };

  const refreshOverlays = (map) => {
    addTooltipOverlays(map);
  };

  const addTooltipOverlays = (map) => {
    console.log('addTooltipOverlays 시작...', testMarkers);
    if (!testMarkers || testMarkers.length === 0) {
      console.log('testMarkers가 비어있음');
      return;
    }
    if (!map) {
      console.log('map이 null임');
      return;
    }

    console.log('기존 오버레이 제거 중...');
    clearAllOverlays(map);
    
    console.log(`${testMarkers.length}개의 마커 추가 시작`);
    testMarkers.forEach((markerData, index) => {
      console.log(`마커 ${index + 1} 추가 중:`, markerData);
      addTooltipOverlay(map, markerData);
    });
    
    console.log('addTooltipOverlays 완료, 총 오버레이 수:', overlaysRef.current.length);
  };

  // 기본 마커는 크기 조정이 자동으로 됨 (카카오맵에서 관리)

  // === 핀만 표시하고 클릭 시 툴팁 표시 ===
  const addTooltipOverlay = (map, markerData) => {
    console.log('addTooltipOverlay 시작:', markerData.name);
    const markerPosition = new kakao.maps.LatLng(markerData.lat, markerData.lng);

    // 1. 커스텀 SVG 마커 이미지로 생성 (색상 변경 가능)
    const defaultIcon = new kakao.maps.MarkerImage(
      'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 18 25" fill="none">
          <path d="M18 9.52335C18 13.6309 12.5156 20.9435 10.1109 23.9607C9.53438 24.6798 8.46562 24.6798 7.88906 23.9607C5.44219 20.9435 0 13.6309 0 9.52335C0 4.53983 4.02938 0.5 9 0.5C13.9688 0.5 18 4.53983 18 9.52335Z" fill="#542BA8"/>
          <path d="M18 9.52335C18 13.6309 12.5156 20.9435 10.1109 23.9607C9.53438 24.6798 8.46562 24.6798 7.88906 23.9607C5.44219 20.9435 0 13.6309 0 9.52335C0 4.53983 4.02938 0.5 9 0.5C13.9688 0.5 18 4.53983 18 9.52335Z" fill="black" fill-opacity="0.2"/>
          <path d="M18 9.52335C18 13.6309 12.5156 20.9435 10.1109 23.9607C9.53438 24.6798 8.46562 24.6798 7.88906 23.9607C5.44219 20.9435 0 13.6309 0 9.52335C0 4.53983 4.02938 0.5 9 0.5C13.9688 0.5 18 4.53983 18 9.52335Z" fill="black" fill-opacity="0.2"/>
          <path d="M18 9.52335C18 13.6309 12.5156 20.9435 10.1109 23.9607C9.53438 24.6798 8.46562 24.6798 7.88906 23.9607C5.44219 20.9435 0 13.6309 0 9.52335C0 4.53983 4.02938 0.5 9 0.5C13.9688 0.5 18 4.53983 18 9.52335Z" fill="black" fill-opacity="0.2"/>
          <circle cx="9" cy="9.5" r="3" fill="white"/>
        </svg>
      `),
      new kakao.maps.Size(32, 40),
      { offset: new kakao.maps.Point(16, 40) }
    );
    
    const clickedIcon = new kakao.maps.MarkerImage(
      'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 18 25" fill="white">
          <path d="M18 9.52335C18 13.6309 12.5156 20.9435 10.1109 23.9607C9.53438 24.6798 8.46562 24.6798 7.88906 23.9607C5.44219 20.9435 0 13.6309 0 9.52335C0 4.53983 4.02938 0.5 9 0.5C13.9688 0.5 18 4.53983 18 9.52335Z" fill="#FF616D"/>
          <path d="M18 9.52335C18 13.6309 12.5156 20.9435 10.1109 23.9607C9.53438 24.6798 8.46562 24.6798 7.88906 23.9607C5.44219 20.9435 0 13.6309 0 9.52335C0 4.53983 4.02938 0.5 9 0.5C13.9688 0.5 18 4.53983 18 9.52335Z" fill="black" fill-opacity="0.2"/>
          <path d="M18 9.52335C18 13.6309 12.5156 20.9435 10.1109 23.9607C9.53438 24.6798 8.46562 24.6798 7.88906 23.9607C5.44219 20.9435 0 13.6309 0 9.52335C0 4.53983 4.02938 0.5 9 0.5C13.9688 0.5 18 4.53983 18 9.52335Z" fill="black" fill-opacity="0.2"/>
          <path d="M18 9.52335C18 13.6309 12.5156 20.9435 10.1109 23.9607C9.53438 24.6798 8.46562 24.6798 7.88906 23.9607C5.44219 20.9435 0 13.6309 0 9.52335C0 4.53983 4.02938 0.5 9 0.5C13.9688 0.5 18 4.53983 18 9.52335Z" fill="black" fill-opacity="0.2"/>
          <circle cx="9" cy="9.5" r="3" fill="white"/>
        </svg>
      `),
      new kakao.maps.Size(32, 40),
      { offset: new kakao.maps.Point(16, 40) }
    );
    
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      map: map,
      image: defaultIcon,
      zIndex: 1 // 기본 마커는 낮은 zIndex
    });
    
    // 마커에 기본 아이콘 참조 저장 (지도 클릭 시 복원용)
    marker.defaultIcon = defaultIcon;
    
    console.log('커스텀 마커 생성 완료');

    // 2. ToolTipModule을 content로 사용 (초기에는 숨김)
    const tooltipDiv = document.createElement('div');
    tooltipDiv.className = styles.tooltipOverlay;
    tooltipDiv.style.display = 'none'; // 초기에는 숨김
    tooltipDiv.style.zIndex = '9999'; // 마커보다 위에 표시

            const tooltipRoot = createRoot(tooltipDiv);
        tooltipRoot.render(
          <ToolTipModule
            name={markerData.name}
            content={markerData.content}
            address={markerData.address}
            lat={markerData.lat}
            lng={markerData.lng}
            phone={markerData.phone}
            businessHours={markerData.businessHours}
            startDate={markerData.startDate}
            endDate={markerData.endDate}
            status={markerData.status}
            partnershipId={markerData.partnershipId}
            images={markerData.images}
            partnerships={partnerships}
          />
        );

    // 3. 커스텀 오버레이 생성 (초기에는 숨김)
    const customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: markerPosition,
      content: tooltipDiv,
      yAnchor: 1,
      zIndex: 9999 // 마커보다 위에 표시
    });

    // 마커 클릭 이벤트 (툴팁 표시/숨김 토글 + 마커 색상 변경)
    marker.addListener('click', () => {
      const currentMap = window.currentMap || map;
      if (!currentMap) return;

      try {
        // 툴팁 표시/숨김 토글
        if (tooltipDiv.style.display === 'none') {
          console.log('툴팁 표시 시작...');
          
          // 다른 모든 툴팁을 먼저 숨김 (현재 툴팁은 제외)
          hideOtherTooltips(tooltipDiv);
          
          // 다른 모든 마커를 원래 상태로 복원
          overlaysRef.current.forEach(item => {
            if (item.setImage && item !== marker) {
              item.setImage(defaultIcon);
              item.setZIndex(1);
            }
          });
          
          // 클릭된 마커를 #FF616D 색상으로 변경
          marker.setZIndex(1000); // 클릭된 마커를 위로 올림
          marker.setImage(clickedIcon);
          console.log('마커 색상 변경 완료');
          
          console.log('마커 클릭됨 - 색상 변경 완료, 지도 이동 시작');
          
                  // 툴팁을 먼저 표시 (지도 이동 전에)
        console.log('툴팁 표시 시작...');
        tooltipDiv.style.display = 'block';
        console.log('툴팁 표시됨');
        
        // 지도 이동을 툴팁 표시 후에 실행
        setTimeout(() => {
          console.log('지도 이동 시작...');
          centerMapForTooltip(currentMap, markerPosition);
          
          // 지도 이동 완료 후 드래그 기능 복원
          setTimeout(() => {
            if (currentMap && currentMap.setDraggable) {
              currentMap.setDraggable(true);
              console.log('지도 드래그 기능 복원됨');
            }
          }, 500);
        }, 100); // 툴팁 표시 후 100ms 뒤 지도 이동
        
        // 마진 재계산을 더 늦게 실행
        setTimeout(() => {
          if (tooltipDiv.style.display !== 'none') {
            updateTooltipSizes(map);
            console.log('툴팁 마진 재계산 완료');
          } else {
            console.log('툴팁이 이미 숨겨짐 - 마진 재계산 생략');
          }
        }, 800); // 지도 이동 완료 후 마진 재계산
        
        console.log('마커 클릭됨 - 툴팁 표시, 색상 변경 완료, 지도 이동 예약');
        } else {
          console.log('툴팁 숨김 시작...');
          
          // 툴팁이 숨겨질 때 원래 상태로 복원
          marker.setZIndex(1);
          marker.setImage(defaultIcon);
          console.log('마커 색상 복원 완료');
          
          // 현재 툴팁 숨김 (마지막에 실행)
          tooltipDiv.style.display = 'none';
          console.log('툴팁 숨겨짐');
          
          console.log('마커 클릭 해제됨 - 툴팁 숨김, 색상 복원 완료');
        }
      } catch (error) {
        console.error('마커 클릭 처리 중 오류:', error);
      }
    });

    // 마커와 오버레이를 배열에 추가
    overlaysRef.current.push(marker);
    overlaysRef.current.push(customOverlay);
    
    console.log('마커와 오버레이 추가 완료. 총 개수:', overlaysRef.current.length);
    console.log('현재 마커 위치:', markerPosition.getLat(), markerPosition.getLng());
    console.log('마커가 지도에 표시됨:', marker.getMap() !== null);
  };

  return (
    <div className={styles.mapContainer}>
      <div
        ref={mapRef}
        id="map"
        className={styles.map}
      />
      {mapLoaded && (
        <div className={styles.mapInfo}>
          <h3>🏫 {schoolName} 주변 지도</h3>
          <p>{schoolName} 주변의 다양한 가게들과 편의시설을 확인할 수 있습니다!</p>

          <div className={styles.refreshControls}>
            <button
              onClick={() => mapInstanceRef.current && refreshOverlays(mapInstanceRef.current)}
              className={styles.refreshButton}
            >
              🔄 툴팁 새로고침
            </button>
            <button
              onClick={() => {
                if (mapInstanceRef.current) {
                  addTooltipOverlays(mapInstanceRef.current);
                }
              }}
              className={styles.refreshButton}
              style={{ marginLeft: '10px' }}
            >
              🎯 툴팁 강제 추가
            </button>
            <span className={styles.refreshInfo}>
              지도 이동/확대 시 자동으로 핀이 재렌더링됩니다
            </span>
          </div>

        </div>
      )}
    </div>
  );
};
export default MapView;

