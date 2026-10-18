import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Bunu əlavə edin
import { App } from './App.jsx'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. Bura ilə əhatə edin */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)