const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://api.brainpix.net';

/**
 * 스토어 정보를 가져오는 API
 * @returns {Promise<Array>} 스토어 정보 배열
 */
export const fetchStores = async () => {
  try {
    // 실제 API 호출 (타임아웃 설정)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃
    
    const response = await fetch(`${API_BASE_URL}/partnerships/university`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.isSuccess && data.result) {
      // API 응답 구조 그대로 반환 (partnershipBranchDto 포함)
      console.log('API에서 파트너십 데이터 가져오기 성공:', data.result.length, '개');
      return data.result;
    } else {
      throw new Error(`API error: ${data.message || '알 수 없는 오류'}`);
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn('API 호출 타임아웃');
    } else {
      console.error('스토어 정보 가져오기 실패:', error);
    }
    
    // API 실패 시 빈 배열 반환
    return [];
  }
};
