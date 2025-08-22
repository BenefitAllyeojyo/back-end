import { useNavigate } from 'react-router-dom';
import BackgroundBottomTabImage from '../Components/atoms/BackgroundBottomTabImage';
import ShopInfoTextModule from '../Components/molecules/TextGrp/ShopInfoTextModule';

export default function PartnershipListPage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'auto', background: '#EFF0FC' }}>
      {/* ShopInfoTextModule 컴포넌트 */}
      <div style={{ 
        padding: '25px',
        paddingTop: '145px'
      }}>
        <ShopInfoTextModule 
          subTitle="지금 쓰기 좋은"
        />
      </div>
      
      {/* 하단 탭 이미지 */}
      <BackgroundBottomTabImage 
        currentTab="benefit"
        position="absolute"
      />
    </div>
  );
}
