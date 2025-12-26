import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Layout
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/Admin';

// Loading Spinner component
function LoadingSpinner() {
    return (
        <div className="loading-container">
            <div className="loading-spinner" />
        </div>
    );
}

// Protected Route component - requires authentication
function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// Admin Route component - requires admin role
function AdminRoute({ children }) {
    const { isAdmin, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}

// App Routes component
function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public routes */}
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="terms" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />

                {/* Protected routes - require login */}
                <Route
                    path="checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />

                {/* Admin routes - require admin role */}
                <Route
                    path="admin"
                    element={
                        <AdminRoute>
                            <AdminPanel />
                        </AdminRoute>
                    }
                />

                {/* Catch all - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

// Main App component with centralized providers
function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <AppRoutes />
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;