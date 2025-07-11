import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'   // Tailwind direktivləri
import './App.css'     // əgər öz əlavə stilin yoxdursa, bu sətri silə bilərsən
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
