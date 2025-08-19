import { useNavigate } from 'react-router-dom'
import BackgroundImage from '../Components/atoms/BackgroundImage'
import BackgroundBottomTabImage from '../Components/atoms/BackgroundBottomTabImage'
import benefitMainImage from '../assets/images/pages/benefit-main.PNG'

export default function BenefitMainPage() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'auto' }}>
      <BackgroundImage 
        src={benefitMainImage}
        alt="혜택 메인 배경"
      >
        {/* 뒤로가기 버튼 영역 (투명 클릭 영역) */}
        <button
          onClick={handleBackClick}
          style={{
            position: 'absolute',
            top: '60px',
            left: '20px',
            width: '44px',
            height: '44px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
        >
          {/* 투명 클릭 영역 */}
        </button>
      </BackgroundImage>

      {/* 하단 탭 이미지 - AppShell 컨테이너 하단에 고정 */}
      <BackgroundBottomTabImage 
        currentTab="benefit"
        position="absolute"
      />
    </div>
  )
}