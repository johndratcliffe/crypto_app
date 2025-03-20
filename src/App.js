import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/navbar'
import Home from './pages/home'
import MarketPage from './pages/market-page'

const App = () => {
  return (
    <Router>
      <div className='font-mono text-white bg-gradient-to-b from-dblue to-dpurple'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/market' element={<MarketPage/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
