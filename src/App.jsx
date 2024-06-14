import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loginpage from './components/loginpage';
import Adminpage from './components/adminpage';
import Userspage from './components/userspage';
import DetailProfile from './components/detailprofile';
import ArticleDetail from './components/articledetail';
function App() {

  return (
    <Router>
      <Routes>
        {/* Route untuk halaman login */}
        <Route path="/login" element={< Loginpage />} />
        <Route path="/profile" element={< DetailProfile />} />
        <Route path="/articledetail" element={< ArticleDetail />} />
        {/* Route untuk halaman admin */}
        <Route path="/admin" element={< Adminpage />} />
        <Route path="/article" element={< Userspage />} />
        {/* Route untuk redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
