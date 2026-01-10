import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignupForm({ onSubmit, isLoading, error }) {
    const [formData, setFormData] = useState(() => {
        // Initialize from sessionStorage if available
        const savedData = sessionStorage.getItem('signupFormData');
        return savedData ? JSON.parse(savedData) : {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agree: false
        };
    });

    // Save to sessionStorage whenever formData changes
    useEffect(() => {
        sessionStorage.setItem('signupFormData', JSON.stringify(formData));
    }, [formData]);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputClasses = "w-full border border-stone-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 transition-all min-h-[44px]";
    const labelClasses = "block text-sm font-medium text-sage-700 mb-1.5";

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className={labelClasses}>
                        First Name
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder="John"
                        autoComplete="given-name"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className={labelClasses}>
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder="Doe"
                        autoComplete="family-name"
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className={labelClasses}>
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="you@example.com"
                    autoComplete="email"
                />
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className={labelClasses}>
                    Password
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={`${inputClasses} pr-12`}
                        placeholder="••••••••"
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600 p-1 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-1"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Confirm Password */}
            <div>
                <label htmlFor="confirmPassword" className={labelClasses}>
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className={`${inputClasses} pr-12`}
                        placeholder="••••••••"
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600 p-1"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
                <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    checked={formData.agree}
                    onChange={handleChange}
                    required
                    className="mt-1 h-5 w-5 text-sage-600 border-sage-300 rounded focus:ring-sage-500 flex-shrink-0"
                />
                <label htmlFor="agree" className="text-sm text-sage-600 leading-relaxed">
                    By creating an account, I agree to the{' '}
                    <Link to="/terms" className="text-sage-700 font-semibold hover:text-sage-800 transition-colors">
                        Terms & Conditions
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-sage-700 font-semibold hover:text-sage-800 transition-colors">
                        Privacy Policy
                    </Link>.
                </label>
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
                    {error}
                </p>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-sage-600 text-white py-3 sm:py-4 rounded-lg hover:bg-sage-700 transition-colors font-medium flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating account...
                    </>
                ) : (
                    'Create Account'
                )}
            </button>

            {/* Footer Link */}
            <p className="text-sage-500 text-sm flex flex-wrap items-center justify-center gap-1 pt-2">
                Already have an account?
                <Link
                    to="/login"
                    className="text-sage-700 font-semibold hover:text-sage-800 transition-colors"
                >
                    Sign In
                </Link>
            </p>
        </form>
    );
}

