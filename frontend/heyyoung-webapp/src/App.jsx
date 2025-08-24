import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppShell from './Components/layout/AppShell'
import MainHomePage from './Page/MainHomePage'
import NotificationPage from './Page/NotificationPage'
import BenefitMainPage from './Page/BenefitMainPage'
import EntireMenuPage from './Page/EntireMenuPage'
import Payment from './Page/Payment'
import NotFound from './Page/NotFound'
// TODO: 새로운 제휴 페이지들 import 예정
import PartnershipMainPage from './Page/PartnershipMainPage'
// import PartnershipMapPage from './Page/PartnershipMapPage'
import PartnershipListPage from './Page/PartnershipListPage'
// import PartnershipDetailPage from './Page/PartnershipDetailPage'
import PaymentPage from './Page/PaymentPage'
import PaymentResultPage from './Page/PaymentResultPage'

import './App.css'

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<MainHomePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/benefit-main" element={<BenefitMainPage />} />
          <Route path="/entire-menu" element={<EntireMenuPage />} />
          <Route path="/pay" element={<Payment />} />
          {/* TODO: 새로운 제휴 페이지 라우트 예정 */}
          <Route path="/partnership" element={<PartnershipMainPage />} />
          {/* <Route path="/partnership/map" element={<PartnershipMapPage />} /> */}
          <Route path="/partnership/list" element={<PartnershipListPage />} />
          {/* <Route path="/partnership/detail/:id" element={<PartnershipDetailPage />} /> */}
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-result" element={<PaymentResultPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </Router>
  )
}

export default App