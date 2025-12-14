import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/Navbar.jsx';
import Login from './Component/Login/Login.jsx';
import Signup from './Component/Signup/Signup.jsx';
import Hero from './Component/Hero/Hero.jsx';
import Footer from './Component/Footer/Footer.jsx'
import Terms from './Component/Signup/Terms.jsx';
import Privacy from './Component/Signup/Privacy.jsx';

function App() {
  return (
    <Router>
      <Navbar /> {/* always visible */}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
