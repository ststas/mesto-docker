import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './pages/index.css'
import App from './components/App'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/mesto">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)