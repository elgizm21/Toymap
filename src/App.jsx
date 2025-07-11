// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GuestView  from './components/GuestView';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // Bu dəyişən .env-dən gələn API ünvanıdır
  const API = import.meta.env.VITE_API_URL;

  const [tables,      setTables      ] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [ads,         setAds         ] = useState([]);

  useEffect(() => {
    // Bütün fetch çağırışlarında artıq API dəyişənini istifadə edirik
    fetch(`${API}/api/tables`)
      .then(r => r.json())
      .then(setTables)
      .catch(console.error);

    fetch(`${API}/api/assignments`)
      .then(r => r.json())
      .then(setAssignments)
      .catch(console.error);

    fetch(`${API}/api/ads`)
      .then(r => r.json())
      .then(setAds)
      .catch(console.error);
  }, [API]);

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
  );
}
