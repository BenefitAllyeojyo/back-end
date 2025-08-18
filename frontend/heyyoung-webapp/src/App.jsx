import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppShell from './Components/layout/AppShell'
import MainHomePage from './Page/MainHomePage'
import NotificationPage from './Page/NotificationPage'
import BenefitMainPage from './Page/BenefitMainPage'
import EntireMenuPage from './Page/EntireMenuPage'
import Payment from './Page/Payment'
import NotFound from './Page/NotFound'
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </Router>
  )
}

export default App
