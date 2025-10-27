import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Component/Navbar/Navbar.jsx';
import Hero from './Component/Hero/Hero.jsx';

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Hero/>
    
    </BrowserRouter>
  )
}

export default App
