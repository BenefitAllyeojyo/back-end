import { useNavigate } from 'react-router-dom'
import bottomTab1Image from '../../../assets/images/pages/bottom-tab1.png'
import bottomTab2Image from '../../../assets/images/pages/bottom-tab2.PNG'
import bottomTab3Image from '../../../assets/images/pages/bottom-tab3.PNG'

export default function BackgroundBottomTabImage({ 
  currentTab = "home", // "home", "benefit", "menu"
  position = "absolute"  // AppShell 내에서는 absolute가 맞음
}) {
  const navigate = useNavigate()

  // currentTab에 따라 사용할 이미지 선택
  const getTabImage = () => {
    switch(currentTab) {
      case 'home':
        return bottomTab1Image  // 홈 활성화 이미지
      case 'benefit':
        return bottomTab2Image  // 혜택 활성화 이미지
      case 'menu':
        return bottomTab3Image  // 메뉴 활성화 이미지
      default:
        return bottomTab1Image
    }
  }

  // currentTab에 따라 alt 텍스트 생성
  const getAltText = () => {
    switch(currentTab) {
      case 'home':
        return "홈 탭 활성화된 하단 바"
      case 'benefit':
        return "혜택 탭 활성화된 하단 바"
      case 'menu':
        return "메뉴 탭 활성화된 하단 바"
      default:
        return "하단 탭 바"
    }
  }

  const handleTabClick = (tab) => {
    console.log(`${tab} 탭 클릭됨`)
    // 현재 탭과 같은 탭을 클릭하면 아무것도 하지 않음
    if (tab === currentTab) {
      return
    }
    
    switch(tab) {
      case 'home':
        navigate('/')
        break
      case 'benefit':
        navigate('/benefit-main')
        break
      case 'menu':
        navigate('/entire-menu')
        break
    }
  }

  return (
    <div 
      style={{
        position: position,
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000  // AppShell 내의 다른 요소들 위에 표시
      }}
    >
      {/* currentTab에 따라 다른 이미지 사용 */}
      <img 
        src={getTabImage()}
        alt={getAltText()}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block'
        }}
      />
      
      {/* 3개 섹션으로 나눈 탭 버튼들 */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex'
        }}
      >
        {/* 홈 섹션 (왼쪽 1/3) */}
        <button
          onClick={() => handleTabClick('home')}
          style={{
            flex: 1,
            border: 'none',
            backgroundColor: 'transparent',
            cursor: currentTab === 'home' ? 'default' : 'pointer',
          }}
        >
          {/* 홈 탭 클릭 영역 */}
        </button>

        {/* 혜택 섹션 (가운데 1/3) */}
        <button
          onClick={() => handleTabClick('benefit')}
          style={{
            flex: 1,
            border: 'none',
            backgroundColor: 'transparent',
            cursor: currentTab === 'benefit' ? 'default' : 'pointer',
          }}
        >
          {/* 혜택 탭 클릭 영역 */}
        </button>

        {/* 전체메뉴 섹션 (오른쪽 1/3) */}
        <button
          onClick={() => handleTabClick('menu')}
          style={{
            flex: 1,
            border: 'none',
            backgroundColor: 'transparent',
            cursor: currentTab === 'menu' ? 'default' : 'pointer',
          }}
        >
          {/* 전체메뉴 탭 클릭 영역 */}
        </button>
      </div>
    </div>
  )
}