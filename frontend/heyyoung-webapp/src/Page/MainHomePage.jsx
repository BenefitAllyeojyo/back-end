import { useNavigate } from 'react-router-dom'
import BackgroundImage from '../Components/atoms/BackgroundImage'
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
    <div>
      {/* 테스트: 직접 img 태그로 확인 */}
      <img src={mainHomeImage} alt="메인홈" style={{ display:'block', width:'100%' }} />
      
      {/* 알림 버튼 영역 (투명 클릭 영역) */}
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
        {/* 투명 클릭 영역 */}
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
        {/* 투명 클릭 영역 */}
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
        {/* 투명 클릭 영역 */}
      </button>
    </div>
  )
}