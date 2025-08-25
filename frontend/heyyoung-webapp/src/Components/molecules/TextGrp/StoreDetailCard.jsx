import React from 'react';
import styles from './StoreDetailCard.module.css';

const StoreDetailCard = ({ storeDetail }) => {
  if (!storeDetail) return null;

  const { partnershipBranchDto, companyName, discountRate, discountAmount, terms, universityName } = storeDetail;

  return (
    <div className={styles.cardContainer}>
      {/* 가게 이미지 */}
      <div className={styles.imageSection}>
        {partnershipBranchDto?.images && partnershipBranchDto.images.length > 0 ? (
          <img 
            src={partnershipBranchDto.images[0]} 
            alt={partnershipBranchDto.name}
            className={styles.storeImage}
          />
        ) : (
          <div className={styles.defaultImage}>
            <span>이미지 없음</span>
          </div>
        )}
        {/* 캐릭터 이미지 (오른쪽에 겹쳐서 표시) */}
        <div className={styles.characterImage}>
          <img 
            src="/src/assets/images/character/PLI_Face.png" 
            alt="캐릭터"
            className={styles.character}
          />
        </div>
      </div>

      {/* 가게 정보 */}
      <div className={styles.infoSection}>
        {/* 가게명 */}
        <h1 className={styles.storeName}>{partnershipBranchDto?.name || companyName}</h1>
        
        {/* 주소 */}
        <p className={styles.address}>{partnershipBranchDto?.address}</p>
        
        {/* ABOUT 섹션 */}
        <div className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>ABOUT</h2>
          <ul className={styles.offerList}>
            <li>{terms}</li>
            {discountRate && discountAmount && (
              <li>{discountRate}% 할인 (최대 {discountAmount.toLocaleString()}원)</li>
            )}
          </ul>
        </div>
        
        {/* 학교 제휴사업 주최자 */}
        <div className={styles.organizerSection}>
          <h2 className={styles.sectionTitle}>학교 제휴사업 주최자</h2>
          <div className={styles.organizerInfo}>
            <div className={styles.organizerIcon}>
              <span>👤</span>
            </div>
            <span className={styles.organizerName}>{universityName}</span>
          </div>
        </div>
      </div>

      {/* 결제 버튼 */}
      <div className={styles.buttonSection}>
        <button className={styles.payButton}>
          헤이영 Pay로 제휴 결제하기
        </button>
      </div>
    </div>
  );
};

export default StoreDetailCard;
