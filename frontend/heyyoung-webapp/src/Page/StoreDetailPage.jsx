import { useState, useEffect } from 'react';
import styles from './StoreDetailPage.module.css';
import BackgroundBottomTabImage from '@/Components/atoms/BackgroundBottomTabImage/BackgroundBottomTabImage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StoreDetailPage() {
  const [storeDetail, setStoreDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storeId, setStoreId] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // URL 쿼리 파라미터에서 storeId 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const idFromQuery = urlParams.get('id');
    
    // 세션스토리지에서 storeId 가져오기
    const idFromSession = sessionStorage.getItem('selectedStoreId');
    
    const finalStoreId = idFromQuery || idFromSession;
    
    if (finalStoreId) {
      setStoreId(finalStoreId);
      fetchStoreDetail(finalStoreId);
    } else {
      console.log('storeId를 찾을 수 없습니다');
      setLoading(false);
    }
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (storeDetail && storeDetail.partnershipBranchDto && !mapLoaded) {
      console.log('지도 초기화 시작');
      console.log('storeDetail:', storeDetail);
      console.log('partnershipBranchDto:', storeDetail.partnershipBranchDto);
      initializeMap();
    }
  }, [storeDetail, mapLoaded]);

  const initializeMap = () => {
    if (window.kakao && window.kakao.maps) {
      // partnershipBranchDto에서 위도경도 가져오기
      const latitude = storeDetail.partnershipBranchDto.latitude;
      const longitude = storeDetail.partnershipBranchDto.longitude;
      
      console.log('위도경도 데이터:', { latitude, longitude });
      
      // 위도경도가 유효한지 확인
      if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        console.error('유효하지 않은 위도경도:', { latitude, longitude });
        return;
      }

      const container = document.getElementById('storeMap');
      if (!container) {
        console.error('지도 컨테이너를 찾을 수 없습니다');
        return;
      }

      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3
      };

      console.log('지도 옵션:', options);

      const map = new window.kakao.maps.Map(container, options);

      // 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });

      marker.setMap(map);
      setMapLoaded(true);
      console.log('지도 초기화 완료');
    } else {
      console.error('Kakao Maps API가 로드되지 않았습니다');
    }
  };

  const fetchStoreDetail = async (id) => {
    try {
      console.log('Store ID:', id);

      // API 호출
      const response = await fetch(`${API_BASE_URL}/partnerships/${id}`, {
        method: 'GET',
        headers: {
          accept: '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      setStoreDetail(data.result);
      setLoading(false);
    } catch (error) {
      console.error('API 호출 실패:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (!storeId) {
    return (
      <div className={styles.container}>
        <div className={styles.noDataMessage}>
          <h1>정보가 없어요!</h1>
          <p>가게 정보를 찾을 수 없습니다.</p>
          <p>상세보기 버튼을 통해 접근해주세요.</p>
        </div>
        <BackgroundBottomTabImage currentTab="benefit" position="absolute" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>가게 상세정보</h1>
      
      {/* 지도 */}
      <div className={styles.mapContainer}>
        <div id="storeMap" className={styles.storeMap}></div>
      </div>

      {storeDetail && storeDetail.partnershipBranchDto && (
        <div>
          <h2>가게 정보</h2>
          <div>{storeDetail.partnershipBranchDto.name}</div>
          <div>{storeDetail.partnershipBranchDto.address}</div>
          <h2>API 응답 데이터</h2>
          <pre>{JSON.stringify(storeDetail, null, 2)}</pre>
        </div>
      )}
      
      <BackgroundBottomTabImage currentTab="benefit" position="absolute" />
    </div>
  );
}
