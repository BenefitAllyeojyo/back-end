import { useNavigate } from 'react-router-dom'
import BackgroundImage from '../Components/atoms/BackgroundImage'
import BackgroundBottomTabImage from '../Components/atoms/BackgroundBottomTabImage'
import entireMenuImage from '../assets/images/pages/entire-menu.PNG'

export default function EntireMenuPage() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'auto' }}>
      <BackgroundImage 
        src={entireMenuImage}
        alt="전체메뉴 배경"
      >
      </BackgroundImage>

      {/* 하단 탭 이미지 - AppShell 컨테이너 하단에 고정 */}
      <BackgroundBottomTabImage 
        currentTab="menu"
        position="absolute"
      />
    </div>
  )
}