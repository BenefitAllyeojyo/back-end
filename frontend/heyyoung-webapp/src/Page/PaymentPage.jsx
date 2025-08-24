import React from 'react'
import { PayHeadButton } from '../Components/atoms/Button'
import ShopTextModule from '../Components/molecules/TextGrp/ShopTextModule'
import { PayPersonalInfo } from '../Components/molecules/CardGrp'

export default function PaymentPage() {
  // Mock data - 추후 실제 데이터로 교체 가능
  const shopData = {
    shopName: "레드버튼 보드게임 X 싸피대학교 총학생회",
    shopAddress: "학생증 및 교직원증 제시 시 식음료 메뉴 20% 할인\n- 8인 이상 단체 예약시 게임비 10% 추가 할인",
    tag: "" // 태그 버튼 없음
  }

  const userData = {
    userName: "김싸피 (1448308)",
    userInfo: "싸피대학교, 재학생 4학년"
  }

  return (
    <div style={{ 
      position: 'relative', 
      height: '100%', 
      overflow: 'auto',
      backgroundColor: '#FFFFFF'
    }}>
      <PayHeadButton subtitle="오늘 - Aug 15" />
      
      <div style={{ padding: '16px 24px' }}>
        <div style={{ whiteSpace: 'pre-line' }}>
          <ShopTextModule 
            shopName={shopData.shopName}
            shopAddress={shopData.shopAddress}
            tag={shopData.tag}
            disabled={false} // 태그 버튼 숨김 (빈 태그 + disabled=false)
          />
        </div>
      </div>
      
      <PayPersonalInfo 
        userName={userData.userName}
        userInfo={userData.userInfo}
      />
    </div>
  )
}
