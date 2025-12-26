import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { authAPI } from "../../services/api";

export default function Signup(){
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email:'',
        password:'',
        confirmPassword:'',
        agree: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(formData.password !== formData.confirmPassword){
            setError('Passwords do not match');
            return;
        }

        if(formData.password.length < 6){
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try{
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
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl px-8 py-14">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-sage-800">Create Account</h1>
                    <p className="text-sage-500 mt-2">
                        Join us now on a wellness journey
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-sage-700 mb-2">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-sage-700 mb-2">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-sage-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-sage-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                            id="password"
                            name="password"
                            type={ showPassword ? 'text': 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="input-field pr-12"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600"
                        >
                            { showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5"/>}
                        </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-sage-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="input-field pr-12"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-start gap-3">
                        <input
                            id="agree"
                            name="agree"
                            type="checkbox"
                            checked={formData.agree}
                            onChange={(e) =>
                            setFormData({ ...formData, agree: e.target.checked })
                            }
                            required
                            className="mt-1 h-5 w-5 text-sage-600 border-sage-300 rounded focus:ring-sage-500"
                        />
                        <label htmlFor="agree" className="text-sm text-sage-600 leading-tight">
                            By creating an account, I agree to the{' '}
                            <Link to="/terms" className="text-sage-700 font-semibold hover:text-sage-800">
                                Terms & Conditions
                            </Link>
                            {' '} and {' '}
                            <Link to="/privacy" className="text-sage-700 font-semibold hover:text-sage-800">
                                Privacy Policy
                            </Link>.
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                    >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                            'Create Account'
                        )
                        }
                    </button>

                    <p className="text-sage-500 mt-2 flex items-center justify-center">
                        Already have an account?
                        <Link to="/login" className="text-sage-700 font-semibold hover:text-sage-800 ml-2">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
