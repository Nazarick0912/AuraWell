import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/Navbar.jsx';
import Login from './Component/Login/Login.jsx';
import Hero from './Component/Hero/Hero.jsx';

function App() {
  return (
    <Router>
      <Navbar /> {/* always visible */}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        {/* you can add more pages here */}
      </Routes>
    </Router>
  );
}

export default App;
