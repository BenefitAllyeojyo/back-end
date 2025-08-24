const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://api.brainpix.net';

/**
 * 카테고리 목록을 가져오는 API
 * @returns {Promise<Array>} 카테고리 정보 배열
 */
export const fetchCategories = async () => {
  try {
    // 실제 API 호출
    const response = await fetch(`${API_BASE_URL}/partnerships/categories`);
    const data = await response.json();
    
    if (data.isSuccess && data.result) {
      // API 응답을 UI에 맞는 형태로 변환
      const categoryMapping = {
        'CAFE': {
          code: 'cafe',
          displayName: '카페',
          icon: '☕',
          color: '#7C3AED',
          textColor: '#FFFFFF'
        },
        'BEAUTY': {
          code: 'beauty',
          displayName: '뷰티',
          icon: '💄',
          color: '#EC4899',
          textColor: '#FFFFFF'
        },
        'CONVENIENCE STORE': {
          code: 'convenience',
          displayName: '편의점',
          icon: '🏪',
          color: '#10B981',
          textColor: '#FFFFFF'
        }
      };
      
      return data.result.map((categoryName, index) => {
        const mapping = categoryMapping[categoryName];
        
        if (mapping) {
          // 정의된 카테고리는 한글로 변환
          return {
            id: index + 1,
            code: mapping.code,
            name: mapping.displayName,
            displayName: mapping.displayName,
            icon: mapping.icon,
            color: mapping.color,
            textColor: mapping.textColor,
            isActive: true
          };
        } else {
          // 정의되지 않은 카테고리는 영어 그대로 표시
          return {
            id: index + 1,
            code: categoryName.toLowerCase().replace(/\s+/g, '_'),
            name: categoryName,
            displayName: categoryName,  // 영어 그대로
            icon: '🏷️',
            color: '#6B7280',
            textColor: '#FFFFFF',
            isActive: true
          };
        }
      });
    }
    
    // API 실패 시 기본 카테고리 반환
    return [
      {
        id: 1,
        code: 'cafe',
        name: '카페',
        displayName: '카페',
        icon: '☕',
        color: '#7C3AED',
        textColor: '#FFFFFF',
        isActive: true
      },
      {
        id: 2,
        code: 'beauty',
        name: '뷰티',
        displayName: '뷰티',
        icon: '💄',
        color: '#EC4899',
        textColor: '#FFFFFF',
        isActive: true
      },
      {
        id: 3,
        code: 'convenience',
        name: '편의점',
        displayName: '편의점',
        icon: '🏪',
        color: '#10B981',
        textColor: '#FFFFFF',
        isActive: true
      }
    ];
  } catch (error) {
    console.error('카테고리 정보 가져오기 실패:', error);
    
    // 에러 시 기본 카테고리 반환
    return [
      {
        id: 1,
        code: 'cafe',
        name: '카페',
        displayName: '카페',
        icon: '☕',
        color: '#7C3AED',
        textColor: '#FFFFFF',
        isActive: true
      },
      {
        id: 2,
        code: 'beauty',
        name: '뷰티',
        displayName: '뷰티',
        icon: '💄',
        color: '#EC4899',
        textColor: '#FFFFFF',
        isActive: true
      },
      {
        id: 3,
        code: 'convenience',
        name: '편의점',
        displayName: '편의점',
        icon: '🏪',
        color: '#10B981',
        textColor: '#FFFFFF',
        isActive: true
      }
    ];
  }
};

/**
 * 카테고리별 스토어 목록을 가져오는 API
 * @param {string} categoryCode - 카테고리 코드
 * @returns {Promise<Array>} 스토어 정보 배열
 */
export const fetchStoresByCategory = async (categoryCode) => {
  try {
    // 실제 API가 준비되면 여기서 실제 API 호출
    // const response = await fetch(`${API_BASE_URL}/stores?category=${categoryCode}`);
    // const data = await response.json();
    // return data.result;
    
    // 현재는 목데이터 반환 (카페 카테고리 기준)
    if (categoryCode === 'cafe') {
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
    }
    
    // 다른 카테고리는 빈 배열 반환
    return [];
  } catch (error) {
    console.error('카테고리별 스토어 정보 가져오기 실패:', error);
    throw error;
  }
};
