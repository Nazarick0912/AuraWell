import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/Admin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="products" element={<Products/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="signup" element={<Signup/>}/>
                    <Route path="terms" element={<Terms/>}/>
                    <Route path="privacy" element={<Privacy/>}/>
                    <Route path="contact" element={<Contact/>}/>
                    <Route path="checkout" element={<Checkout/>}/>
                    <Route path="admin" element={<AdminPanel/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;