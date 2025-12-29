import {useState} from "react";
import {Link} from "react-router-dom";
import {Eye, EyeOff, Loader2} from "lucide-react";

export default function LoginForm({onSubmit, isLoading, error}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    const inputClasses = "w-full border border-stone-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sage-500/20 focus:border-sage-500 transition-all min-h-[44px]";
    const labelClasses = "block text-sm font-medium text-sage-700 mb-1.5";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
                <label htmlFor="email" className={labelClasses}>
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className={inputClasses}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
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
                        type={showPassword ? "text" : "password"}
                        className={inputClasses}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-600 p-1"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
                    </button>
                </div>

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
                className="w-full bg-sage-600 text-white py-3 rounded-lg hover:bg-sage-700 transition-colors font-medium flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin"/>
                        Signing in...
                    </>
                ) : (
                    "Sign In"
                )}
            </button>

            {/* Footer Link */}
            <p className="text-sage-500 text-sm flex flex-wrap items-center justify-center gap-1 pt-2">
                Don't have an account?
                <Link
                    to="/signup"
                    className="text-sage-700 font-semibold hover:text-sage-800 transition-colors"
                >
                    Sign Up
                </Link>
            </p>
        </form>
    );
}

