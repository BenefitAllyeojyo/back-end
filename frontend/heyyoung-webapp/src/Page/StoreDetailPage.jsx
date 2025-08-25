import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './StoreDetailPage.module.css';

export default function StoreDetailPage() {
  const { id } = useParams();
  const [storeDetail, setStoreDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: API 호출하여 store detail 정보 가져오기
    console.log('Store ID:', id);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>가게 상세정보</h1>
      <p>가게 ID: {id}</p>
      {/* TODO: 상세 정보 표시 */}
    </div>
  );
}
