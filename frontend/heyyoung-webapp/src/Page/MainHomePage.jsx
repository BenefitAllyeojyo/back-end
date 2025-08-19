import { useNavigate } from 'react-router-dom'
import BackgroundImage from '../Components/atoms/BackgroundImage'
import BackgroundBottomTabImage from '../Components/atoms/BackgroundBottomTabImage'
import mainHomeImage from '../assets/images/pages/main-home.png'

export default function MainHomePage() {
  const navigate = useNavigate()

  const handleNotificationClick = () => {
    navigate('/notifications')
  }

  const handleBenefitClick = () => {
    navigate('/benefit-main')
  }

  const handleEntireMenuClick = () => {
    navigate('/entire-menu')
  }

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'auto' }}>
      {/* 상단 메인 이미지 */}
      <div style={{ position: 'relative' }}>
        <img src={mainHomeImage} alt="메인홈" style={{ display:'block', width:'100%', height: 'auto' }} />
        
        {/* 메인 이미지 위의 버튼들 */}
        <button
          onClick={handleNotificationClick}
          style={{
            position: 'absolute',
            top: '60px',
            right: '20px',
            width: '44px',
            height: '44px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
        >
          {/* 알림 버튼 클릭 영역 */}
        </button>

        {/* 혜택 버튼 영역 (하단 좌측) */}
        <button
          onClick={handleBenefitClick}
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '150px',
            width: '80px',
            height: '60px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
        >
          {/* 혜택 버튼 클릭 영역 */}
        </button>

        {/* 전체메뉴 버튼 영역 (하단 우측) */}
        <button
          onClick={handleEntireMenuClick}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '30px',
            width: '80px',
            height: '60px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
        >
          {/* 전체메뉴 버튼 클릭 영역 */}
        </button>
      </div>

      {/* 하단 탭 이미지 - AppShell 컨테이너 하단에 고정 */}
      <BackgroundBottomTabImage 
        currentTab="home"
        position="absolute"
      />
    </div>
  )
}