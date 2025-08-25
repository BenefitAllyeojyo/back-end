import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/Store/store'
import AppShell from '@/Components/layout/AppShell'
import BenefitsHome from '@/Page/BenefitsHome'
import Payment from '@/Page/Payment'
import NotFound from '@/Page/NotFound'
import '@/Style/tokens.css'
import '@/Style/globals.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<BenefitsHome />} />
            <Route path="/pay" element={<Payment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
