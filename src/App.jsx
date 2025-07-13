// client/src/App.jsx
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import GuestView  from './components/GuestView'
import AdminPanel from './components/AdminPanel'

export default function App() {
  // 1️⃣ .env faylından gələn baza URL-i. Məsələn: http://localhost:4000
  const API = import.meta.env.VITE_API_URL

  // 2️⃣ Bütün əsas state-lər burada yaşayır
  const [tables,      setTables      ] = useState([])
  const [assignments, setAssignments] = useState({})
  const [ads,         setAds         ] = useState([])

  // 3️⃣ İlk render zamanı serverdən datanı yükləyirik
  useEffect(() => {
    // Masalar
    fetch(`${API}/api/tables`)
      .then(res => res.json())
      .then(setTables)
      .catch(err => console.error('tables load error:', err))

    // Təyinatlar
    fetch(`${API}/api/assignments`)
      .then(res => res.json())
      .then(setAssignments)
      .catch(err => console.error('assignments load error:', err))

    // Reklamlar
    fetch(`${API}/api/ads`)
      .then(res => res.json())
      .then(setAds)
      .catch(err => console.error('ads load error:', err))
  }, [API])

  return (
    <BrowserRouter>
      <Routes>
        {/* Müştəri görünüşü */}
        <Route
          path="/"
          element={
            <GuestView
              assignments={assignments}
              ads={ads}
            />
          }
        />

        {/* Admin panel */}
        <Route
          path="/admin"
          element={
            <AdminPanel
              tables={tables}
              setTables={setTables}
              assignments={assignments}
              setAssignments={setAssignments}
              ads={ads}
              setAds={setAds}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
