import { useNavigate } from 'react-router-dom';
import BackgroundBottomTabImage from '../Components/atoms/BackgroundBottomTabImage';
import ShopInfoTextModule from '../Components/molecules/TextGrp/ShopInfoTextModule';
import PartnershipCarouselBanner from '../Components/molecules/PartnershipCarouselBanner';

export default function PartnershipListPage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'auto', background: '#EFF0FC' }}>
      {/* ShopInfoTextModule 컴포넌트 */}
      <div style={{ 
        paddingLeft: '25px',
        paddingTop: '135px'
      }}>
        <ShopInfoTextModule 
          subTitle="지금 쓰기 좋은"
        />
      </div>

      {/* PartnershipCarouselBanner 컴포넌트 */}
      <PartnershipCarouselBanner 
        width="350px"
        height="480px"
        background="linear-gradient(180deg, #DDD7FF 0%, #F9E8DA 100%)"
        borderRadius="16px"
      >
      </PartnershipCarouselBanner>
      
      {/* 하단 탭 이미지 */}
      <BackgroundBottomTabImage 
        currentTab="benefit"
        position="absolute"
      />
    </div>

  );
}