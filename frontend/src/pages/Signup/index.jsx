import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import SignupForm from "./components/SignupForm";

export default function Signup() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            const data = await authAPI.register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });

            if (data?.success) {
                alert("Account created! Please sign in.");
                navigate('/login');
            } else {
                setError(data?.message || 'Registration failed');
            }
        } catch (err) {
            setError('Server connection failed. Is the backend running?');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-8 sm:py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:px-8 sm:py-10">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-sage-800">Create Account</h1>
                    <p className="text-sage-500 mt-2 text-sm sm:text-base">
                        Join us now on a wellness journey
                    </p>
                </div>

                {/* Form */}
                <SignupForm 
                    onSubmit={handleSubmit} 
                    isLoading={isLoading} 
                    error={error} 
                />
            </div>
        </div>
    );
}
