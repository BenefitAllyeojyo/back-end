import React from 'react'
import { PayHeadButton } from '../Components/atoms/Button'

export default function PaymentPage() {
  return (
    <div style={{ 
      position: 'relative', 
      height: '100%', 
      overflow: 'auto',
      backgroundColor: '#FFFFFF'
    }}>
      <PayHeadButton subtitle="오늘 - Aug 15" />
    </div>
  )
}
