import Banner from '../../atoms/Banner';
import ShopTextModule from '../TextGrp/ShopTextModule';
import { LongVioletBtn } from '../../atoms/Button';

export default function PartnershipCarouselBanner({
  width = "300px",
  height = "150px",
  background = "linear-gradient(180deg, #DDD7FF 0%, #F9E8DA 100%)",
  borderRadius = "16px",
  onClick,
  children
}) {
  return (
    <div style={{ 
      paddingLeft: '15px',
      paddingTop: '20px'
    }}>
      <div
        onClick={onClick}
        style={{
          width,
          height,
          background,
          borderRadius,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseDown={(e) => {
          if (onClick) {
            e.currentTarget.style.transform = 'scale(0.98)'
          }
        }}
        onMouseUp={(e) => {
          if (onClick) {
            e.currentTarget.style.transform = 'scale(1)'
          }
        }}
        onMouseLeave={(e) => {
          if (onClick) {
            e.currentTarget.style.transform = 'scale(1)'
          }
        }}
      >
        {/* 헤이영 맞춤 추천 텍스트 */}
        <div style={{
          color: 'var(--neutral-dark-dark)',
          fontFamily: 'OneShinhan',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '16px',
          letterSpacing: '0.12px',
          alignSelf: 'flex-start',
          marginLeft: '25px',
          marginBottom: '10px'
        }}>
          헤이영 맞춤 추천
        </div>
        
        {/* ShopTextModule */}
        <div style={{
          alignSelf: 'flex-start',
          marginLeft: '25px',
          marginBottom: '10px'
        }}>
          <ShopTextModule
            shopName="레드버튼 강북점"
            shopAddress="서울특별시 강북구 한천로 139길 42"
            tag="보드게임카페"
            disabled={false}
          />
        </div>

        {/* 흰색 박스 */}
        <div style={{
          alignSelf: 'flex-start',
          marginLeft: '25px',
          marginBottom: '10px',
          borderRadius: '10px',
          background: '#FFF',
          boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.10)',
          width: '298px',
          height: '271px',
          flexShrink: 0
        }}>
        </div>

        {/* 롱 바이올렛 버튼  '헤이영 pay로 제휴 결제하기' */}
        <div style={{
          alignSelf: 'flex-start',
          marginLeft: '25px',
          marginBottom: '10px'
        }}>
          <LongVioletBtn
            label="헤이영 pay로 제휴 결제하기"
            onClick={() => console.log('헤이영 pay 결제 버튼 클릭')}
          />
        </div>
        
        {children}
      </div>
    </div>
  );
}
