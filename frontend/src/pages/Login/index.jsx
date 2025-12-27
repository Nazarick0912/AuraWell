import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { authAPI } from "../../services/api";
import LoginForm from "./components/LoginForm";

export default function Login() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const from = location.state?.from || "/";

    const handleSubmit = async (email, password) => {
        setError("");
        setIsLoading(true);

        try {
            const data = await authAPI.login(email, password);

            if (data?.success) {
                login(data.user);
                navigate(from, { replace: true });
            } else {
                setError(data?.message || "Invalid email or password");
            }
        } catch (err) {
            setError("Server connection failed. Is the backend running?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-8 sm:py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-sage-800">Welcome Back</h1>
                    <p className="text-sage-500 mt-2 text-sm sm:text-base">
                        Sign in to continue your wellness journey
                    </p>
                </div>

                {/* Form */}
                <LoginForm 
                    onSubmit={handleSubmit} 
                    isLoading={isLoading} 
                    error={error} 
                />
            </div>
        </div>
    );
}
