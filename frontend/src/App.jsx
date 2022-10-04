import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { FullPost } from './components/FullPost/FullPost'
import { Home } from './components/Home/Home'

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<FullPost />} />
      </Routes>
    </div>
  )
}

export default App
