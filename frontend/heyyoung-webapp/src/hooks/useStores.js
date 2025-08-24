import { useState, useEffect } from 'react';
import { fetchStores, fetchPartnerships } from '../services/api';

/**
 * 스토어와 파트너십 정보를 가져오는 커스텀 훅
 * @param {number} memberId - 회원 ID (기본값: 1)
 * @returns {Object} 스토어, 파트너십, 로딩 상태, 에러 상태
 */
export const useStores = (memberId = 1) => {
  const [stores, setStores] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // 스토어 정보와 파트너십 정보를 병렬로 가져오기
        const [storesData, partnershipsData] = await Promise.all([
          fetchStores(),
          fetchPartnerships(memberId)
        ]);
        
        setStores(storesData);
        setPartnerships(partnershipsData);
        
        console.log('useStores 훅에서 로드된 스토어:', storesData);
        console.log('useStores 훅에서 로드된 파트너십:', partnershipsData);
      } catch (error) {
        console.error('useStores 훅에서 데이터 로드 실패:', error);
        setError(error);
        
        // 에러 발생 시 기본 목데이터 사용
        const fallbackStores = [
          {
            "id": 1,
            "name": "스타벅스 관악서울대입구R점",
            "address": "서울 관악구 관악로 158",
            "latitude": 126.95280377997965,
            "longitude": 37.47927529407993,
            "phone": "02-1234-5678",
            "businessHoursJson": "{\"fri\": \"07:00-22:00\", \"mon\": \"07:00-22:00\", \"sat\": \"07:00-22:00\", \"sun\": \"07:00-22:00\", \"thu\": \"07:00-22:00\", \"tue\": \"07:00-22:00\", \"wed\": \"07:00-22:00\"}",
            "startDate": "2025-08-01",
            "endDate": "2025-09-30",
            "status": "ACTIVE",
            "partnershipId": 1,
            "images": [
              "https://heyoung.s3.ap-northeast-2.amazonaws.com/store_image.png",
              "https://heyoung.s3.ap-northeast-2.amazonaws.com/store_image.png"
            ]
          }
        ];
        
        setStores(fallbackStores);
        setPartnerships([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [memberId]);

  return {
    stores,
    partnerships,
    isLoading,
    error,
    refetch: () => {
      setIsLoading(true);
      loadData();
    }
  };
};
