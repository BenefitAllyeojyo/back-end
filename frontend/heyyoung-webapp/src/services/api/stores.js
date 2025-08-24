const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://api.brainpix.net';

/**
 * 스토어 정보를 가져오는 API (현재는 목데이터 반환)
 * @returns {Promise<Array>} 스토어 정보 배열
 */
export const fetchStores = async () => {
  try {
    // 실제 API가 준비되면 여기서 실제 API 호출
    // const response = await fetch(`${API_BASE_URL}/stores`);
    // const data = await response.json();
    // return data.result;
    
    // 현재는 목데이터 반환
    return [
      {
        "id": 1,
        "name": "스타벅스 관악서울대입구R점",
        "address": "서울 관악구 관악로 158",
        "latitude": 126.95280377997965,
        "longitude": 37.47927529407993,
        "phone": "02-1234-5678",
        "category": "cafe",
        "businessHoursJson": "{\"fri\": \"07:00-22:00\", \"mon\": \"07:00-22:00\", \"sat\": \"07:00-22:00\", \"sun\": \"07:00-22:00\", \"thu\": \"07:00-22:00\", \"tue\": \"07:00-22:00\", \"wed\": \"07:00-22:00\"}",
        "startDate": "2025-08-01",
        "endDate": "2025-09-30",
        "status": "ACTIVE",
        "partnershipId": 1,
        "images": [
          "https://heyoung.s3.ap-northeast-2.amazonaws.com/store_image.png",
          "https://heyoung.s3.ap-northeast-2.amazonaws.com/store_image.png"
        ]
      },
      {
        "id": 2,
        "name": "스타벅스 서울대입구역점",
        "address": "서울 관악구 남부순환로 1812",
        "latitude": 126.95135823610674,
        "longitude": 37.48116232181828,
        "phone": "02-1234-5678",
        "category": "cafe",
        "businessHoursJson": "{\"fri\": \"07:00-22:00\", \"mon\": \"07:00-22:00\", \"sat\": \"07:00-22:00\", \"sun\": \"07:00-22:00\", \"thu\": \"07:00-22:00\", \"tue\": \"07:00-22:00\", \"wed\": \"07:00-22:00\"}",
        "startDate": "2025-08-01",
        "endDate": "2025-09-30",
        "status": "ACTIVE",
        "partnershipId": 1,
        "images": [
          "https://heyoung.s3.ap-northeast-2.amazonaws.com/store_image.png",
          "https://heyoung.s3.ap-northeast-2.amazonaws.com/store_image.png"
        ]
      },
      {
        "id": 3,
        "name": "스타벅스 서울대입구역8번출구점",
        "address": "서울 관악구 남부순환로 1831",
        "latitude": 126.95365619637556,
        "longitude": 37.4811767606375,
        "phone": "02-1234-5678",
        "category": "cafe",
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
  } catch (error) {
    console.error('스토어 정보 가져오기 실패:', error);
    throw error;
  }
};
