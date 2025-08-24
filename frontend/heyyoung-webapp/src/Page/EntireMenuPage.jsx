import { useNavigate } from 'react-router-dom'
import BackgroundImage from '../Components/atoms/BackgroundImage'
import BackgroundBottomTabImage from '../Components/atoms/BackgroundBottomTabImage'
import Banner from '../Components/atoms/Banner'
import entireMenuImage from '../assets/images/pages/entire-menu.PNG'

export default function EntireMenuPage() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/')
  }

  const handlePartnershipClick = () => {
    console.log('제휴존 배너 클릭됨!')
    navigate('/partnership')
  }

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'auto' }}>
      <BackgroundImage 
        src={entireMenuImage}
        alt="전체메뉴 배경"
      >
        {/* 제휴존 배너 - 취업존 아래 위치 */}
        <div style={{
          position: 'absolute',
          top: '58%', // 하단 탭바 위로 120px
          left: '53%',
          transform: 'translateX(-50%)',
          zIndex: 5
        }}>
          <Banner
            title="제휴존"
            subtitle=''
            width="50px"
            height="30px"
            backgroundColor="rgba(128, 128, 128, 0.3)" // 투명한 회색
            onClick={handlePartnershipClick}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          />
        </div>
      </BackgroundImage>

      {/* 하단 탭 이미지 - AppShell 컨테이너 하단에 고정 */}
      <BackgroundBottomTabImage 
        currentTab="menu"
        position="absolute"
      />
    </div>
  )
}