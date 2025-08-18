import { useNavigate } from 'react-router-dom'
import BackgroundImage from '../Components/atoms/BackgroundImage'
import benefitMainImage from '../assets/images/pages/benefit-main.PNG'

export default function BenefitMainPage() {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/')
  }

  return (
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
  )
}
