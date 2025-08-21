import React from 'react';
import MapView from '../Components/molecules/MapGrp/MapView';

const MapTestPage = () => {
  // 테스트용 마커 데이터
  const testMarkers = [
    {
      lat: 37.5665,
      lng: 126.9780,
      title: "서울시청",
      description: "서울특별시 중구 세종대로 110",
      benefit: "공무원 할인 20%"
    },
    {
      lat: 37.5668,
      lng: 126.9788,
      title: "광화문",
      description: "서울특별시 종로구 세종로",
      benefit: "문화재 할인 30%"
    }
  ];

  const handleMarkerClick = (markerData, index) => {
    console.log(`마커 ${index + 1} 클릭됨:`, markerData);
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#333',
        marginBottom: '30px'
      }}>
        🗺️ 카카오지도 테스트 페이지
      </h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#666' }}>
          지도 렌더링 테스트
        </h2>
        
        <MapView />
        
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          fontSize: '14px',
          color: '#666'
        }}>
          <h3>테스트 정보:</h3>
          <ul>
            <li>중심 좌표: 서울시청 (37.5665, 126.9780)</li>
            <li>확대 레벨: 3</li>
            <li>지도 크기: 600x400px</li>
            <li>마커 개수: 2개 (서울시청, 광화문)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MapTestPage;
