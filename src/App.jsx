// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GuestView from './components/GuestView';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [assignments, setAssignments] = useState({});
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // həm assignments, həm ads
    fetch('/api/assignments')
      .then(r => r.json())
      .then(setAssignments);

    fetch('/api/ads')
      .then(r => r.json())
      .then(setAds);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<GuestView assignments={assignments} ads={ads} />}
        />
        <Route
          path="/admin"
          element={
            <AdminPanel
              assignments={assignments}
              setAssignments={setAssignments}
              ads={ads}
              setAds={setAds}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
