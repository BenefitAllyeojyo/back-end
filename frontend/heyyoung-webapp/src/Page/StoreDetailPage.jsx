import { useState, useEffect } from 'react';
import styles from './StoreDetailPage.module.css';

export default function StoreDetailPage() {
  const [storeDetail, setStoreDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [storeId, setStoreId] = useState(null);

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

  const fetchStoreDetail = async (id) => {
    try {
      console.log('Store ID:', id);
      
      // API 호출
      const response = await fetch(`http://api.brainpix.net/partnerships/${id}`, {
        method: 'GET',
        headers: {
          'accept': '*/*'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      
      setStoreDetail(data);
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
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>가게 상세정보</h1>
      {storeDetail && (
        <div>
          <h2>API 응답 데이터</h2>
          <pre>{JSON.stringify(storeDetail, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
