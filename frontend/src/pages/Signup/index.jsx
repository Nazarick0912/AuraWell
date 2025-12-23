import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from 'lucide-react';

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
    const [error, setError] = useState(''); // Changed to string
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

        // Form Validation
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
            // Connect to your Java Backend
            const response = await fetch('http://localhost:9090/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Account created! Please sign in.");
                navigate('/login'); // Redirect to login page
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Server connection failed. Is your Java backend running?');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl px-8 py-14">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-sage-800">Create Account</h1>
                    <p className="text-sage-500 mt-2">Join us now on a wellness journey</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">First Name</label>
                        <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} required className="input-field" placeholder="John" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">Last Name</label>
                        <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} required className="input-field" placeholder="Doe" />
                      </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">Email Address</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} required className="input-field" placeholder="you@example.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">Password</label>
                        <div className="relative">
                            <input name="password" type={ showPassword ? 'text': 'password'} value={formData.password} onChange={handleChange} required className="input-field pr-12" placeholder="••••••••" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600">
                                { showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5"/>}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-sage-700 mb-2">Confirm Password</label>
                        <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="input-field" placeholder="••••••••" />
                    </div>

                    <div className="flex items-start gap-3">
                        <input id="agree" name="agree" type="checkbox" checked={formData.agree} onChange={handleChange} required className="mt-1 h-5 w-5 text-sage-600 border-sage-300 rounded" />
                        <label htmlFor="agree" className="text-sm text-sage-600 leading-tight">
                            By creating an account, I agree to the <Link to="/terms" className="font-semibold">Terms</Link> & <Link to="/privacy" className="font-semibold">Privacy</Link>.
                        </label>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full btn-primary flex items-center justify-center gap-2 py-4">
                        {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating...</> : 'Create Account'}
                    </button>

                    <p className="text-sage-500 mt-2 text-center">
                        Already have an account? <Link to="/login" className="text-sage-700 font-semibold ml-2">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}