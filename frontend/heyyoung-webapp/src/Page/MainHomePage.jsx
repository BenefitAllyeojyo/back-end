import { useNavigate } from 'react-router-dom'
import BackgroundImage from '../Components/atoms/BackgroundImage'
import BackgroundBottomTabImage from '../Components/atoms/BackgroundBottomTabImage'
import Banner from '../Components/atoms/Banner'
import { BellButton } from '../Components/atoms/Button'
import mainHomeImage from '../assets/images/pages/main-home.png'

export default function MainHomePage() {
  const navigate = useNavigate()

  const handleBannerClick = () => {
    console.log('메인 배너 클릭됨!')
    // 배너 클릭 시 동작 로직 (특별 페이지 이동 등)
  }

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'auto' }}>
      {/* 상단 메인 이미지 */}
      <div style={{ position: 'relative' }}>
        <img src={mainHomeImage} alt="메인홈" style={{ display:'block', width:'100%', height: 'auto' }} />
        
        {/* 메인 이미지 위의 버튼들 */}
        <div
          style={{
            position: 'absolute',
            top: '57px',
            right: '20px',
            zIndex: 10
          }}
        >
          <BellButton />
        </div>


        {/* 메인 이미지 위에 오버레이 배너 */}
        <div style={{
          position: 'absolute',
          top: '57%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 5
        }}>
          <Banner
            title="오늘의 추천 혜택"
            subtitle="놓치면 후회할 특별한 혜택을 확인하세요"
            width="320px"
            height="120px"
            backgroundColor="rgba(116, 53, 253, 0.1)" // 보라색 투명 배경
            onClick={handleBannerClick}
            style={{
              border: '1px solid rgba(116, 53, 253, 0.2)'
            }}
          />
        </div>
      </div>

      {/* 하단 탭 이미지 - AppShell 컨테이너 하단에 고정 */}
      <BackgroundBottomTabImage 
        currentTab="home"
        position="absolute"
      />
    </div>
  )
}